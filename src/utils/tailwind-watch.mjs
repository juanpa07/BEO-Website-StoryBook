import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";
import { watch, writeFileSync, readFileSync } from "fs";
import { dirname, join, basename } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Directorios
const COMPONENTS_DIR = join(__dirname, "..", "stories");
const STYLES_DIR = join(__dirname, "..", "stories", "styles");
const INPUT_CSS_PATH = join(STYLES_DIR, "input.css");
const GLOBAL_CSS_OUTPUT = join(STYLES_DIR, "tailwind.css");

let isProcessingFile = false;

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
  }
}

/**
 * Procesa un archivo CSS de componente con Tailwind y genera el archivo .lit.ts
 * Solo genera los estilos específicos del componente usando @reference
 */
async function processTailwindToLit(inputCss, outputPath = "styles") {
  const componentName = basename(outputPath);
  const outputFilePath = `${outputPath}${componentName}.lit.ts`;

  try {
    // Leer el CSS del componente
    const componentCss = readFileSync(inputCss, "utf8");

    // Crear CSS con @reference usando ruta absoluta
    const combinedCss = `@reference "${INPUT_CSS_PATH}";\n\n${componentCss}`;

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
console.log("🚀 Procesando CSS global...");
await processGlobalCss();

// Activar `watch` para detectar cambios en los archivos CSS
console.log("👀 Observando cambios en componentes y estilos globales...");

watch(COMPONENTS_DIR, { recursive: true }, async (eventType, filename) => {
  if (!filename || !filename.endsWith(".css") || filename.includes(".lit.ts")) {
    return;
  }

  if (isProcessingFile) return;
  isProcessingFile = true;

  // Ignorar archivos en la carpeta styles/ (excepto input.css para global)
  const isInStylesFolder = filename.startsWith("styles/") || filename.startsWith("styles\\");

  // CSS global (input.css)
  if (filename.includes("input.css")) {
    console.log(`\n🔄 Cambio detectado en estilos globales`);
    await processGlobalCss();
    isProcessingFile = false;
    return;
  }

  // Ignorar otros archivos en styles/
  if (isInStylesFolder) {
    isProcessingFile = false;
    return;
  }

  // CSS de componentes (archivos cp-*.css)
  const pathFileModified = join(COMPONENTS_DIR, filename);
  const pathFileOutput = join(COMPONENTS_DIR, filename, "../");
  console.log(`\n🔄 Cambio detectado en: ${filename}`);
  await processTailwindToLit(pathFileModified, pathFileOutput);
});
