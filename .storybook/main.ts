import type { StorybookConfig } from '@storybook/web-components-vite';
import { mergeConfig } from 'vite';
import { fileURLToPath, URL } from 'url';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  "framework": "@storybook/web-components-vite",
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@helper': fileURLToPath(new URL('../src/helper', import.meta.url)),
          '@interfaces': fileURLToPath(new URL('../src/interfaces', import.meta.url)),
          '@enums': fileURLToPath(new URL('../src/enums', import.meta.url)),
          '@types': fileURLToPath(new URL('../src/types', import.meta.url)),
          '@utils': fileURLToPath(new URL('../src/utils', import.meta.url)),
          '@public': fileURLToPath(new URL('../src/public', import.meta.url)),
        },
      },
    });
  },
};
export default config;