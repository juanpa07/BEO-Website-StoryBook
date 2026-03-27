import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import './cc-multi-select';

import type { MultiSelectProperties } from '@interfaces/multi-select.interface';

type MultiSelectArgs = Partial<MultiSelectProperties>;

const defaultOptions = [
  { label: 'Volvo', value: 'volvo' },
  { label: 'Saab', value: 'saab' },
  { label: 'Opel', value: 'opel' },
  { label: 'Audi', value: 'audi' },
];

const meta: Meta<MultiSelectArgs> = {
  title: 'Atoms/Multi Select',
  component: 'cc-multi-select',
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
      options: ['rounded', 'rounded-md', 'rounded-lg', 'rounded-full', 'rounded-none'],
      description: 'Border radius variant',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    selectedValues: {
      control: 'object',
      description: 'Array of selected values',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display',
    },
    required: {
      control: 'boolean',
      description: 'Mark field as required',
    },
    options: {
      control: 'object',
      description: 'Array of options',
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
          'Multi Select component with custom dropdown and checkboxes. Always renders in multiple selection mode. For single selection, use the cc-select component instead.',
      },
    },
  },

  render: (args) => html`
    <cc-multi-select
      id=${ifDefined(args.id)}
      name=${ifDefined(args.name)}
      color=${ifDefined(args.color)}
      size=${ifDefined(args.size)}
      borderRadius=${ifDefined(args.borderRadius)}
      placeholder=${ifDefined(args.placeholder)}
      .selectedValues=${args.selectedValues ?? []}
      .options=${args.options ?? defaultOptions}
      errorMessage=${ifDefined(args.errorMessage)}
      .required=${args.required}
      @multi-select-change=${(e: CustomEvent) => {
        console.log('Multi select changed:', e.detail);
      }}
    ></cc-multi-select>
  `,
};

export default meta;
type Story = StoryObj<MultiSelectArgs>;

export const Default: Story = {
  args: {
    name: 'filters',
    color: 'neutral',
    size: 'medium',
    borderRadius: 'rounded-full',
    placeholder: 'Select filters',
    options: defaultOptions,
    selectedValues: [],
  },
};

export const WithSelection: Story = {
  args: {
    name: 'filters-preselected',
    color: 'primary',
    size: 'medium',
    borderRadius: 'rounded-md',
    placeholder: 'Select filters',
    options: defaultOptions,
    selectedValues: ['volvo', 'audi'],
  },
};

export const Primary: Story = {
  args: {
    name: 'filters-primary',
    color: 'primary',
    size: 'medium',
    borderRadius: 'rounded-md',
    placeholder: 'Select filters',
    options: defaultOptions,
    selectedValues: [],
  },
};

export const Secondary: Story = {
  args: {
    name: 'filters-secondary',
    color: 'secondary',
    size: 'medium',
    borderRadius: 'rounded-md',
    placeholder: 'Select filters',
    options: defaultOptions,
    selectedValues: [],
  },
};

export const GrayBorder: Story = {
  args: {
    name: 'filters-gray',
    color: 'gray-border',
    size: 'medium',
    borderRadius: 'rounded-md',
    placeholder: 'Select filters',
    options: defaultOptions,
    selectedValues: [],
  },
};

export const WithError: Story = {
  args: {
    name: 'filters-error',
    color: 'primary',
    size: 'medium',
    borderRadius: 'rounded-md',
    placeholder: 'Select filters',
    options: defaultOptions,
    selectedValues: [],
    errorMessage: 'Please select at least one option',
    required: true,
  },
};

export const SmallSize: Story = {
  args: {
    name: 'filters-small',
    color: 'primary',
    size: 'small',
    borderRadius: 'rounded-md',
    placeholder: 'Small multi-select',
    options: defaultOptions,
    selectedValues: ['volvo'],
  },
};

export const LargeSize: Story = {
  args: {
    name: 'filters-large',
    color: 'primary',
    size: 'large',
    borderRadius: 'rounded-md',
    placeholder: 'Large multi-select',
    options: defaultOptions,
    selectedValues: ['volvo', 'saab', 'opel'],
  },
};

export const DifferentSizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      <div>
        <h4>Small</h4>
        <cc-multi-select
          name="small"
          color="primary"
          size="small"
          borderRadius="rounded-md"
          placeholder="Small multi-select"
          .selectedValues=${['volvo']}
          .options=${defaultOptions}
        ></cc-multi-select>
      </div>
      <div>
        <h4>Medium</h4>
        <cc-multi-select
          name="medium"
          color="primary"
          size="medium"
          borderRadius="rounded-md"
          placeholder="Medium multi-select"
          .selectedValues=${['volvo', 'audi']}
          .options=${defaultOptions}
        ></cc-multi-select>
      </div>
      <div>
        <h4>Large</h4>
        <cc-multi-select
          name="large"
          color="primary"
          size="large"
          borderRadius="rounded-md"
          placeholder="Large multi-select"
          .selectedValues=${['volvo', 'saab', 'opel']}
          .options=${defaultOptions}
        ></cc-multi-select>
      </div>
    </div>
  `,
};

export const AllColors: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      ${(['primary', 'secondary', 'neutral', 'gray-border'] as const).map(
        (color) => html`
          <div>
            <h4 style="text-transform: capitalize;">${color}</h4>
            <cc-multi-select
              name=${`filters-${color}`}
              color=${color}
              size="medium"
              borderRadius="rounded-md"
              placeholder="${color} multi-select"
              .selectedValues=${['volvo']}
              .options=${defaultOptions}
            ></cc-multi-select>
          </div>
        `
      )}
    </div>
  `,
};

export const AllRadii: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      ${(['rounded', 'rounded-md', 'rounded-lg', 'rounded-full', 'rounded-none'] as const).map(
        (radius) => html`
          <div>
            <h4>${radius}</h4>
            <cc-multi-select
              name=${`radius-${radius}`}
              color="secondary"
              borderRadius=${radius}
              placeholder=${radius}
              .selectedValues=${['volvo']}
              .options=${defaultOptions}
            ></cc-multi-select>
          </div>
        `
      )}
    </div>
  `,
};

export const WithManyOptions: Story = {
  args: {
    name: 'countries',
    color: 'primary',
    size: 'medium',
    borderRadius: 'rounded-md',
    placeholder: 'Select countries',
    selectedValues: ['us', 'ca', 'mx'],
    options: [
      { label: 'United States', value: 'us' },
      { label: 'Canada', value: 'ca' },
      { label: 'Mexico', value: 'mx' },
      { label: 'Brazil', value: 'br' },
      { label: 'Argentina', value: 'ar' },
      { label: 'Chile', value: 'cl' },
      { label: 'Colombia', value: 'co' },
      { label: 'Peru', value: 'pe' },
      { label: 'Spain', value: 'es' },
      { label: 'France', value: 'fr' },
      { label: 'Germany', value: 'de' },
      { label: 'Italy', value: 'it' },
      { label: 'United Kingdom', value: 'uk' },
      { label: 'Portugal', value: 'pt' },
      { label: 'Netherlands', value: 'nl' },
    ],
  },
};

export const EmptyOptions: Story = {
  args: {
    name: 'empty',
    color: 'neutral',
    size: 'medium',
    borderRadius: 'rounded-md',
    placeholder: 'No options available',
    options: [],
    selectedValues: [],
  },
};
