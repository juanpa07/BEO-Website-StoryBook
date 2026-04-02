---
name: tailwind-css-builder
description: >
  Úsame para crear, revisar o corregir archivos CSS de componentes Lit en este proyecto.
  Actívame ante frases como "crea el CSS de X", "corrige los estilos de X", "los colores
  no cargan", "añade variante de color/tamaño", "revisa si el CSS de X está bien".
---

# Skill: Tailwind CSS Builder — Creación y Revisión de Estilos

## Contexto del pipeline

Los archivos `.css` de componente **nunca se usan directamente** en el navegador.
El watcher (`tailwind-watch.mjs`) o el build (`tailwind-build.mjs`) los procesan así:

```
cc-{nombre}.css  →  PostCSS + Tailwind 4 + @reference al tema activo  →  cc-{nombre}.lit.ts
```

El `.lit.ts` resultante contiene el CSS ya procesado, embebido en un tagged template de Lit:

```ts
import { css } from 'lit';
export default css`
:host { box-sizing: border-box; }
/* ... estilos compilados con valores resueltos ... */
`;
```

**Regla clave**: Lo que importa es lo que queda en el `.lit.ts`. Las utilidades de Tailwind se
resuelven en build-time con fallbacks de valor hardcodeados. Las CSS variables del documento
principal (`--color-primary-500`) **no están disponibles en runtime** dentro del Shadow DOM,
porque no se generan como custom properties en el CSS global — existen solo como tokens internos
del `@theme` de Tailwind.

---

## Archivos fuente vs. generados

| Archivo | ¿Editar? | Descripción |
|---|---|---|
| `src/styles/inputs/input.css` | Sí | Tema base / tokens compartidos (`@theme`) |
| `src/styles/inputs/beo-input.css` | Sí | Overrides de marca BEO |
| `src/styles/inputs/ebf-input.css` | Sí | Overrides de marca EBF |
| `src/stories/**/cc-*.css` | Sí | Estilos del componente (fuente) |
| `src/stories/**/cc-*.lit.ts` | **NUNCA** | Generado automáticamente — no tocar |
| `src/styles/*.css` | **NUNCA** | Generado automáticamente — no tocar |

---

## Paleta de colores disponible (Tailwind 4)

Las escalas de color vienen definidas en `@theme` del archivo de marca activo.
En Storybook se usa BEO por defecto (configurado en `.storybook/preview.ts`).

### Escalas de marca

| Escala | Tokens disponibles | Base |
|---|---|---|
| `primary` | `50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950` | `--brand-color-1` |
| `secondary` | `50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950` | `--brand-color-2` |
| `accent` | `50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950` | `--brand-color-3` |

**BEO**: primary=`#004B87` (azul marino), secondary=`#0EA5E9` (azul cielo), accent=`#F59E0B` (ámbar)
**EBF**: primary=`#0f298f` (azul), secondary=`#80bc00` (verde), accent=`#fde234` (amarillo)

### Colores de estado y UI

| Token | Valor |
|---|---|
| `error` | `#e1523b` |
| `error-border` | `#e1523b` |
| `error-background` | `#fecaca` |

### Colores de Tailwind estándar

Disponibles los colores base de Tailwind: `neutral`, `gray`, `red`, `green`, `yellow`, `cyan`, `blue`, etc.

---

## Cómo usar colores correctamente

### CORRECTO — utilidades de Tailwind (resuelven en build-time con fallback)

```css
/* Colores de marca */
@apply text-primary-500;          /* color: var(--color-primary-500, #004B87) */
@apply bg-primary-500;
@apply border-primary-500;
@apply text-primary-600;          /* versión oscurecida */
@apply hover:bg-primary-600;

@apply text-secondary-500;
@apply bg-secondary-500;

@apply text-accent-500;

/* Colores estándar de Tailwind */
@apply text-neutral-700;
@apply bg-white;
@apply text-black;
```

### INCORRECTO — variable arbitraria (no existe en runtime en Shadow DOM)

```css
/* MAL: --color-primary-500 no se genera como custom property global */
@apply text-(--color-primary-500);
@apply bg-(--color-secondary-500);
color: var(--color-primary-500);  /* fallará en Shadow DOM */
```

**Por qué falla**: `text-(--color-primary-500)` genera `color: var(--color-primary-500)` sin
fallback. Esa variable solo existe dentro del `@theme` de Tailwind como token interno y **no se
emite** como custom property en el CSS global. Al estar en Shadow DOM, el componente no hereda
nada del documento y el color queda sin resolver.

**Excepción válida**: CSS variables definidas en `:host` o pasadas via `style=""` externo sí
funcionan porque las CSS variables heredan a través del Shadow DOM.

---

## Tipografías disponibles

Definidas en `@theme` — usar las utilidades de Tailwind:

```css
@apply font-main;          /* Open Sans — fuente principal */
@apply font-heading;       /* Open Sans — headings */
@apply font-body;          /* Open Sans — cuerpo */
@apply font-caption;       /* Montserrat — captions */
@apply font-accent;        /* Dancing Script — decorativo */
@apply font-code;          /* Fira Code — monospace */

/* También disponibles directamente: */
@apply font-open-sans;
@apply font-roboto;
@apply font-montserrat;
@apply font-dancing;
@apply font-fira-code;
```

---

## Breakpoints

| Token | Valor |
|---|---|
| `2xs` | `20rem` (320px) |
| `sm` | `640px` (Tailwind default) |
| `md` | `768px` |
| `lg` | `1024px` |
| `xl` | `1280px` |
| `2xl` | `1536px` |

```css
@apply text-base md:text-lg lg:text-xl;
@apply w-full md:w-xs;
```

---

## Contenedores

```css
@apply max-w-8xl;   /* 96rem — contenedor máximo del proyecto */
```

---

## Estructura de un archivo `.css` de componente

### Patrón BEM

Los componentes siguen naming BEM: `block`, `block__element`, `block--modifier`.
Las clases modificadoras mapean 1:1 con las `@property` del componente LitElement.

```css
/* === Base === */
.{nombre} {
  @apply flex flex-col;
}

.{nombre}__{elemento} {
  @apply ...;
}

/* =============== */
/* === Colors ==== */
/* =============== */

.{nombre}--color-primary {
  @apply text-primary-500;
}

.{nombre}--color-secondary {
  @apply text-secondary-500;
}

.{nombre}--color-neutral {
  @apply text-neutral-500;
}

.{nombre}--color-white {
  @apply text-white;
}

.{nombre}--color-black {
  @apply text-black;
}

/* ============= */
/* === Sizes === */
/* ============= */

.{nombre}--size-small {
  @apply px-3 py-1 text-xs;
}

.{nombre}--size-base {
  @apply px-4 py-2 text-base;
}

.{nombre}--size-large {
  @apply px-6 py-3 text-lg;
}
```

### Para colores de fondo + texto combinados (patrón cc-button)

```css
.{nombre}--color-primary {
  @apply bg-primary-500 hover:bg-primary-600 active:bg-primary-600
         text-white
         border-1 border-solid border-primary-500;
}

.{nombre}--color-primary-border {
  @apply border-2 border-solid border-primary-500 bg-transparent
         hover:border-primary-600 hover:bg-primary-500/10
         text-primary-600;
}
```

---

## Opacidad y modificadores de color

En Tailwind 4 la opacidad usa la barra `/`:

```css
@apply bg-primary-500/10;   /* primary-500 al 10% de opacidad */
@apply bg-white/50;         /* blanco al 50% */
@apply text-black/80;
```

---

## CSS arbitrario (cuando Tailwind no alcanza)

Usar solo para valores que no tienen utilidad en Tailwind:

```css
/* Valor exacto que no es un token de Tailwind */
.{nombre}--custom {
  @apply w-[340px];
  @apply top-[calc(100%+8px)];
}

/* CSS nativo dentro de @apply no es posible — usar directamente */
.{nombre}__list {
  list-style-type: disc;
  padding-left: 40px;
}
```

---

## Anidamiento CSS (nativo, compatible con Tailwind 4)

Tailwind 4 usa PostCSS con soporte de CSS nativo, el anidamiento funciona:

```css
.{nombre}__description {
  @apply my-3;

  ul.bullet-list {
    list-style-type: disc;
    padding-left: 40px;

    li {
      margin-top: 10px;
    }
  }
}
```

---

## Responsive

```css
/* Mobile-first (siempre) */
.{nombre}--align-start {
  @apply text-center items-center md:text-left md:items-start;
}

/* Breakpoint específico */
.{nombre}__image {
  @apply w-full md:w-sm lg:w-md;
}
```

---

## Checklist: crear un CSS nuevo

- [ ] Usar naming BEM: `block`, `block__element`, `block--modifier`, `block--modifier-variant`
- [ ] Los modificadores mapean exactamente con las `@property` del `.ts`
- [ ] Colores con utilidades Tailwind (`text-primary-500`), **nunca** `text-(--color-primary-500)`
- [ ] Responsive con breakpoints mobile-first
- [ ] Sin `@import`, sin `@reference` — el pipeline lo inyecta automáticamente
- [ ] Sin valores de colores hardcodeados (`#004B87`) — usar las utilidades de Tailwind
- [ ] Verificar el `.lit.ts` generado para confirmar que los colores tienen fallbacks resueltos

## Checklist: revisar un CSS existente

- [ ] Buscar `text-(--color-*)`, `bg-(--color-*)`, `border-(--color-*)` — reemplazar por utilidades directas
- [ ] Buscar `color: var(--color-*)` en CSS nativo — reemplazar por `@apply text-*`
- [ ] Verificar que el `.lit.ts` generado tenga `var(--color-primary-500, #004B87)` con fallback
- [ ] Comprobar que no se esté editando el `.lit.ts` directamente

---

## Archivo de referencia

Ver: `src/stories/atoms/cc-button/cc-button.css`

Es el componente más completo del proyecto. Muestra el patrón correcto para:
- Escalas de color con hover/active (`bg-primary-500 hover:bg-primary-600`)
- Variantes border-only (`border-primary-500 bg-transparent`)
- Opacidad (`bg-primary-500/10`)
- Múltiples tamaños y radios
