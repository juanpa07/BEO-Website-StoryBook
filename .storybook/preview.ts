import type { Preview } from '@storybook/web-components-vite';
import "../src/styles/fonts.css";


// Estilos globales de Tailwind preprocesados (variables, theme, base styles)
import '../src/styles/beo-tailwind.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;