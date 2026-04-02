import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import './cc-youtube';

import type { YoutubeProperties } from '@interfaces/youtube.interface';

type YoutubeArgs = Pick<YoutubeProperties, 'videoId' | 'autoplay'>;

const meta: Meta<YoutubeArgs> = {
  title: 'Atoms/YouTube',
  component: 'cc-youtube',
  tags: ['autodocs'],

  argTypes: {
    videoId: {
      control: 'text',
      description: 'YouTube video ID',
    },
    autoplay: {
      control: 'boolean',
      description: 'Autoplay the video on load',
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
    <cc-youtube
      videoId=${ifDefined(args.videoId)}
      .autoplay=${args.autoplay ?? false}
    ></cc-youtube>
  `,
};

export default meta;
type Story = StoryObj<YoutubeArgs>;

export const Default: Story = {
  args: {
    videoId: 'ATGv84uorF4',
    autoplay: false,
  },
};

export const Autoplay: Story = {
  args: {
    videoId: 'ATGv84uorF4',
    autoplay: true,
  },
};
