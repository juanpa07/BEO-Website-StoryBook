import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import './cc-youtube-with-thumbnail';

import type { YoutubeWithThumbnailProperties } from '@interfaces/youtubeWithThumbnail.interface';

type YoutubeWithThumbnailArgs = Partial<YoutubeWithThumbnailProperties>;

const meta: Meta<YoutubeWithThumbnailArgs> = {
  title: 'Molecules/Youtube With Thumbnail',
  component: 'cc-youtube-with-thumbnail',
  tags: ['autodocs'],
  argTypes: {
    videoId: {
      control: 'text',
      description: 'YouTube video ID (e.g. "ATGv84uorF4")',
    },
    thumbnail: {
      control: 'text',
      description: 'URL of the thumbnail image shown before playback',
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
    <cc-youtube-with-thumbnail
      videoId=${ifDefined(args.videoId)}
      thumbnail=${ifDefined(args.thumbnail)}
    ></cc-youtube-with-thumbnail>
  `,
};

export default meta;
type Story = StoryObj<YoutubeWithThumbnailArgs>;

export const Default: Story = {
  args: {
    videoId: 'ATGv84uorF4',
    thumbnail:
      'https://t4.ftcdn.net/jpg/06/56/69/53/360_F_656695306_4gD2WubWsBXdWbgt8xWwGzTaoWY50k5v.jpg',
  },
};
