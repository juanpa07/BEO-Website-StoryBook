import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";
import { writeFileSync, readFileSync, readdirSync, statSync } from "fs";
import { dirname, join, basename } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Directorios
const COMPONENTS_DIR = join(__dirname, "..", "stories");
const STYLES_DIR = join(__dirname, "..", "styles");
const INPUT_CSS_PATH = join(STYLES_DIR, "input.css");
const GLOBAL_CSS_OUTPUT = join(STYLES_DIR, "tailwind.css");

/**
 * Procesa el CSS global de Tailwind (input.css -> tailwind.css)
 */
async function processGlobalCss() {
  try {
    const inputCss = readFileSync(INPUT_CSS_PATH, "utf8");
    const result = await postcss([tailwindcss()]).process(inputCss, {
      from: INPUT_CSS_PATH,
    });
    writeFileSync(GLOBAL_CSS_OUTPUT, result.css, "utf8");
    console.log(`✅ Global CSS generado: tailwind.css`);
  } catch (error) {
    console.error(`❌ Error al procesar CSS global:`, error.message || error);
    process.exit(1);
  }
}

/**
 * Procesa un archivo CSS de componente con Tailwind y genera el archivo .lit.ts
 */
async function processTailwindToLit(inputCss, outputPath) {
  const componentName = basename(outputPath);
  const outputFilePath = `${outputPath}${componentName}.lit.ts`;

  try {
    const componentCss = readFileSync(inputCss, "utf8");
    const combinedCss = `@reference "${INPUT_CSS_PATH}";\n\n${componentCss}`;

    const result = await postcss([tailwindcss()]).process(combinedCss, {
      from: inputCss,
    });

    const componentStyles = result.css.trim();

    const litCss = `import { css } from 'lit';
export default css\`
:host {
  box-sizing: border-box;
}
:host *,
:host *::before,
:host *::after {
  box-sizing: inherit;
}
[hidden] {
  display: none !important;
}
${componentStyles}
\`;
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
    } else if (item.endsWith(".css") && item.startsWith("cp-")) {
      files.push(fullPath);
    }
  }

  return files;
}

// Ejecutar build
console.log("🚀 Compilando Tailwind CSS...\n");

// 1. Procesar CSS global
await processGlobalCss();

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
