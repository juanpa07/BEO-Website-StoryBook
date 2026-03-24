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
      description: "Attribute to specify the width color",
      control: { type: "select" },
      options: ["w-full", "w-3/4", "w-2/3", "w-1/2", "w-1/3", "w-1/5"],
    },
    height: {
      description: "Attribute to specify the width color",
      control: { type: "select" },
      options: ["h-8", "h-10", "h-12", "h-24", "h-32", "h-40"],
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
    width: "w-full",
    height: "h-10"
  },
  render: Template,
};

export const halfSkeleton: Story = {
  args: {
    width: "w-1/2",
    height: "h-40"
  },
  render: Template,
};