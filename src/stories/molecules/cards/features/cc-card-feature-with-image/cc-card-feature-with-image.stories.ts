import type { CardFeatureWithImageProperties } from '@interfaces/cardFeatureWithImage.interface';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './cc-card-feature-with-image';

type CardFeatureWithImageArgs = Partial<CardFeatureWithImageProperties>;

const meta: Meta = {
  title: 'molecules/Cards/Features/Card with Image',
  component: 'cc-card-feature-with-image',
  tags: ['autodocs'],
  argTypes: {
    isVertical: {
      description: 'Attribute to specify the vertical alignment',
      control: {
        type: 'boolean',
      },
    },
    image: {
      description: 'Attribute to specify the image',
      control: {
        type: 'object',
      },
    },
    titleProperties: {
      description: 'Attribute to specify the title properties',
      control: {
        type: 'object',
      },
    },
    descriptionProperties: {
      description: 'Attribute to specify the description properties',
      control: {
        type: 'object',
      },
    },
    link: {
      description: 'Attribute to specify the buttons properties',
      control: {
        type: 'object',
      },
    },
    align: {
      defaultValue: 'left',
      description: 'Attribute to specify the align',
      control: {
        type: 'select',
        options: ['left', 'right', 'center'],
      },
    },
  },
};

export default meta;

type Story = StoryObj<CardFeatureWithImageArgs>;

const Template = (args: CardFeatureWithImageArgs) => html`
  <cc-card-feature-with-image
    .isVertical=${args.isVertical}
    .image=${args.image}
    .titleProperties=${args.titleProperties}
    .descriptionProperties=${args.descriptionProperties}
    .link=${args.link}
    .align=${args.align}
  ></cc-card-feature-with-image>
`;

export const Primary: Story = {
  args: {
    isVertical: true,
    image: {
      src: 'https://dev-ebfactory-v25.pantheonsite.io/sites/default/files/2025-05/Custom_Software_Development.jpg',
      alt: 'Custom Software Development',
    },
    titleProperties: {
      title: 'Custom Software Development',
      titleColor: 'neutral',
      titleFontSize: 'h4',
      titleFontFamily: 'roboto',
    },
    descriptionProperties: {
      description:
        'We carry out the entire process for software development according to the needs of our clients',
      descriptionColor: 'neutral',
      descriptionFontSize: 'base',
      descriptionFontFamily: 'open-sans',
    },
    link: {
      href: '#',
      target: '_blank',
      rel: '',
      color: 'primary',
      size: '',
      radius: 'md',
      label: 'Read more',
      iconProps: {
        library: 'material',
        name: '',
        size: 'medium',
      },
    },
    align: 'left',
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'This is a primary button with image.',
      },
    },
  },
};
