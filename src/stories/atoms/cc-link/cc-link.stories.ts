import type { LinkProperties } from '@interfaces/link.interface';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './cc-link';

type LinkArgs = Partial<LinkProperties>;

const meta: Meta = {
  title: 'Atoms/Link',
  component: 'cc-link',
  tags: ['autodocs'],
  argTypes: {
    href: {
      control: 'text',
      description: 'Link destination URL',
      defaultValue: '#',
    },
    target: {
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top'],
      description: 'Specifies where to open the linked document',
      defaultValue: '_self',
    },
    rel: {
      control: 'text',
      description: 'Specifies the relationship between the current and linked document',
    },
    color: {
      control: 'select',
      options: ['primary', 'primary-link', 'secondary', 'secondary-link', 'sucess', 'sucess-link', 'warning', 'warning-link', 'danger', 'danger-link', 'white', 'white-link', 'info', 'info-link', 'neutral', 'neutral-link',
        'primary-white', 'secondary-white', 'sucess-white', 'warning-white', 'danger-white', 'info-white', 'neutral-white'
      ],
      description: 'Link color variant',
      defaultValue: 'primary',
    },
    size: {
      control: 'select',
      options: ['small', 'base', 'large'],
      description: 'Link size',
      defaultValue: 'base',
    },
    radius: {
      control: 'select',
      options: ['rounded', 'rounded-md', 'rounded-lg', 'rounded-full', 'rounded-none'],
      description: 'Link border radius',
      defaultValue: 'rounded-md',
    },
    label: {
      control: 'text',
      description: 'Link label text',
      defaultValue: 'Link',
    },
    iconProps: {
      control: 'object',
      description: 'Icon configuration object for the link',
    },
  },
};

export default meta;
type Story = StoryObj<LinkArgs>;

const Template = (args: LinkArgs) => html`
  <cc-link
    .href=${args.href ?? ''}
    .target=${args.target ?? ''}
    .rel=${args.rel ?? ''}
    .color=${args.color ?? ''}
    .size=${args.size ?? ''}
    .radius=${args.radius ?? ''}
    .label=${args.label ?? ''}
    .iconProps=${args.iconProps}
  ></cc-link>
`;

export const PrimaryWithIcon: Story = {
  args: {
    href: 'https://example.com',
    target: '_blank',
    label: 'Primary Link',
    size: 'base',
    radius: 'rounded-none',
    color: 'primary',
    iconProps: {
      library: 'material',
      name: 'chevron_right',
      size: 'medium',
      position: 'right',
    },
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'This is a primary button with an icon.',
      },
    },
  },
};

export const SecondaryTextOnly: Story = {
  args: {
    href: 'https://example.com',
    target: '_self',
    label: 'Secondary Link',
    color: 'secondary',
    size: 'base',
    radius: 'rounded-none',
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'This is a secondary button without an icon.',
      },
    },
  },
};

export const WithIconLeft: Story = {
  args: {
    href: 'https://example.com',
    color: 'primary',
    size: 'base',
    radius: 'rounded-none',
    label: 'Go Home',
    iconProps: {
      library: 'material',
      name: 'home',
      size: 'medium',
      position: 'left',
    },
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'Button with icon on the left.',
      },
    },
  },
};

export const WithIconRight: Story = {
  args: {
    href: 'https://example.com',
    color: 'primary',
    size: 'base',
    radius: 'rounded-none',
    label: 'Search',
    iconProps: {
      library: 'material',
      name: 'search',
      size: 'medium',
      position: 'right',
    },
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'Button with icon on the right.',
      },
    },
  },
};

export const SizesShowcase: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px;">
      <cc-link href="#" radius='rounded-none' label="Small" size="small"></cc-link>
      <cc-link href="#" radius='rounded-none' label="Base" size="base"></cc-link>
      <cc-link href="#" radius='rounded-none' label="Large" size="large"></cc-link>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the different button sizes.',
      },
    },
  },
};


export const linkWithIcons: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px;">
      <cc-link href="#" radius="rounded-none" label="link 1" size="base" .iconProps=${{ library: 'material', name: 'search', size: 'medium', position: 'right' }}></cc-link>
      <cc-link href="#" radius='rounded-none' label="link 2" size="base" .iconProps=${{ library: 'material', name: 'chevron_right', size: 'medium', position: 'right' }}></cc-link>
      <cc-link href="#" radius='rounded-none' label="link 3" size="base" .iconProps=${{ library: 'material', name: 'search', size: 'medium', position: 'left' }}></cc-link>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the different button sizes.',
      },
    },
  },
};

export const AllColorsShowcase: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 12px;">
      ${['primary', 'secondary', 'sucess', 'warning', 'danger', 'white', 'info', 'neutral',
      'primary-white', 'secondary-white', 'sucess-white', 'warning-white', 'danger-white', 'info-white', 'neutral-white'
    ].map(
      color => html`
          <cc-link
            href="#"
            .label=${color}
            .color=${color}
            .size=${'base'}
            .radius=${'rounded-none'}
          >
          </cc-link>
        `
    )}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Displaying all available button colors.',
      },
    },
  },
};

export const AllColorsWithRoundedBorder: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 12px;">
      ${['primary-border', 'secondary-border', 'sucess-border', 'warning-border', 'danger-border', 'white-border', 'info-border', 'neutral-border'].map(
    color => html`
          <cc-link
            href="#"
            .label=${color}
            .color=${color}
            .size=${'base'}
          >
          </cc-link>
        `
  )}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Displaying all available link colors with rounded border.',
      },
    },
  },
};
