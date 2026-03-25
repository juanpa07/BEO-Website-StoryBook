import { readdirSync, statSync, existsSync, mkdirSync } from "fs";
import { dirname, join, basename } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const COMPONENTS_DIR = join(__dirname, "..", "stories");
const DIST_DIR = join(__dirname, "..", "..", "dist");

/**
 * Busca recursivamente archivos de componentes (cp-*.ts, excluyendo .stories.ts y .lit.ts)
 */
function findComponentFiles(dir, files = []) {
  const items = readdirSync(dir);

  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      findComponentFiles(fullPath, files);
    } else if (
      item.startsWith("cp-") &&
      item.endsWith(".ts") &&
      !item.endsWith(".stories.ts") &&
      !item.endsWith(".lit.ts")
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

// Asegurar que existe el directorio dist
if (!existsSync(DIST_DIR)) {
  mkdirSync(DIST_DIR, { recursive: true });
}

console.log("🚀 Compilando componentes...\n");

const componentFiles = findComponentFiles(COMPONENTS_DIR);

if (componentFiles.length === 0) {
  console.log("⚠️  No se encontraron componentes para compilar.");
  process.exit(0);
}

console.log(`📦 Encontrados ${componentFiles.length} componente(s):\n`);

let successCount = 0;
let errorCount = 0;

for (const file of componentFiles) {
  const componentName = basename(file, ".ts");
  const outputFile = join(DIST_DIR, `${componentName}.bundle.js`);

  try {
    console.log(`   Compilando ${componentName}...`);
    execSync(
      `npx esbuild --bundle --format=esm --minify --outfile="${outputFile}" "${file}"`,
      { stdio: "pipe" }
    );
    const stats = statSync(outputFile);
    const sizeKb = (stats.size / 1024).toFixed(1);
    console.log(`   ✅ ${componentName}.bundle.js (${sizeKb} KB)`);
    successCount++;
  } catch (error) {
    console.error(`   ❌ Error compilando ${componentName}:`, error.message);
    errorCount++;
  }
}

console.log("\n" + "=".repeat(40));
console.log(`✨ Build completado: ${successCount} exitosos`);
if (errorCount > 0) {
  console.log(`   ❌ Errores: ${errorCount}`);
}
console.log("=".repeat(40));

// Mostrar contenido de dist
console.log("\n📁 Contenido de dist/:");
const distFiles = readdirSync(DIST_DIR);
for (const file of distFiles) {
  const filePath = join(DIST_DIR, file);
  const stat = statSync(filePath);
  if (stat.isFile()) {
    const sizeKb = (stat.size / 1024).toFixed(1);
    console.log(`   ${file} (${sizeKb} KB)`);
  }
}
