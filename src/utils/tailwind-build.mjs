import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";
import cssnano from "cssnano";
import { writeFileSync, readFileSync, readdirSync, statSync, existsSync, mkdirSync } from "fs";
import { dirname, join, basename } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Directorios
const COMPONENTS_DIR = join(__dirname, "..", "stories");
const STYLES_DIR = join(__dirname, "..", "styles");
const DIST_DIR = join(__dirname, "..", "..", "dist");
const INPUTS_DIR = join(STYLES_DIR, "inputs");
const PREVIEW_PATH = join(__dirname, "..", "..", ".storybook", "preview.ts");

/**
 * Detecta el tema activo leyendo el import en preview.ts
 */
function detectActiveBrand() {
  try {
    const previewContent = readFileSync(PREVIEW_PATH, "utf8");
    const match = previewContent.match(/import\s+['"].*\/(\w+)-tailwind\.css['"]/);
    if (match) {
      const brand = match[1];
      if (brand === "tailwind") return "input.css";
      return `${brand}-input.css`;
    }
  } catch (error) {
    console.warn("⚠️  No se pudo leer preview.ts, usando input.css por defecto");
  }
  return "input.css";
}

// Configuración de archivos de entrada/salida por marca
const BRAND_CONFIGS = [
  { input: "input.css", output: "tailwind.css", distOutput: "tailwind.min.css" },
  { input: "beo-input.css", output: "beo-tailwind.css", distOutput: "beo-tailwind.min.css" },
  { input: "ebf-input.css", output: "ebf-tailwind.css", distOutput: "ebf-tailwind.min.css" },
];

/**
 * Procesa el CSS global de Tailwind para una marca específica
 * También genera versión minificada en dist/
 */
async function processGlobalCss(config) {
  const inputPath = join(INPUTS_DIR, config.input);
  const outputPath = join(STYLES_DIR, config.output);
  const distOutputPath = join(DIST_DIR, config.distOutput);

  // Verificar que el archivo de entrada existe
  if (!existsSync(inputPath)) {
    console.log(`⚠️  Archivo no encontrado: ${config.input}, saltando...`);
    return;
  }

  try {
    const inputCss = readFileSync(inputPath, "utf8");

    // Procesar con Tailwind (versión no minificada para desarrollo)
    const result = await postcss([tailwindcss()]).process(inputCss, {
      from: inputPath,
    });
    writeFileSync(outputPath, result.css, "utf8");
    console.log(`✅ Global CSS generado: ${config.output}`);

    // Generar versión minificada para dist/
    if (!existsSync(DIST_DIR)) {
      mkdirSync(DIST_DIR, { recursive: true });
    }

    const minified = await postcss([
      tailwindcss(),
      cssnano({ preset: 'default' })
    ]).process(inputCss, {
      from: inputPath,
    });
    writeFileSync(distOutputPath, minified.css, "utf8");
    console.log(`✅ Global CSS minificado: dist/${config.distOutput}`);

  } catch (error) {
    console.error(`❌ Error al procesar ${config.input}:`, error.message || error);
  }
}

/**
 * Procesa un archivo CSS de componente con Tailwind y genera el archivo .lit.ts
 * El CSS se minifica automáticamente con cssnano
 */
async function processTailwindToLit(inputCss, outputPath) {
  const componentName = basename(outputPath);
  const outputFilePath = `${outputPath}${componentName}.lit.ts`;

  try {
    const componentCss = readFileSync(inputCss, "utf8");
    // Usar el tema activo para @reference (así los fallbacks usan los colores de marca correctos)
    const activeInputFile = detectActiveBrand();
    const activeInputPath = join(INPUTS_DIR, activeInputFile);
    const combinedCss = `@reference "${activeInputPath}";\n\n${componentCss}`;

    // Procesar con Tailwind + cssnano para minificar
    const result = await postcss([
      tailwindcss(),
      cssnano({ preset: 'default' })
    ]).process(combinedCss, {
      from: inputCss,
    });

    const componentStyles = result.css.trim();

    // CSS base del host (minificado)
    const hostStyles = `:host{box-sizing:border-box}:host *,:host *::before,:host *::after{box-sizing:inherit}[hidden]{display:none!important}`;

    const litCss = `import { css } from 'lit';
export default css\`${hostStyles}${componentStyles}\`;
`;

    writeFileSync(outputFilePath, litCss, "utf8");
    console.log(`✅ Componente generado: ${componentName}.lit.ts`);
    return true;
  } catch (error) {
    console.error(`❌ Error al procesar ${inputCss}:`, error.message || error);
    return false;
  }
}

/**
 * Busca recursivamente archivos CSS de componentes (cp-*.css)
 */
function findComponentCssFiles(dir, files = []) {
  const items = readdirSync(dir);

  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      // Ignorar carpeta styles/
      if (item !== "styles") {
        findComponentCssFiles(fullPath, files);
      }
    } else if (item.endsWith(".css") && item.startsWith("cc-")) {
      files.push(fullPath);
    }
  }

  return files;
}

// Ejecutar build
console.log("🚀 Compilando Tailwind CSS...\n");

// 1. Procesar CSS global para cada marca
for (const config of BRAND_CONFIGS) {
  await processGlobalCss(config);
}

// 2. Procesar CSS de componentes
const componentFiles = findComponentCssFiles(COMPONENTS_DIR);

if (componentFiles.length === 0) {
  console.log("\n⚠️  No se encontraron componentes CSS para procesar.");
} else {
  console.log(`\n📦 Procesando ${componentFiles.length} componente(s)...\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const file of componentFiles) {
    const outputPath = join(dirname(file), "/");
    const success = await processTailwindToLit(file, outputPath);
    if (success) successCount++;
    else errorCount++;
  }

  console.log("\n" + "=".repeat(40));
  console.log(`✨ Build completado: ${successCount} exitosos`);
  if (errorCount > 0) {
    console.log(`   ❌ Errores: ${errorCount}`);
  }
  console.log("=".repeat(40));
}
