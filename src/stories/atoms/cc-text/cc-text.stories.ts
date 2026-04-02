import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import './cc-text';

import type { TextProperties } from '@interfaces/text.interface';

type TextArgs = Partial<TextProperties>;

const meta: Meta<TextArgs> = {
  title: 'Atoms/Text',
  component: 'cc-text',
  tags: ['autodocs'],

  argTypes: {
    text: {
      control: 'text',
      description: 'Text content (supports HTML)',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'neutral', 'neutral-dark', 'gray', 'black', 'white'],
      description: 'Color variant',
    },
    fontSize: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'],
      description: 'Font size — heading values render semantic HTML tags',
    },
    fontFamily: {
      control: 'select',
      options: ['open-sans', 'roboto', 'montserrat', 'dancing'],
      description: 'Font family',
    },
    fontStyle: {
      control: 'select',
      options: ['normal', 'italic'],
      description: 'Font style',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Text alignment',
    },
    weight: {
      control: 'select',
      options: ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'],
      description: 'Font weight',
    },
  },

  parameters: {
    docs: {
      source: {
        type: 'dynamic',
        language: 'html',
      },
    },
  },

  render: (args) => html`
    <cc-text
      text=${ifDefined(args.text)}
      color=${ifDefined(args.color)}
      fontSize=${ifDefined(args.fontSize)}
      fontFamily=${ifDefined(args.fontFamily)}
      fontStyle=${ifDefined(args.fontStyle)}
      align=${ifDefined(args.align)}
      weight=${ifDefined(args.weight)}
    ></cc-text>
  `,
};

export default meta;
type Story = StoryObj<TextArgs>;

export const Default: Story = {
  args: {
    text: 'This is a Title',
    color: 'primary',
    fontSize: '6xl',
    fontFamily: 'roboto',
    align: 'left',
    weight: 'normal',
  },
};

export const H1Heading: Story = {
  args: {
    text: 'This is a Heading',
    color: 'secondary',
    fontSize: 'h1',
    fontFamily: 'open-sans',
    align: 'left',
  },
};

export const Description: Story = {
  args: {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
    color: 'neutral',
    fontSize: 'base',
    fontFamily: 'open-sans',
    align: 'left',
  },
};

export const AllSizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 8px;">
      ${(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'] as const).map(
        (size) => html`
          <cc-text text=${size} fontSize=${size} color="primary" fontFamily="open-sans"></cc-text>
        `
      )}
    </div>
  `,
};

export const AllColors: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 8px; background: #f0f0f0; padding: 16px;">
      ${(['primary', 'secondary', 'neutral', 'neutral-dark', 'gray', 'black'] as const).map(
        (color) => html`
          <cc-text text=${color} color=${color} fontSize="xl" fontFamily="open-sans"></cc-text>
        `
      )}
    </div>
  `,
};

export const FontFamilies: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 8px;">
      ${(['open-sans', 'roboto', 'montserrat', 'dancing'] as const).map(
        (family) => html`
          <cc-text text=${family} fontFamily=${family} fontSize="xl" color="primary"></cc-text>
        `
      )}
    </div>
  `,
};
