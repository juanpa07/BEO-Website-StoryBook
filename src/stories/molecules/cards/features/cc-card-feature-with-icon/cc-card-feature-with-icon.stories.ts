// import { ButtonProperties } from "@interfaces/button.interface";
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './cc-card-feature-with-icon';

//type ButtonArgs = Partial<ButtonProperties>;

const meta: Meta = {
  title: 'molecules/Cards/Features/Card with icon',
  component: 'cc-card-feature-with-icon',
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

//type Story = StoryObj<ButtonArgs>;

const Template = () => html` <cc-card-feature-with-icon></cc-card-feature-with-icon> `;

export const Primary = {
  args: {},
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'This is a primary button with an icon.',
      },
    },
  },
};
