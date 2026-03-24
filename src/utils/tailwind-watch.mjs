import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";
import { watch, writeFileSync, readFileSync } from "fs";
import { dirname, join, basename } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Directorios
const COMPONENTS_DIR = join(__dirname, "..", "stories");
const INPUT_CSS_PATH = join(__dirname, "..", "stories", "styles", "input.css");

let isProcessingFile = false;

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

// Activar `watch` para detectar cambios en los archivos CSS
console.log("👀 Observando cambios en los componentes...");

watch(COMPONENTS_DIR, { recursive: true }, async (eventType, filename) => {
  if (
    filename &&
    filename.endsWith(".css") &&
    !filename.includes(".lit.ts") &&
    !filename.includes("input.css") &&
    !filename.includes("theme-only.css")
  ) {
    const pathFileModified = join(COMPONENTS_DIR, filename);
    const pathFileOutput = join(COMPONENTS_DIR, filename, "../");

    if (isProcessingFile) return;
    isProcessingFile = true;

    console.log(`\n🔄 Cambio detectado en: ${filename}`);
    await processTailwindToLit(pathFileModified, pathFileOutput);
  }
});
