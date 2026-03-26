#!/usr/bin/env node
/**
 * Genera design-tokens.ts parseando el CSS del tema activo en preview.ts
 * Ejecutar: node src/utils/generate-design-tokens.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputsDir = join(__dirname, '../styles/inputs');
const outputPath = join(__dirname, 'design-tokens.ts');
const previewPath = join(__dirname, '../../.storybook/preview.ts');

/**
 * Detecta el tema activo leyendo el import en preview.ts
 */
function detectActiveBrand() {
  try {
    const previewContent = readFileSync(previewPath, 'utf-8');
    const match = previewContent.match(/import\s+['"].*\/(\w+)-tailwind\.css['"]/);
    if (match) {
      const brand = match[1];
      if (brand === 'tailwind') return 'input.css';
      return `${brand}-input.css`;
    }
  } catch (error) {
    console.warn('⚠️  No se pudo leer preview.ts, usando input.css por defecto');
  }
  return 'input.css';
}

/**
 * Extrae variables del bloque @theme del CSS
 */
function extractThemeVars(css) {
  const themeMatch = css.match(/@theme\s+inline\s*\{([\s\S]*?)\n\}/);
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

// Detectar tema activo
const activeInputFile = detectActiveBrand();
const activeInputPath = join(inputsDir, activeInputFile);

let css;
try {
  css = readFileSync(activeInputPath, 'utf-8');
} catch (error) {
  console.warn(`⚠️  No se encontró ${activeInputFile}, usando input.css`);
  css = readFileSync(join(inputsDir, 'input.css'), 'utf-8');
}

const vars = extractThemeVars(css);

// Configuración de tokens a extraer
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

// Construir objetos de salida
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

// Generar archivo TypeScript
const output = `// AUTO-GENERATED - No editar manualmente
// Generado desde: src/styles/inputs/${activeInputFile}
// Tema activo detectado en: .storybook/preview.ts

export const brandColors = ${JSON.stringify(colorsOutput, null, 2)};

export const typography = ${JSON.stringify(typographyOutput, null, 2)};
`;

writeFileSync(outputPath, output, 'utf-8');
console.log(`✅ design-tokens.ts generado desde: ${activeInputFile}`);
console.log(`   Colores: ${Object.keys(colorsOutput).join(', ')}`);
console.log(`   Fuentes: ${Object.keys(typographyOutput).join(', ')}`);
