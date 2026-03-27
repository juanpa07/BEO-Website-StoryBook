/**
 * styles-build.mjs
 *
 * Procesa todos los archivos .css en src/styles/inputs/ como entry points individuales.
 *
 * Regla de nombres de salida:
 *   input.css       →  src/styles/tailwind.css        (dev)
 *   input.css       →  dist/tailwind.min.css           (build)
 *
 *   ebf-input.css   →  src/styles/ebf-tailwind.css    (dev)
 *   ebf-input.css   →  dist/ebf-tailwind.min.css       (build)
 *
 * Modos:
 *   node ./src/utils/styles-build.mjs            → build (minificado → dist/)
 *   node ./src/utils/styles-build.mjs --watch    → dev   (sin minificar → src/styles/) + watcher
 */

import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";
import cssnano from "cssnano";
import {
  readFileSync,
  writeFileSync,
  readdirSync,
  statSync,
  existsSync,
  mkdirSync,
  watch,
} from "fs";
import { dirname, join, basename, extname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

// ─── Rutas base ───────────────────────────────────────────────────────────────
const INPUTS_DIR = join(__dirname, "..", "styles", "inputs");
const STYLES_DIR = join(__dirname, "..", "styles");
const THEME_REF  = join(INPUTS_DIR, "input.css");         // tokens compartidos (src/styles/inputs/input.css)
const DIST_DIR   = join(__dirname, "..", "..", "dist");

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Convierte el nombre del archivo de entrada en el nombre base de salida.
 *
 *   input.css     →  "tailwind"
 *   ebf-input.css →  "ebf-tailwind"
 *   foo-input.css →  "foo-tailwind"
 *   otras-cosas.css → "otras-cosas-tailwind"  (fallback genérico)
 */
function toOutputBaseName(filename) {
  const name = basename(filename, ".css"); // sin extensión

  if (name === "input") {
    return "tailwind";
  }

  if (name.endsWith("-input")) {
    return name.slice(0, -"-input".length) + "-tailwind";
  }

  // fallback: añade "-tailwind" al final
  return `${name}-tailwind`;
}

/** Devuelve todos los archivos .css de la carpeta inputs/ */
function getInputFiles() {
  if (!existsSync(INPUTS_DIR)) {
    console.warn(`⚠️  Carpeta no encontrada: ${INPUTS_DIR}`);
    return [];
  }
  return readdirSync(INPUTS_DIR).filter((f) => {
    const full = join(INPUTS_DIR, f);
    return statSync(full).isFile() && extname(f) === ".css";
  });
}

/** Garantiza que un directorio exista */
function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

// ─── Procesado ────────────────────────────────────────────────────────────────

/**
 * Procesa un entry-point CSS.
 *
 * @param {string} filename   - Nombre del archivo en inputs/ (ej. "ebf-input.css")
 * @param {boolean} isBuild   - true = minifica y escribe en dist/
 *                              false = sin minificar, escribe en src/styles/
 */
async function processEntry(filename, isBuild) {
  const inputPath   = join(INPUTS_DIR, filename);
  const baseName    = toOutputBaseName(filename);          // "ebf-tailwind"

  // Rutas de salida
  const devOutput   = join(STYLES_DIR, `${baseName}.css`);           // src/styles/ebf-tailwind.css
  const distOutput  = join(DIST_DIR, `${baseName}.min.css`);         // dist/ebf-tailwind.min.css

  try {
    const rawCss = readFileSync(inputPath, "utf8");

    // Solo agregar @reference si el archivo NO tiene su propio bloque @theme
    // Los archivos con @theme propio deben procesarse de forma independiente
    // para que sus CSS custom properties se exporten correctamente
    const isThemeFile = inputPath === THEME_REF;
    const hasOwnTheme = /@theme\s*\{/.test(rawCss);
    const processedCss = (isThemeFile || hasOwnTheme)
      ? rawCss
      : `@reference "${THEME_REF}";\n\n${rawCss}`;

    if (isBuild) {
      // ── BUILD: minificado → dist/ ──────────────────────────────────────────
      ensureDir(DIST_DIR);

      const result = await postcss([
        tailwindcss(),
        cssnano({ preset: "default" }),
      ]).process(processedCss, { from: inputPath, to: distOutput });

      writeFileSync(distOutput, result.css, "utf8");

      const sizeKb = (result.css.length / 1024).toFixed(1);
      console.log(`✅  ${filename}  →  dist/${baseName}.min.css  (${sizeKb} KB)`);
    } else {
      // ── DEV/WATCH: sin minificar → src/styles/ ─────────────────────────────
      const result = await postcss([tailwindcss()]).process(processedCss, {
        from: inputPath,
        to:   devOutput,
      });

      writeFileSync(devOutput, result.css, "utf8");

      const sizeKb = (result.css.length / 1024).toFixed(1);
      console.log(`✅  ${filename}  →  src/styles/${baseName}.css  (${sizeKb} KB)`);
    }
  } catch (err) {
    console.error(`❌  Error procesando "${filename}":`, err.message ?? err);
  }
}

/** Procesa todos los entry points */
async function processAll(isBuild) {
  const files = getInputFiles();

  if (files.length === 0) {
    console.log("⚠️  No se encontraron archivos .css en src/styles/inputs/");
    return;
  }

  const mode = isBuild ? "BUILD (minificado → dist/)" : "DEV (sin minificar → src/styles/)";
  console.log(`\n📦  Modo: ${mode}`);
  console.log(`    Procesando ${files.length} entry point(s)...\n`);

  await Promise.all(files.map((f) => processEntry(f, isBuild)));

  console.log("\n✨  Completado.\n");
}

// ─── Watch ────────────────────────────────────────────────────────────────────

function startWatch() {
  console.log("👀  Observando cambios en src/styles/inputs/ ...\n");

  const pending = new Map();

  watch(INPUTS_DIR, { recursive: false }, (eventType, filename) => {
    if (!filename || extname(filename) !== ".css") return;

    if (pending.has(filename)) clearTimeout(pending.get(filename));

    pending.set(
      filename,
      setTimeout(async () => {
        pending.delete(filename);
        console.log(`\n🔄  Cambio detectado: ${filename}`);
        await processEntry(filename, false); // dev mode en watch
      }, 150)
    );
  });
}

// ─── Entry point ──────────────────────────────────────────────────────────────

const isWatch = process.argv.includes("--watch");
const isBuild = !isWatch; // sin --watch = build

await processAll(isBuild);

if (isWatch) {
  startWatch();
}
