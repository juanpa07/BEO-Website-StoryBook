// artifacts/storybook/ebfactory/src/stories/atoms/cp-icons/cp-icon.stories.ts
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './cp-icon'; // Importa tu componente de icono
import '../cp-button/cp-button'
import '../cp-link/cp-link'

// Asumo una interfaz para las propiedades del icono si la tienes
import type { IconProperties } from '@interfaces/icon.interface';

type IconArgs = Partial<IconProperties>;

const meta: Meta<IconArgs> = {
  title: 'Atoms/Icon',
  component: 'cp-icon',
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'The name of the Material Symbol (e.g., "home", "search").',
      defaultValue: 'home'
    },
    library: {
      control: 'select',
      options: ['material', 'custom'],
      description: 'The icon library to use.',
      defaultValue: 'material'
    },
    size: {
      control: 'text', // Permite texto para valores CSS como '24px', '2rem'
      options: ['small', 'medium', 'large', 'full', '16px', '24px', '32px', '48px'], // Ejemplos para el control de select
      description: 'Icon size (e.g., "small", "medium", "large", "full", "24px").',
      defaultValue: '48px'
    },
    color: {
      control: 'color', // Selector de color
      description: 'Icon color (CSS color value).',
      defaultValue: '#333333'
    },
    fill: {
      control: { type: 'range', min: 0, max: 1, step: 1 },
      description: 'Material Symbols "FILL" property (0 for outline, 1 for filled).',
      defaultValue: 0
    },
    weight: {
      control: { type: 'range', min: 100, max: 700, step: 100 },
      description: 'Material Symbols "WEIGHT" property (100-700).',
      defaultValue: 400
    },
    grade: {
      control: { type: 'range', min: -25, max: 200, step: 25 },
      description: 'Material Symbols "GRADE" property (-25 to 200).',
      defaultValue: 0
    }
  },
  render: (args) => html`
    <cp-icon
      .name=${args.name ?? ''}
      .library=${args.library ?? 'material'}
      .size=${args.size ?? ''}
      .color=${args.color ?? ''}
      .fill=${args.fill ?? 0}
      .weight=${args.weight ?? 400}
      .grade=${args.grade ?? 0}
    ></cp-icon>
  `,
};

export default meta;

type Story = StoryObj<IconArgs>;

export const Default: Story = {
  args: {
    name: 'star',
    size: 'large',
    color: '#007bff'
  },
  parameters: {
    docs: {
      description: {
        story: 'A basic Material Symbol icon.',
      },
    },
  },
};

export const FilledIcon: Story = {
  args: {
    name: 'favorite',
    size: 'large',
    color: 'red',
    fill: 1
  },
  parameters: {
    docs: {
      description: {
        story: 'An example of a filled Material Symbol icon.',
      },
    },
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
  parameters: {
    docs: {
      description: {
        story: 'Icon with custom weight and grade properties.',
      },
    },
  },
};

export const DifferentSizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 20px; align-items: center;">
      <cp-icon name="info" size="small" color="blue"></cp-icon>
      <cp-icon name="info" size="medium" color="blue"></cp-icon>
      <cp-icon name="info" size="large" color="blue"></cp-icon>
      <cp-icon name="info" size="xlarge" color="blue"></cp-icon>
      <cp-icon name="info" size="xxlarge" color="blue"></cp-icon>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Examples of different icon sizes using predefined options and custom values.',
      },
    },
  },
};

export const AllColors: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: center;">
      <cp-icon name="palette" color="purple" size="large"></cp-icon>
      <cp-icon name="check_circle" color="green" size="large"></cp-icon>
      <cp-icon name="error" color="red" size="large"></cp-icon>
      <cp-icon name="warning" color="orange" size="large"></cp-icon>
      <cp-icon name="settings" color="#666" size="large"></cp-icon>
      <cp-icon name="dark_mode" color="#000" size="large"></cp-icon>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Showcasing various icon colors.',
      },
    },
  },
};

export const MaterialFullSize: Story = {
  render: () => html`
        <div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: center; width: 500px; height: 500px; font-size: 450px">
            <cp-icon name="palette" color="purple" size="full"></cp-icon>
        </div>
    `,
  parameters: {
    docs: {
      description: {
        story: 'Showcasing full icon size.',
      },
    },
  },
};

export const CustomIcon: Story = {
  args: {
    name: 'lit',
    library: 'custom',
    size: 'large',
    color: '#007bff'
  },
  parameters: {
    docs: {
      description: {
        story: 'A basic custom icon.',
      },
    },
  },
};

export const CustomSocialIcons: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: center; text-red">
      <cp-icon name="lit" library="custom" color="purple" size="large"></cp-icon>
      <cp-icon name="facebook-2" library="custom" color="blue" size="large"></cp-icon>
      <cp-icon name="facebook-1" library="custom" color="#316FF6" size="large"></cp-icon>
      <cp-icon name="linkedin-1" library="custom" color="#0077B5" size="large"></cp-icon>
      <cp-icon name="linkedin-2" library="custom" color="red" size="large"></cp-icon>
      <cp-icon name="youtube-1" library="custom" color="#FF0000" size="large"></cp-icon>
      <cp-icon name="youtube-2" library="custom" color="green" size="large"></cp-icon>
      <cp-icon name="youtube-3" library="custom" size="large"></cp-icon>
      <cp-icon name="youtube-4" library="custom" size="large"></cp-icon>
      <cp-icon name="twitter-x-1" library="custom" color="blue" size="large"></cp-icon>
      <cp-icon name="twitter-x-2" library="custom" color="black" size="large"></cp-icon>
      <cp-icon name="instagram-1" library="custom" color="#E1306C" size="large"></cp-icon>
      <cp-icon name="instagram-2" library="custom" color="#E1306C" size="large"></cp-icon>
      <cp-icon name="whatsapp-1" library="custom" color="#25D366" size="large"></cp-icon>
      <cp-icon name="whatsapp-2" library="custom" color="#075E54" size="large"></cp-icon>
      <cp-icon name="telegram" library="custom" color="blue" size="large"></cp-icon>
      <cp-icon name="github" library="custom" color="black" size="large"></cp-icon>
      <cp-icon name="apple" library="custom" color="green" size="large"></cp-icon>
      <cp-icon name="google-play" library="custom" color="black" size="large"></cp-icon>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'A basic custom icon.',
      },
    },
  },
};


export const CustomBankIcons: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: center; background-color: #ccc; padding: 20px; font-size: 48px">
      <cp-icon name="LogoIDBEn" library="custom" color="purple" size="full"></cp-icon>
      <cp-icon name="LogoIDBEnWhite" library="custom" color="blue" size="full"></cp-icon>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'A basic custom icon.',
      },
    },
  },
};

export const CustomIconFullSize: Story = {
  render: () => html`
        <div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: center; width: 500px; height: auto; font-size: 450px">
            <cp-icon library="custom" name="lit" color="purple" size="full"></cp-icon>
        </div>
    `,
  parameters: {
    docs: {
      description: {
        story: 'Showcasing custom icon full size.',
      },
    },
  },
};

export const WithButtonComponent: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px;">
      <cp-button
        color="primary"
        label="Download"
        .iconProps=${{
      library: 'material',
      name: 'download',
      size: 'full',
      position: 'left',
      fill: 1
    }}
      ></cp-button>
      <cp-button
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
      ></cp-button>
      <cp-button
        color="danger"
        label="Delete"
        size="large"
        .iconProps=${{
      library: 'material',
      name: 'delete',
      size: 'full',
      position: 'left',
      color: 'white', // Esto se manejaría si tu botón propaga el color al icono
      grade: 200
    }}
      ></cp-button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Example of using the icon component within the `idblabext-button`.',
      },
    },
  },
};

export const WithLinkComponent: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px;">
        <idblabext-link href="#" radius="rounded-full" label="link 1" size="base" .iconProps=${{ library: 'material', name: 'search', size: 'medium', position: 'right' }}></idblabext-link>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Example of using the icon component within the `idblabext-button`.',
      },
    },
  },
};