import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './cc-icon'; 
import '../cc-button/cc-button';
import '../cc-link/cc-link';

import type { IconProperties } from '@interfaces/icon.interface';

type IconArgs = Partial<IconProperties>;

const meta: Meta<IconArgs> = {
  title: 'Atoms/Icon',
  component: 'cc-icon',
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'The name of the Material Symbol (e.g., "home", "search").',
    },
    library: {
      control: 'select',
      options: ['material', 'custom'],
      description: 'The icon library to use.',
    },
    size: {
      control: 'text',
      options: ['small', 'medium', 'large', 'full', '16px', '24px', '32px', '48px'],
      description: 'Icon size (e.g., "small", "medium", "large", "full", "24px").',
    },
    color: {
      control: 'color',
      description: 'Icon color (CSS color value).',
    },
    fill: {
      control: { type: 'range', min: 0, max: 1, step: 1 },
      description: 'Material Symbols "FILL" property (0 for outline, 1 for filled).',
    },
    weight: {
      control: { type: 'range', min: 100, max: 700, step: 100 },
      description: 'Material Symbols "WEIGHT" property (100-700).',
    },
    grade: {
      control: { type: 'range', min: -25, max: 200, step: 25 },
      description: 'Material Symbols "GRADE" property (-25 to 200).',
    }
  },
  // AJUSTE 1: Código dinámico para que Storybook lea el DOM
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
        language: 'html',
      },
    },
  },
  // AJUSTE 2: Render usando atributos (sin punto) para tipos primitivos
  render: (args) => html`
    <cc-icon
      name=${ifDefined(args.name)}
      library=${ifDefined(args.library)}
      size=${ifDefined(args.size)}
      color=${ifDefined(args.color)}
      fill=${ifDefined(args.fill)}
      weight=${ifDefined(args.weight)}
      grade=${ifDefined(args.grade)}
    ></cc-icon>
  `,
};

export default meta;

type Story = StoryObj<IconArgs>;

// --- HISTORIAS ---

export const Default: Story = {
  args: {
    name: 'star',
    size: 'large',
    color: '#007bff'
  },
};

export const FilledIcon: Story = {
  args: {
    name: 'favorite',
    size: 'large',
    color: 'red',
    fill: 1
  },
};

export const CustomWeightAndGrade: Story = {
  args: {
    name: 'bolt',
    size: '48px',
    color: 'orange',
    weight: 700,
    grade: 200
  },
};

export const DifferentSizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 20px; align-items: center;">
      <cc-icon name="info" size="small" color="blue"></cc-icon>
      <cc-icon name="info" size="medium" color="blue"></cc-icon>
      <cc-icon name="info" size="large" color="blue"></cc-icon>
      <cc-icon name="info" size="xlarge" color="blue"></cc-icon>
      <cc-icon name="info" size="xxlarge" color="blue"></cc-icon>
    </div>
  `,
};

export const AllColors: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: center;">
      <cc-icon name="palette" color="purple" size="large"></cc-icon>
      <cc-icon name="check_circle" color="green" size="large"></cc-icon>
      <cc-icon name="error" color="red" size="large"></cc-icon>
      <cc-icon name="warning" color="orange" size="large"></cc-icon>
      <cc-icon name="settings" color="#666" size="large"></cc-icon>
      <cc-icon name="dark_mode" color="#000" size="large"></cc-icon>
    </div>
  `,
};

export const MaterialFullSize: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: center; width: 500px; height: 500px; font-size: 450px">
        <cc-icon name="palette" color="purple" size="full"></cc-icon>
    </div>
  `,
};

export const CustomIcon: Story = {
  args: {
    name: 'lit',
    library: 'custom',
    size: 'large',
    color: '#007bff'
  },
};

export const CustomSocialIcons: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: center;">
      <cc-icon name="lit" library="custom" color="purple" size="large"></cc-icon>
      <cc-icon name="facebook-2" library="custom" color="blue" size="large"></cc-icon>
      <cc-icon name="facebook-1" library="custom" color="#316FF6" size="large"></cc-icon>
      <cc-icon name="linkedin-1" library="custom" color="#0077B5" size="large"></cc-icon>
      <cc-icon name="linkedin-2" library="custom" color="red" size="large"></cc-icon>
      <cc-icon name="youtube-1" library="custom" color="#FF0000" size="large"></cc-icon>
      <cc-icon name="youtube-2" library="custom" color="green" size="large"></cc-icon>
      <cc-icon name="twitter-x-1" library="custom" color="blue" size="large"></cc-icon>
      <cc-icon name="twitter-x-2" library="custom" color="black" size="large"></cc-icon>
      <cc-icon name="instagram-1" library="custom" color="#E1306C" size="large"></cc-icon>
      <cc-icon name="whatsapp-1" library="custom" color="#25D366" size="large"></cc-icon>
      <cc-icon name="telegram" library="custom" color="blue" size="large"></cc-icon>
      <cc-icon name="github" library="custom" color="black" size="large"></cc-icon>
    </div>
  `,
};

export const CustomBankIcons: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: center; background-color: #ccc; padding: 20px; font-size: 48px">
      <cc-icon name="LogoIDBEn" library="custom" color="purple" size="full"></cc-icon>
      <cc-icon name="LogoIDBEnWhite" library="custom" color="blue" size="full"></cc-icon>
    </div>
  `,
};

export const WithButtonComponent: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px;">
      <cc-button
        color="primary"
        label="Download"
        .iconProps=${{
          library: 'material',
          name: 'download',
          size: 'full',
          position: 'left',
          fill: 1
        }}
      ></cc-button>
      <cc-button
        color="secondary"
        label="Share"
        size="base"
        .iconProps=${{
          library: 'material',
          name: 'share',
          size: 'full',
          position: 'right',
          weight: 700
        }}
      ></cc-button>
    </div>
  `,
};

export const WithLinkComponent: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px;">
        <cc-link href="#" radius="rounded-full" label="link 1" size="base" .iconProps=${{ library: 'material', name: 'search', size: 'medium', position: 'right' }}></cc-link>
    </div>
  `,
};