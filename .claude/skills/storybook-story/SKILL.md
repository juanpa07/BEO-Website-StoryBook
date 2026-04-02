---
name: storybook-story
description: >
  Úsame siempre que necesites crear un nuevo componente Storybook (story) desde cero,
  migrar un story viejo a la convención actual, o auditar si un story existente cumple
  la estructura establecida. Actívame ante frases como "crea el story de X", "migra
  este story", "agrega una story para el componente Y", o "revisa si este story está bien".
---

# Skill: Storybook Story — Creación y Migración

## Contexto del proyecto

Este es un Design System basado en **Lit + Web Components** con:
- **Storybook** como entorno de documentación y testing
- **Tailwind CSS** como sistema de estilos (procesado a `.lit.ts` automáticamente)
- **Atomic Design**: `atoms/`, `molecules/`, `organisms/`, `pages/`
- **Tests** escritos como `play` functions dentro del propio `.stories.ts`

Cada componente vive en `src/stories/{nivel}/cc-{nombre}/` con cuatro archivos:

```
cc-{nombre}/
├── cc-{nombre}.css        ← estilos Tailwind (FUENTE, sí editar)
├── cc-{nombre}.lit.ts     ← módulo CSS de Lit (GENERADO, NO editar)
├── cc-{nombre}.ts         ← clase LitElement
└── cc-{nombre}.stories.ts ← stories + tests
```

### Prefijo canónico: `cc-`

**Todos** los componentes usan el prefijo `cc-` — en el nombre de carpeta, archivos, tag HTML,
nombre de clase y `defineCustomElement`. Si el componente a migrar usa otro prefijo (`ebf-`,
`cp-`, `beo-`, etc.), **renombrarlo completo** como parte de la migración:

| Qué cambiar | Ejemplo antes | Ejemplo después |
|---|---|---|
| Carpeta | `ebf-countdown/` | `cc-countdown/` |
| Archivos | `ebf-countdown.ts` | `cc-countdown.ts` |
| Clase TS | `class EbfCountdown` | `class CcCountdown` |
| Tag HTML | `ebf-countdown` | `cc-countdown` |
| `defineCustomElement` | `'ebf-countdown'` | `'cc-countdown'` |
| `HTMLElementTagNameMap` | `'ebf-countdown'` | `'cc-countdown'` |
| Import del `.lit` | `./ebf-countdown.lit` | `./cc-countdown.lit` |
| Import en stories | `import './ebf-countdown'` | `import './cc-countdown'` |
| `component:` en meta | `'ebf-countdown'` | `'cc-countdown'` |
| Tags HTML en renders | `<ebf-countdown ...>` | `<cc-countdown ...>` |
| Imports de sub-componentes | `../../atoms/ebf-icon/ebf-icon` | `../../atoms/cc-icon/cc-icon` |

Eliminar la carpeta con el prefijo viejo una vez creada la nueva.

---

## Estructura canónica de un `.ts` (componente)

### Imports de Lit 3.3.2

En Lit 3.3.2, `CSSResultGroup` y `TemplateResult` son **tipos** y deben importarse con `import type`:

```ts
import { LitElement, html } from 'lit';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { property, state, query } from 'lit/decorators.js';

import { defineCustomElement } from '@helper/defineCustomElement';
import type { {Nombre}Properties } from '@interfaces/{nombre}.interface';

import componentStyles from './cc-{nombre}.lit';
```

**Regla**: Separar imports de valores (`LitElement`, `html`) de imports de tipos (`CSSResultGroup`, `TemplateResult`).

---

## Estructura canónica de un `.stories.ts`

### 1. Bloque de imports

```ts
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

// Registro del componente principal (siempre)
import './cc-{nombre}';

// Componentes secundarios usados en stories compuestas (si aplica)
import '../cc-{otro}/cc-{otro}';

// Interface de propiedades
import type { {Nombre}Properties } from '@interfaces/{nombre}.interface';
```

**Regla**: Importar el componente propio con ruta relativa `./cc-{nombre}`. Nunca con alias para el componente principal.

---

### 2. Tipo de args

```ts
type {Nombre}Args = Partial<{Nombre}Properties>;
```

Siempre `Partial<>` de la interface — nunca definir props inline aquí.

---

### 3. Meta object

```ts
const meta: Meta<{Nombre}Args> = {
  title: '{Nivel}/{NombreVisual}',   // Ej: 'Atoms/Icon', 'Molecules/Card'
  component: 'cc-{nombre}',
  tags: ['autodocs'],

  argTypes: {
    // Una entrada por cada @property del componente
    {prop}: {
      control: '{tipo}',             // 'text' | 'select' | 'color' | 'boolean' | 'range'
      options: [...],                // solo para 'select'
      description: 'Descripción clara en español o inglés',
    },
    // Para rangos numéricos:
    {propNumerica}: {
      control: { type: 'range', min: X, max: Y, step: Z },
      description: '...',
    },
  },

  parameters: {
    docs: {
      source: {
        type: 'dynamic',   // SIEMPRE dynamic para Web Components con Lit
        language: 'html',
      },
    },
  },

  // render global — solo si TODOS los stories usan la misma plantilla base
  render: (args) => html`
    <cc-{nombre}
      name=${ifDefined(args.name)}
      size=${ifDefined(args.size)}
    ></cc-{nombre}>
  `,
};

export default meta;
type Story = StoryObj<{Nombre}Args>;
```

**Reglas del render global:**
- Usar `ifDefined()` para TODOS los atributos primitivos (string, number).
- Usar `.prop=${value}` (binding con punto) solo para objetos/arrays.
- Si un story necesita un layout radicalmente distinto, sobreescribir `render` en ese story individual.

---

### 4. Stories individuales

#### Story simple (args-driven)
```ts
export const Default: Story = {
  args: {
    prop1: 'valor',
    prop2: 42,
  },
};
```

#### Story con render propio (layout compuesto)
```ts
export const MultipleVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <cc-{nombre} prop1="a"></cc-{nombre}>
      <cc-{nombre} prop1="b"></cc-{nombre}>
    </div>
  `,
};
```

#### Story con componentes hermanos
```ts
export const WithOtherComponent: Story = {
  render: () => html`
    <cc-otro .prop=${{ key: 'val' }}></cc-otro>
  `,
};
```

#### Story con play function (test)
```ts
export const Interactive: Story = {
  args: { ... },
  play: async ({ canvasElement }) => {
    const shadowRoot = canvasElement.querySelector('cc-{nombre}')?.shadowRoot;
    const el = shadowRoot?.querySelector('button');
    await userEvent.click(el!);
    await expect(el).toHaveAttribute('aria-pressed', 'true');
  },
};
```

---

### 5. Naming convention de stories

| Nombre story | Cuándo usarla |
|---|---|
| `Default` | Estado base/neutro del componente |
| `{Variante}` | Una variante específica (ej: `FilledIcon`, `OutlineIcon`) |
| `DifferentSizes` | Grid/flex mostrando todas las variantes de size |
| `AllColors` | Paleta completa de colores |
| `With{OtroComponente}` | Composición con otro componente del sistema |
| `{Contexto}Full` | Caso límite o tamaño extremo |
| `Interactive` | Story con `play` function para testing |

---

### 6. Binding de atributos — regla crítica

| Tipo de prop | Sintaxis en template | Ejemplo |
|---|---|---|
| `string` primitivo | `attr=${ifDefined(args.x)}` | `name=${ifDefined(args.name)}` |
| `number` primitivo | `attr=${ifDefined(args.x)}` | `fill=${ifDefined(args.fill)}` |
| `boolean` | `.prop=${args.x}` | `.disabled=${args.disabled}` |
| `object` / `array` | `.prop=${{ key: val }}` | `.iconProps=${{ name: 'x' }}` |

**Nunca** usar `.prop` para strings/numbers simples — causa problemas con Storybook controls.

---

## Checklist: crear un story nuevo

Antes de crear un `.stories.ts`, tener claro:

- [ ] ¿Cuál es el nombre del componente (`cc-{nombre}`)y su nivel atómico, molecula, organismo?
- [ ] ¿Cuál es su interface (`{Nombre}Properties`)?
- [ ] ¿Qué `@property` expone el componente?
- [ ] ¿Tiene variantes de tamaño, color, estado?
- [ ] ¿Se compone con otros componentes?
- [ ] ¿Necesita stories de testing con `play` functions?

---

## Checklist: migrar un story viejo

1. **Renombrar a prefijo `cc-`**: carpeta, archivos, clase, tag, `defineCustomElement`, `HTMLElementTagNameMap`, imports de sub-componentes — ver tabla de prefijos arriba
2. Verificar que el import del componente sea `./cc-{nombre}` (relativo)
3. Verificar que args use `Partial<{Nombre}Properties>`, no tipos inline
4. Agregar `parameters.docs.source.type: 'dynamic'` si no está
5. Reemplazar bindings de string/number con `.prop` → usar `attr=${ifDefined()}`
6. Mover render repetido en cada story al `render` global del `meta`
7. Verificar que el `title` siga el patrón `{Nivel}/{NombreVisual}` (mayúscula)
8. Asegurarse que `tags: ['autodocs']` esté presente
9. Renombrar stories según la convención de la tabla de naming
10. Eliminar la carpeta vieja con el prefijo anterior

---

## Ejemplo de referencia completo

Ver: `src/stories/atoms/cc-icon/cc-icon.stories.ts`

Este es el story más completo del proyecto y sirve como referencia canónica. Incluye:
- Meta con argTypes completos y parámetros de docs
- Render global con `ifDefined`
- Stories simples (args-driven)
- Stories con render propio (layout compuesto)
- Stories con componentes hermanos (`WithButtonComponent`, `WithLinkComponent`)