import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { ContentCountdownImageProperties } from '@interfaces/contentCountdownImage.interface';
import { AlignItems } from '@enums/alignItems.enum';
import './cc-content-countdown-image';

type ContentCountdownImageArgs = Partial<ContentCountdownImageProperties>;

const meta: Meta<ContentCountdownImageArgs> = {
  title: 'molecules/content Countdown image',
  tags: ['autodocs'],
  argTypes: {
    image: {
      description: 'Attribute to specify the image',
      control: 'object',
    },
    countdown: {
      description: 'Attribute to specify...',
      control: {
        type: 'object',
      },
    },
    links: {
      description: 'Attribute to specify the array of object buttons',
      control: { type: 'object' },
    },
    align: {
      control: { type: 'select' },
      options: Object.values(AlignItems),
      description: 'Button color variant',
      defaultValue: AlignItems.Start,
    },
  },
};

export default meta;
type Story = StoryObj<ContentCountdownImageArgs>;

const Template = (args: ContentCountdownImageArgs) => html`
  <cc-content-countdown-image
    .image=${args.image}
    .countdown=${args.countdown}
    .links=${args.links}
    .align=${args.align}
  ></cc-content-countdown-image>
`;

export const IntroWithImage: Story = {
  args: {
    image: {
      src: './GET-Forum.webp',
      alt: 'Get Forum 2025',
      title: 'Get Forum 2025',
      radius: 'none',
    },
    countdown: {
      language: 'fr',
      location: 'Paris / France',
      labelDate: '14 juil. 2025',
      date: '2025-10-31',
      time: '08:00:00',
      timeZone: 'UTC+2',
      color: 'neutral',
    },
    links: [
      {
        href: 'https://example.com',
        target: '_blank',
        label: 'Primary Link',
        size: 'base',
        radius: 'rounded-lg',
        color: 'primary',
        iconProps: {
          library: 'material',
          name: 'chevron_right',
          size: 'medium',
          position: 'right',
        },
      },
    ],
    align: AlignItems.Start,
  },
  render: Template,
};
