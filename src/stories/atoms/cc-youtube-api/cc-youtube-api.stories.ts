import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import './cc-youtube-api';

import type { YoutubeProperties } from '@interfaces/youtube.interface';

type YoutubeApiArgs = Partial<YoutubeProperties>;

const meta: Meta<YoutubeApiArgs> = {
  title: 'Atoms/YouTube API',
  component: 'cc-youtube-api',
  tags: ['autodocs'],

  argTypes: {
    videoId: {
      control: 'text',
      description: 'YouTube video ID',
    },
    size: {
      control: { type: 'range', min: 10, max: 200, step: 10 },
      description: 'Size value (combined with measurement)',
    },
    measurement: {
      control: 'select',
      options: ['px', '%'],
      description: 'Unit for the size property',
    },
    mute: {
      control: 'boolean',
      description: 'Mute the video',
    },
    autoplay: {
      control: 'boolean',
      description: 'Autoplay the video on load',
    },
    loop: {
      control: 'boolean',
      description: 'Loop the video',
    },
    controls: {
      control: 'boolean',
      description: 'Show player controls',
    },
    isBackground: {
      control: 'boolean',
      description: 'Render as background video (scaled/cropped)',
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
    <cc-youtube-api
      videoId=${ifDefined(args.videoId)}
      size=${ifDefined(args.size)}
      measurement=${ifDefined(args.measurement)}
      .mute=${args.mute ?? false}
      .autoplay=${args.autoplay ?? false}
      .loop=${args.loop ?? false}
      .controls=${args.controls ?? true}
      .isBackground=${args.isBackground ?? false}
    ></cc-youtube-api>
  `,
};

export default meta;
type Story = StoryObj<YoutubeApiArgs>;

export const Default: Story = {
  args: {
    videoId: 'ATGv84uorF4',
    autoplay: false,
    mute: false,
    controls: true,
    loop: false,
    size: 100,
    measurement: '%',
    isBackground: false,
  },
};

export const Autoplay: Story = {
  args: {
    videoId: 'l0raSAdR0NA',
    autoplay: true,
    mute: true,
    controls: false,
    loop: true,
    size: 200,
    measurement: 'px',
    isBackground: false,
  },
};
