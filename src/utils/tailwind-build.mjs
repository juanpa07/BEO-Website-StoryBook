import { execSync } from "child_process";
import { writeFileSync, readdirSync, statSync } from "fs";
import { dirname, join, basename } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Directorio de componentes
const COMPONENTS_DIR = join(__dirname, "..", "stories");

/**
 * Procesa un archivo CSS con Tailwind y genera el archivo .lit.ts
 */
function processTailwindToLit(inputCss, outputPath) {
  const componentName = basename(outputPath);
  const outputFilePath = `${outputPath}${componentName}.lit.ts`;

  try {
    const tailwindOutput = execSync(`npx tailwindcss -i ${inputCss}`, {
      encoding: "utf8",
    });

    const litCss = `import { css } from 'lit';
    export default css\`
    :host {
      box-sizing: border-box;
    }
    :host *, :host *::before, :host *::after {
      box-sizing: inherit;
    }
    [hidden] {
      display: none !important;
    }
    ${tailwindOutput}\`;`;

    writeFileSync(outputFilePath, litCss, "utf8");
    console.log(`✅ Generado: ${componentName}.lit.ts`);
    return true;
  } catch (error) {
    console.error(`❌ Error procesando ${componentName}:`, error.message || error);
    return false;
  }
}

/**
 * Busca recursivamente todos los archivos CSS en el directorio
 */
function findAllCssFiles(dir, fileList = []) {
  const files = readdirSync(dir);

  files.forEach((file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      // Recursivamente buscar en subdirectorios
      findAllCssFiles(filePath, fileList);
    } else if (
      file.endsWith(".css") &&
      !file.includes("-output.css") &&
      !file.includes(".lit.ts")
    ) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Procesa todos los archivos CSS encontrados
 */
function buildAllStyles() {
  console.log("🚀 Iniciando build de todos los estilos Tailwind...\n");

  const cssFiles = findAllCssFiles(COMPONENTS_DIR);
  
  if (cssFiles.length === 0) {
    console.log("⚠️  No se encontraron archivos CSS para procesar.");
    return;
  }

  console.log(`📁 Encontrados ${cssFiles.length} archivos CSS\n`);

  let successCount = 0;
  let errorCount = 0;

  cssFiles.forEach((cssFile) => {
    const outputPath = join(dirname(cssFile), "/");
    const success = processTailwindToLit(cssFile, outputPath);
    
    if (success) {
      successCount++;
    } else {
      errorCount++;
    }
  });

  console.log("\n" + "=".repeat(50));
  console.log(`✨ Build completado:`);
  console.log(`   ✅ Exitosos: ${successCount}`);
  if (errorCount > 0) {
    console.log(`   ❌ Errores: ${errorCount}`);
  }
  console.log("=".repeat(50));
}

// Ejecutar el build
buildAllStyles();
