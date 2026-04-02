import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import type { YoutubeWithThumbnailProperties } from "@interfaces/youtubeWithThumbnail.interface";

import "./cc-youtube-with-thumbnail";

type YoutubeWithThumbnailPropertiesArgs = Partial<YoutubeWithThumbnailProperties>;

const meta: Meta<YoutubeWithThumbnailPropertiesArgs> = {
  title: "Molecules/Youtube With thumbnail",
  component: "cc-youtube-with-thumbnail",
  tags: ["autodocs"],
  argTypes: {
    videoId: { control: "text" },
    thumbnail: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<YoutubeWithThumbnailPropertiesArgs>;

const Template = (args: YoutubeWithThumbnailPropertiesArgs) => html`
  <cc-youtube-with-thumbnail
    .videoId=${args.videoId}
    .thumbnail=${args.thumbnail}
  ></cc-youtube-with-thumbnail>
`;


export const YoutubeWithThumbnail: Story = {
  args: {
    videoId: "ATGv84uorF4",
    thumbnail: "https://t4.ftcdn.net/jpg/06/56/69/53/360_F_656695306_4gD2WubWsBXdWbgt8xWwGzTaoWY50k5v.jpg",
  },
  render: Template,
};

