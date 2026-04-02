import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import './cc-textarea';

import type { TextareaProperties } from '@interfaces/textarea.interface';

type TextareaArgs = Partial<TextareaProperties>;

const meta: Meta<TextareaArgs> = {
  title: 'Atoms/Textarea',
  component: 'cc-textarea',
  tags: ['autodocs'],

  argTypes: {
    id: {
      control: 'text',
      description: 'Element ID',
    },
    name: {
      control: 'text',
      description: 'Field name attribute',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'neutral', 'gray-border'],
      description: 'Color variant',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size variant',
    },
    borderRadius: {
      control: 'select',
      options: ['rounded', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-none'],
      description: 'Border radius variant',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    value: {
      control: 'text',
      description: 'Current value',
    },
    rows: {
      control: { type: 'range', min: 2, max: 20, step: 1 },
      description: 'Number of visible text rows',
    },
    maxLength: {
      control: 'number',
      description: 'Maximum character length',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the textarea',
    },
    readonly: {
      control: 'boolean',
      description: 'Make textarea read-only',
    },
    autoResize: {
      control: 'boolean',
      description: 'Enable auto-resize (field-sizing: content)',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display',
    },
    required: {
      control: 'boolean',
      description: 'Mark field as required',
    },
  },

  parameters: {
    docs: {
      source: {
        type: 'dynamic',
        language: 'html',
      },
      description: {
        component:
          'Textarea component with auto-resize support, character counter, and validation. Supports multiple color variants and sizes.',
      },
    },
  },

  render: (args) => html`
    <cc-textarea
      id=${ifDefined(args.id)}
      name=${ifDefined(args.name)}
      color=${ifDefined(args.color)}
      size=${ifDefined(args.size)}
      borderRadius=${ifDefined(args.borderRadius)}
      placeholder=${ifDefined(args.placeholder)}
      value=${ifDefined(args.value)}
      rows=${ifDefined(args.rows)}
      maxLength=${ifDefined(args.maxLength)}
      .disabled=${args.disabled ?? false}
      .readonly=${args.readonly ?? false}
      .autoResize=${args.autoResize ?? true}
      errorMessage=${ifDefined(args.errorMessage)}
      .required=${args.required ?? false}
    ></cc-textarea>
  `,
};

export default meta;
type Story = StoryObj<TextareaArgs>;

export const Default: Story = {
  args: {
    name: 'comment',
    color: 'neutral',
    size: 'medium',
    borderRadius: 'rounded-xl',
    placeholder: 'Your text here...',
    rows: 4,
    autoResize: true,
  },
};

export const Primary: Story = {
  args: {
    name: 'comment-primary',
    color: 'primary',
    size: 'medium',
    borderRadius: 'rounded-lg',
    placeholder: 'Enter your comment...',
    rows: 4,
  },
};

export const Secondary: Story = {
  args: {
    name: 'comment-secondary',
    color: 'secondary',
    size: 'medium',
    borderRadius: 'rounded-lg',
    placeholder: 'Enter your feedback...',
    rows: 4,
  },
};

export const GrayBorder: Story = {
  args: {
    name: 'comment-gray',
    color: 'gray-border',
    size: 'medium',
    borderRadius: 'rounded-lg',
    placeholder: 'Write something...',
    rows: 4,
  },
};

export const WithValue: Story = {
  args: {
    name: 'prefilled',
    color: 'neutral',
    size: 'medium',
    borderRadius: 'rounded-xl',
    placeholder: 'Your text here...',
    value: 'This is some pre-filled text in the textarea.',
    rows: 4,
  },
};

export const WithMaxLength: Story = {
  args: {
    name: 'limited',
    color: 'primary',
    size: 'medium',
    borderRadius: 'rounded-xl',
    placeholder: 'Maximum 500 characters...',
    maxLength: 500,
    rows: 4,
  },
};

export const WithError: Story = {
  args: {
    name: 'required-field',
    color: 'primary',
    size: 'medium',
    borderRadius: 'rounded-xl',
    placeholder: 'This field is required...',
    errorMessage: 'This field is required',
    required: true,
    rows: 4,
  },
};

export const Disabled: Story = {
  args: {
    name: 'disabled',
    color: 'neutral',
    size: 'medium',
    borderRadius: 'rounded-xl',
    placeholder: 'This field is disabled...',
    disabled: true,
    rows: 4,
  },
};

export const Readonly: Story = {
  args: {
    name: 'readonly',
    color: 'neutral',
    size: 'medium',
    borderRadius: 'rounded-xl',
    value: 'This text is read-only and cannot be edited.',
    readonly: true,
    rows: 4,
  },
};

export const NoAutoResize: Story = {
  args: {
    name: 'no-resize',
    color: 'neutral',
    size: 'medium',
    borderRadius: 'rounded-xl',
    placeholder: 'Fixed height, no auto-resize...',
    autoResize: false,
    rows: 6,
  },
};

export const DifferentSizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 600px;">
      <div>
        <h4>Small</h4>
        <cc-textarea name="small" color="primary" size="small" borderRadius="rounded-md" placeholder="Small textarea..." rows="3"></cc-textarea>
      </div>
      <div>
        <h4>Medium</h4>
        <cc-textarea name="medium" color="primary" size="medium" borderRadius="rounded-lg" placeholder="Medium textarea..." rows="4"></cc-textarea>
      </div>
      <div>
        <h4>Large</h4>
        <cc-textarea name="large" color="primary" size="large" borderRadius="rounded-xl" placeholder="Large textarea..." rows="5"></cc-textarea>
      </div>
    </div>
  `,
};

export const AllColors: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 600px;">
      ${(['primary', 'secondary', 'neutral', 'gray-border'] as const).map(
        (color) => html`
          <div>
            <h4 style="text-transform: capitalize;">${color}</h4>
            <cc-textarea
              name=${`textarea-${color}`}
              color=${color}
              size="medium"
              borderRadius="rounded-lg"
              placeholder=${`${color} textarea`}
              rows="3"
            ></cc-textarea>
          </div>
        `
      )}
    </div>
  `,
};

export const RadiusVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 600px;">
      ${(['rounded', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-none'] as const).map(
        (radius) => html`
          <div>
            <h4>${radius}</h4>
            <cc-textarea
              name=${`radius-${radius}`}
              color="secondary"
              borderRadius=${radius}
              placeholder=${radius}
              rows="3"
            ></cc-textarea>
          </div>
        `
      )}
    </div>
  `,
};

export const LongTextExample: Story = {
  args: {
    name: 'long-text',
    color: 'neutral',
    size: 'medium',
    borderRadius: 'rounded-xl',
    value: `This is a longer text example to demonstrate the auto-resize feature.

As you type more content, the textarea will automatically expand to fit the text.

This provides a better user experience compared to showing scrollbars.

You can add multiple paragraphs and the textarea will grow accordingly.`,
    rows: 4,
    autoResize: true,
  },
};
