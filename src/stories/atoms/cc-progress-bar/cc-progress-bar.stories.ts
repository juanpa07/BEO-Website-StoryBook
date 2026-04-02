import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import './cc-progress-bar';

import type { ProgressBarProperties } from '@interfaces/progressBar.interface';

type ProgressBarArgs = Partial<ProgressBarProperties>;

const meta: Meta<ProgressBarArgs> = {
  title: 'Atoms/Progress Bar',
  component: 'cc-progress-bar',
  tags: ['autodocs'],

  argTypes: {
    bgColor: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Color variant of the progress bar fill.',
    },
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Fill percentage (0–100).',
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
    <cc-progress-bar
      bgColor=${ifDefined(args.bgColor)}
      progress=${ifDefined(args.progress)}
    ></cc-progress-bar>
  `,
};

export default meta;
type Story = StoryObj<ProgressBarArgs>;

export const Default: Story = {
  args: {
    bgColor: 'primary',
    progress: 75,
  },
};

export const Secondary: Story = {
  args: {
    bgColor: 'secondary',
    progress: 50,
  },
};

export const AllColors: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 384px;">
      <cc-progress-bar bgColor="primary" progress="60"></cc-progress-bar>
      <cc-progress-bar bgColor="secondary" progress="40"></cc-progress-bar>
    </div>
  `,
};

export const DifferentProgress: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 384px;">
      <cc-progress-bar bgColor="primary" progress="0"></cc-progress-bar>
      <cc-progress-bar bgColor="primary" progress="25"></cc-progress-bar>
      <cc-progress-bar bgColor="primary" progress="50"></cc-progress-bar>
      <cc-progress-bar bgColor="primary" progress="75"></cc-progress-bar>
      <cc-progress-bar bgColor="primary" progress="100"></cc-progress-bar>
    </div>
  `,
};
