# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos

```bash
# Desarrollo (Storybook + Tailwind watch en paralelo)
npm run storybook

# Solo Storybook (puerto 6008)
npm run watch:storybook

# Solo watch de CSS global (src/styles/inputs/ → src/styles/)
npm run watch:styles

# Ejecutar tests (Vitest + Playwright en Chromium headless vía Storybook)
npx vitest

# Build completo de distribución (tailwind + componentes + estilos)
npm run build:dist

# Rebuild de CSS (global + .lit.ts de componentes)
npm run build:tailwind

# Build estático de Storybook
npm run build-storybook
```

No hay comando de lint configurado.

## Pipeline de estilos CSS

Los archivos `.lit.ts` y los archivos en `src/styles/` son **generados automáticamente**. Nunca editarlos directamente.

### Archivos fuente (sí editar)

```
src/styles/inputs/
  input.css        ← tema base / tokens compartidos
  beo-input.css    ← overrides de marca BEO
  ebf-input.css    ← overrides de marca EBF

src/stories/atoms/cc-{nombre}/
  cc-{nombre}.css  ← estilos Tailwind del componente (fuente)
```

### Scripts de preprocesado (`src/utils/`)

**`tailwind-watch.mjs`** — watcher para desarrollo de componentes (lo lanza `npm run watch:tailwind`):
- Al arrancar, procesa `input.css` → `tailwind.css` (CSS global, sin minificar)
- Observa recursivamente **todos los `.css` dentro de `src/stories/`**; cuando detecta un cambio en un `cc-*.css` de componente, regenera automáticamente su `cc-*.lit.ts` usando `@reference` sobre `input.css`
- Si el archivo modificado es `input.css`, regenera el CSS global
- **Este es el script clave en desarrollo**: editar un `.css` de componente y el `.lit.ts` se actualiza solo

**`tailwind-build.mjs`** — build completo en un solo paso (equivalente al watcher pero para CI/dist):
1. Procesa cada archivo en `inputs/` con PostCSS + Tailwind → escribe `src/styles/{beo,ebf,tailwind}.css` (dev) y `dist/{beo,ebf,tailwind}.min.css` (minificado con cssnano)
2. Busca recursivamente archivos `cc-*.css` en `src/stories/` y por cada uno genera el `cc-*.lit.ts` correspondiente (CSS minificado, envuelto en `` css`...` `` de Lit)

**`styles-build.mjs`** — procesa solo el CSS global (sin tocar componentes):
- Sin `--watch`: minifica y escribe en `dist/` (modo build)
- Con `--watch`: sin minificar, escribe en `src/styles/` y observa cambios en `inputs/`
- Convención de nombres: `{marca}-input.css` → `{marca}-tailwind.css`

**`build-components.mjs`** — compila componentes `cp-*.ts` con esbuild → `dist/*.bundle.js` (actualmente no hay componentes con ese prefijo; los componentes usan el prefijo `cc-`).

### Cómo los brand inputs heredan el tema base

En `styles-build.mjs`, cuando se procesa un archivo que no es `input.css`, se inyecta automáticamente `@reference "input.css"` al inicio del CSS. Esto hace que `beo-input.css` y `ebf-input.css` hereden los tokens `@theme` de `input.css` sin duplicarlos en el output.

### Tabla de salidas

| Input | CSS dev | CSS dist | .lit.ts |
|---|---|---|---|
| `input.css` | `src/styles/tailwind.css` | `dist/tailwind.min.css` | — |
| `beo-input.css` | `src/styles/beo-tailwind.css` | `dist/beo-tailwind.min.css` | — |
| `ebf-input.css` | `src/styles/ebf-tailwind.css` | `dist/ebf-tailwind.min.css` | — |
| `cc-{nombre}.css` | — | — | `cc-{nombre}.lit.ts` |

Storybook carga `beo-tailwind.css` por defecto (configurado en `.storybook/preview.ts`).

## Arquitectura de componentes

Cada componente vive en `src/stories/atoms/cc-{nombre}/` con cuatro archivos:

- `cc-{nombre}.css` — estilos Tailwind (fuente, sí editar)
- `cc-{nombre}.lit.ts` — módulo CSS de Lit (**generado**, no editar)
- `cc-{nombre}.ts` — clase LitElement
- `cc-{nombre}.stories.ts` — stories de Storybook + tests con play functions

Los componentes usan naming BEM (`button`, `button--color-primary`, `button--size-large`, etc.) mapeando sus `@property` a clases modificadoras en un método `getClasses()`.

El registro del custom element se hace con `defineCustomElement()` del helper `@helper/defineCustomElement` — protege contra doble registro durante el HMR de Storybook.

## Tests

Los tests viven dentro de los `.stories.ts` como `play` functions. Se ejecutan en Chromium headless real vía Playwright y acceden al Shadow DOM directamente:

```ts
const shadowRoot = canvasElement.querySelector('cc-button')?.shadowRoot;
const button = shadowRoot?.querySelector('button');
```

Las importaciones de utilidades de test vienen de `storybook/test` (`expect`, `fn`, `userEvent`).

## Alias de rutas

| Alias | Resuelve a |
|---|---|
| `@atoms` | `src/stories/atoms` |
| `@molecules` | `src/stories/molecules` |
| `@organisms` | `src/stories/organisms` |
| `@interfaces` | `src/interfaces` |
| `@helper` | `src/helper` |
| `@utils` | `src/utils` |
| `@styles` | `src/styles` |
| `@enums` | `src/enums` |


## Storybook Stories

Para **crear un story nuevo** o **migrar uno existente** a la convención actual,
consulta siempre el skill: `@.claude/skills/storybook-story/SKILL.md`

El story de referencia canónica del proyecto es:
`src/stories/atoms/cc-icon/cc-icon.stories.ts`