import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";
import { watch, writeFileSync, readFileSync } from "fs";
import { dirname, join, basename } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Directorios
const COMPONENTS_DIR = join(__dirname, "..", "stories");
const STYLES_DIR = join(__dirname, "..", "styles");
const INPUTS_DIR = join(STYLES_DIR, "inputs");
const INPUT_CSS_PATH = join(INPUTS_DIR, "input.css");
const GLOBAL_CSS_OUTPUT = join(STYLES_DIR, "tailwind.css");
const DESIGN_TOKENS_OUTPUT = join(__dirname, "design-tokens.ts");
const PREVIEW_PATH = join(__dirname, "..", "..", ".storybook", "preview.ts");

let isProcessingFile = false;

/**
 * Detecta el tema activo leyendo el import en preview.ts
 * Retorna el nombre del archivo input correspondiente (ej: "beo-input.css")
 */
function detectActiveBrand() {
  try {
    const previewContent = readFileSync(PREVIEW_PATH, "utf8");
    // Buscar import de *-tailwind.css
    const match = previewContent.match(/import\s+['"].*\/(\w+)-tailwind\.css['"]/);
    if (match) {
      const brand = match[1]; // "beo", "ebf", o "tailwind"
      if (brand === "tailwind") {
        return "input.css"; // tema base
      }
      return `${brand}-input.css`;
    }
  } catch (error) {
    console.warn("⚠️  No se pudo leer preview.ts, usando input.css por defecto");
  }
  return "input.css";
}

/**
 * Extrae variables del bloque @theme del CSS
 */
function extractThemeVars(css) {
  const themeMatch = css.match(/@theme(?:\s+inline)?\s*\{([\s\S]*?)\n\}/);
  if (!themeMatch) return {};

  const themeBlock = themeMatch[1];
  const vars = {};
  const varRegex = /--([\w-]+):\s*([^;]+);/g;
  let match;

  while ((match = varRegex.exec(themeBlock)) !== null) {
    const [, name, value] = match;
    vars[name] = value.trim();
  }
  return vars;
}

/**
 * Genera design-tokens.ts desde el CSS del tema activo en preview.ts
 */
function generateDesignTokens() {
  const activeInputFile = detectActiveBrand();
  const activeInputPath = join(INPUTS_DIR, activeInputFile);

  let css;
  try {
    css = readFileSync(activeInputPath, "utf8");
  } catch (error) {
    console.warn(`⚠️  No se encontró ${activeInputFile}, usando input.css`);
    css = readFileSync(INPUT_CSS_PATH, "utf8");
  }

  const vars = extractThemeVars(css);

  const brandColors = {
    'brand-1': { varName: 'brand-color-1', name: 'Primary', description: 'Color institucional principal' },
    'brand-2': { varName: 'brand-color-2', name: 'Secondary', description: 'Color de marca secundario' },
    'brand-3': { varName: 'brand-color-3', name: 'Accent', description: 'Color de acento para CTAs' },
    'error': { varName: 'color-error', name: 'Error', description: 'Alertas, errores y acciones destructivas' }
  };

  const fonts = {
    'open-sans': { varName: 'font-open-sans', name: 'Open Sans', usage: 'Fuente principal para cuerpo y lectura.' },
    'montserrat': { varName: 'font-montserrat', name: 'Montserrat', usage: 'Títulos y jerarquías altas.' },
    'dancing': { varName: 'font-dancing', name: 'Dancing Script', usage: 'Textos decorativos o de acento.' },
    'fira-code': { varName: 'font-fira-code', name: 'Fira Code', usage: 'Monospaced para bloques de código.' }
  };

  const colorsOutput = {};
  for (const [key, config] of Object.entries(brandColors)) {
    const value = vars[config.varName];
    if (value) {
      colorsOutput[key.replace('-', '')] = { name: config.name, value, description: config.description };
    }
  }

  const typographyOutput = {};
  for (const [key, config] of Object.entries(fonts)) {
    const value = vars[config.varName];
    if (value) {
      typographyOutput[key.replace(/-/g, '')] = { name: config.name, value, usage: config.usage };
    }
  }

  const output = `// AUTO-GENERATED - No editar manualmente
// Generado desde: src/styles/inputs/${activeInputFile}
// Tema activo detectado en: .storybook/preview.ts

export const brandColors = ${JSON.stringify(colorsOutput, null, 2)};

export const typography = ${JSON.stringify(typographyOutput, null, 2)};
`;

  writeFileSync(DESIGN_TOKENS_OUTPUT, output, 'utf-8');
  console.log(`✅ Design tokens generados desde: ${activeInputFile}`);
}

/**
 * Procesa el CSS global de Tailwind (input.css -> tailwind.css)
 */
async function processGlobalCss() {
  try {
    // Generar design tokens desde el tema activo en preview.ts
    generateDesignTokens();

    const inputCss = readFileSync(INPUT_CSS_PATH, "utf8");
    const result = await postcss([tailwindcss()]).process(inputCss, {
      from: INPUT_CSS_PATH,
    });
    writeFileSync(GLOBAL_CSS_OUTPUT, result.css, "utf8");
    console.log(`✅ Global CSS generado: tailwind.css`);
  } catch (error) {
    console.error(`❌ Error al procesar CSS global:`, error.message || error);
  }
}

/**
 * Procesa un archivo CSS de componente con Tailwind y genera el archivo .lit.ts
 * Solo genera los estilos específicos del componente usando @reference
 * Usa el archivo de input del tema activo para obtener los valores correctos de marca
 */
async function processTailwindToLit(inputCss, outputPath = "styles") {
  const componentName = basename(outputPath);
  const outputFilePath = `${outputPath}${componentName}.lit.ts`;

  try {
    // Leer el CSS del componente
    const componentCss = readFileSync(inputCss, "utf8");

    // Usar el tema activo para @reference (así los fallbacks usan los colores de marca correctos)
    const activeInputFile = detectActiveBrand();
    const activeInputPath = join(INPUTS_DIR, activeInputFile);

    // Crear CSS con @reference usando el tema activo
    const combinedCss = `@reference "${activeInputPath}";\n\n${componentCss}`;

    // Procesar con PostCSS + Tailwind
    const result = await postcss([tailwindcss()]).process(combinedCss, {
      from: inputCss,
    });

    // El output debería ser solo los estilos del componente
    const componentStyles = result.css.trim();

    // Formatear el output para Lit
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
    console.log(`✅ Archivo generado: ${componentName}.lit.ts`);
    return litCss;
  } catch (error) {
    console.error(`❌ Error al procesar CSS:`, error.message || error);
  } finally {
    isProcessingFile = false;
  }
}

// Procesar CSS global inicialmente
console.log("🚀 Procesando CSS global y design tokens...");
await processGlobalCss();

// Activar `watch` para detectar cambios en los archivos CSS
console.log("👀 Observando cambios en:");
console.log("   - src/styles/inputs/*.css (estilos globales + tokens)");
console.log("   - src/stories/**/*.css (componentes)");

// Watcher para src/styles/inputs/ (CSS globales y design tokens)
watch(INPUTS_DIR, async (eventType, filename) => {
  if (!filename || !filename.endsWith(".css")) return;
  if (isProcessingFile) return;
  isProcessingFile = true;

  console.log(`\n🔄 Cambio detectado en inputs/${filename}`);
  await processGlobalCss();
  isProcessingFile = false;
});

// Watcher para src/stories/ (componentes)
watch(COMPONENTS_DIR, { recursive: true }, async (eventType, filename) => {
  if (!filename || !filename.endsWith(".css") || filename.includes(".lit.ts")) {
    return;
  }

  if (isProcessingFile) return;
  isProcessingFile = true;

  // CSS de componentes
  const pathFileModified = join(COMPONENTS_DIR, filename);
  const pathFileOutput = join(COMPONENTS_DIR, filename, "../");
  console.log(`\n🔄 Cambio detectado en: ${filename}`);
  await processTailwindToLit(pathFileModified, pathFileOutput);
});
