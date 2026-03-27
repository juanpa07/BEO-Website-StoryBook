import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import './cc-input';

import type { InputProperties } from '@interfaces/input.interface';

type InputArgs = Partial<InputProperties>;

const meta: Meta<InputArgs> = {
  title: 'Atoms/Input',
  component: 'cc-input',
  tags: ['autodocs'],

  argTypes: {
    id: {
      control: 'text',
      description: 'Unique identifier for the input element',
    },
    name: {
      control: 'text',
      description: 'Name attribute for form submission',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text displayed when input is empty',
    },
    value: {
      control: 'text',
      description: 'Current value of the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input when true',
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
    <cc-input
      id=${ifDefined(args.id)}
      name=${ifDefined(args.name)}
      placeholder=${ifDefined(args.placeholder)}
      value=${ifDefined(args.value)}
      .disabled=${args.disabled}
    ></cc-input>
  `,
};

export default meta;
type Story = StoryObj<InputArgs>;

export const Default: Story = {
  args: {
    id: 'default-input',
    name: 'default',
    placeholder: 'Your text here...',
    value: '',
    disabled: false,
  },
};

export const WithValue: Story = {
  args: {
    id: 'with-value-input',
    name: 'with-value',
    placeholder: 'Your text here...',
    value: 'Hello World',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    id: 'disabled-input',
    name: 'disabled',
    placeholder: 'This input is disabled',
    value: '',
    disabled: true,
  },
};

export const CustomPlaceholder: Story = {
  args: {
    id: 'custom-placeholder-input',
    name: 'custom',
    placeholder: 'Enter your email address...',
    value: '',
    disabled: false,
  },
};
