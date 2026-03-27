import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import './cc-image';

import type { ImageProperties } from '@interfaces/image.interface';

type ImageArgs = Partial<ImageProperties>;

const meta: Meta<ImageArgs> = {
  title: 'Atoms/Image',
  component: 'cc-image',
  tags: ['autodocs'],

  argTypes: {
    src: {
      control: 'text',
      description: 'URL source of the image',
    },
    alt: {
      control: 'text',
      description: 'Alternative text for accessibility',
    },
    title: {
      control: 'text',
      description: 'Title attribute for the image',
    },
    radius: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'],
      description: 'Border radius of the image',
    },
    isLazyLoading: {
      control: 'boolean',
      description: 'Enable lazy loading for the image',
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
    <cc-image
      src=${ifDefined(args.src)}
      alt=${ifDefined(args.alt)}
      title=${ifDefined(args.title)}
      radius=${ifDefined(args.radius)}
      .isLazyLoading=${args.isLazyLoading}
    ></cc-image>
  `,
};

export default meta;
type Story = StoryObj<ImageArgs>;

export const Default: Story = {
  args: {
    src: 'https://live.staticflickr.com/7479/15445078703_57f71a07f6_h.jpg',
    alt: 'Sample image',
    title: 'Sample image',
    radius: 'none',
    isLazyLoading: true,
  },
};

export const RoundedSmall: Story = {
  args: {
    src: 'https://live.staticflickr.com/7479/15445078703_57f71a07f6_h.jpg',
    alt: 'Rounded small image',
    title: 'Rounded small image',
    radius: 'sm',
    isLazyLoading: true,
  },
};

export const RoundedFull: Story = {
  args: {
    src: 'https://live.staticflickr.com/7479/15445078703_57f71a07f6_h.jpg',
    alt: 'Circular image',
    title: 'Circular image',
    radius: 'full',
    isLazyLoading: true,
  },
};

export const DifferentRadii: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
      <cc-image
        src="https://live.staticflickr.com/7479/15445078703_57f71a07f6_h.jpg"
        alt="No radius"
        radius="none"
        style="width: 100px; height: 100px;"
      ></cc-image>
      <cc-image
        src="https://live.staticflickr.com/7479/15445078703_57f71a07f6_h.jpg"
        alt="Small radius"
        radius="sm"
        style="width: 100px; height: 100px;"
      ></cc-image>
      <cc-image
        src="https://live.staticflickr.com/7479/15445078703_57f71a07f6_h.jpg"
        alt="Medium radius"
        radius="md"
        style="width: 100px; height: 100px;"
      ></cc-image>
      <cc-image
        src="https://live.staticflickr.com/7479/15445078703_57f71a07f6_h.jpg"
        alt="Large radius"
        radius="lg"
        style="width: 100px; height: 100px;"
      ></cc-image>
      <cc-image
        src="https://live.staticflickr.com/7479/15445078703_57f71a07f6_h.jpg"
        alt="Full radius"
        radius="full"
        style="width: 100px; height: 100px;"
      ></cc-image>
    </div>
  `,
};
