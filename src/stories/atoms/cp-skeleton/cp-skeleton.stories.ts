import type { SkeletonProperties } from "@interfaces/skeleton.interface";
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './cp-skeleton';

type SkeletonArgs = Partial<SkeletonProperties>;

const meta: Meta = {
  title: "Atoms/Skeleton",
  tags: ["autodocs"],
  component: "cp-skeleton",
  argTypes: {
    width: {
      description: "Width of the skeleton (CSS value)",
      control: { type: "select" },
      options: ["100%", "75%", "66%", "50%", "33%", "20%"],
    },
    height: {
      description: "Height of the skeleton (CSS value)",
      control: { type: "select" },
      options: ["2rem", "2.5rem", "3rem", "6rem", "8rem", "10rem"],
    },
  },
};

export default meta;

type Story = StoryObj<SkeletonArgs>;


const Template = (args: SkeletonArgs) => html`
  <cp-skeleton
    .width=${args.width}
    .height=${args.height}
  ></cp-skeleton>
`;

export const fullSkeleton: Story = {
  args: {
    width: "100%",
    height: "2.5rem"
  },
  render: Template,
};

export const halfSkeleton: Story = {
  args: {
    width: "50%",
    height: "10rem"
  },
  render: Template,
};