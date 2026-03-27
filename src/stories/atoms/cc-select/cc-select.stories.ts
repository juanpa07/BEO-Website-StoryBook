import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import './cc-select';

import type { SelectProperties } from '@interfaces/select.interface';

type SelectArgs = Partial<SelectProperties>;

const meta: Meta = {
  title: "Atoms/Select",
  component: "cc-select",
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "text",
      description: "Select element ID",
      defaultValue: "",
    },
    name: {
      control: "text",
      description: "Select element name attribute",
      defaultValue: "select-field",
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "neutral", "gray-border"],
      description: "Select color variant",
      defaultValue: "neutral",
    },
    size: {
      control: "select",
      options: ["small", "medium", "base", "large"],
      description: "Select size",
      defaultValue: "medium",
    },
    borderRadius: {
      control: "select",
      options: [
        "rounded",
        "rounded-md",
        "rounded-lg",
        "rounded-full",
        "rounded-none",
      ],
      description: "Select border radius",
      defaultValue: "rounded-full",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for empty selection",
      defaultValue: "Select an option",
    },
    value: {
      control: "text",
      description: "Current selected value",
      defaultValue: "",
    },
    defaultValue: {
      control: "text",
      description: "Default value",
      defaultValue: "",
    },
    options: {
      control: "object",
      description: "Array of select options",
    },
    onChange: {
      action: "select-change",
      description: "Change event handler",
    },
  },
};

export default meta;

type Story = StoryObj<SelectArgs>;

const defaultOptions = [
  { label: "Volvo", value: "volvo" },
  { label: "Saab", value: "saab" },
  { label: "Opel", value: "opel" },
  { label: "Audi", value: "audi" },
];

const Template = (args: SelectArgs) => html`
  <cc-select
    .id=${args.id ?? ""}
    .name=${args.name ?? "select-field"}
    .color=${args.color ?? "neutral"}
    .size=${args.size ?? "medium"}
    .borderRadius=${args.borderRadius ?? "rounded-full"}
    .placeholder=${args.placeholder ?? ""}
    .value=${args.value ?? ""}
    .defaultValue=${args.defaultValue ?? ""}
    .options=${args.options ?? defaultOptions}
    @select-change=${(e: CustomEvent) => {
      console.log("Select changed:", e.detail);
    }}
  ></cc-select>
`;

export const Default: Story = {
  args: {
    name: "select-default",
    color: "neutral",
    size: "medium",
    borderRadius: "rounded-full",
    placeholder: "Select an option",
    options: defaultOptions,
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story: "Default select component with placeholder.",
      },
    },
  },
};

export const Primary: Story = {
  args: {
    name: "select-primary",
    color: "primary",
    size: "medium",
    borderRadius: "rounded-md",
    placeholder: "Choose a car brand",
    options: defaultOptions,
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story: "Select with primary color variant.",
      },
    },
  },
};

export const Secondary: Story = {
  args: {
    name: "select-secondary",
    color: "secondary",
    size: "medium",
    borderRadius: "rounded-md",
    placeholder: "Choose a car brand",
    options: defaultOptions,
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story: "Select with secondary color variant.",
      },
    },
  },
};

export const GrayBorder: Story = {
  args: {
    name: "select-gray",
    color: "gray-border",
    size: "medium",
    borderRadius: "rounded-md",
    placeholder: "Choose a car brand",
    options: defaultOptions,
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story: "Select with gray border and background.",
      },
    },
  },
};

export const WithDefaultValue: Story = {
  args: {
    name: "select-default-value",
    color: "primary",
    size: "medium",
    borderRadius: "rounded-md",
    defaultValue: "saab",
    options: defaultOptions,
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story: "Select with a pre-selected default value.",
      },
    },
  },
};

export const SmallSize: Story = {
  args: {
    name: "select-small",
    color: "primary",
    size: "small",
    borderRadius: "rounded-md",
    placeholder: "Small select",
    options: defaultOptions,
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story: "Small size select component.",
      },
    },
  },
};

export const LargeSize: Story = {
  args: {
    name: "select-large",
    color: "primary",
    size: "large",
    borderRadius: "rounded-md",
    placeholder: "Large select",
    options: defaultOptions,
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story: "Large size select component.",
      },
    },
  },
};

export const SizesShowcase: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      <cc-select
        name="small"
        color="primary"
        size="small"
        borderRadius="rounded-md"
        placeholder="Small select"
        .options=${defaultOptions}
      ></cc-select>
      <cc-select
        name="medium"
        color="primary"
        size="medium"
        borderRadius="rounded-md"
        placeholder="Medium select"
        .options=${defaultOptions}
      ></cc-select>
      <cc-select
        name="large"
        color="primary"
        size="large"
        borderRadius="rounded-md"
        placeholder="Large select"
        .options=${defaultOptions}
      ></cc-select>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "Demonstrates the different select sizes.",
      },
    },
  },
};

export const RadiusVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      <cc-select
        name="rounded"
        color="secondary"
        borderRadius="rounded"
        placeholder="Rounded"
        .options=${defaultOptions}
      ></cc-select>
      <cc-select
        name="rounded-md"
        color="secondary"
        borderRadius="rounded-md"
        placeholder="Rounded MD"
        .options=${defaultOptions}
      ></cc-select>
      <cc-select
        name="rounded-lg"
        color="secondary"
        borderRadius="rounded-lg"
        placeholder="Rounded LG"
        .options=${defaultOptions}
      ></cc-select>
      <cc-select
        name="rounded-full"
        color="secondary"
        borderRadius="rounded-full"
        placeholder="Rounded Full"
        .options=${defaultOptions}
      ></cc-select>
      <cc-select
        name="rounded-none"
        color="secondary"
        borderRadius="rounded-none"
        placeholder="No Border Radius"
        .options=${defaultOptions}
      ></cc-select>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "Demonstrates the different border radius options.",
      },
    },
  },
};

export const AllColorsShowcase: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      ${["primary", "secondary", "neutral", "gray-border"].map(
        (color) => html`
          <cc-select
            .name=${`select-${color}`}
            .color=${color}
            size="medium"
            borderRadius="rounded-md"
            .placeholder=${`${color} select`}
            .options=${defaultOptions}
          ></cc-select>
        `
      )}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "Displaying all available select color variants.",
      },
    },
  },
};

export const WithManyOptions: Story = {
  args: {
    name: "select-countries",
    color: "primary",
    size: "medium",
    borderRadius: "rounded-md",
    placeholder: "Select a country",
    options: [
      { label: "United States", value: "us" },
      { label: "Canada", value: "ca" },
      { label: "Mexico", value: "mx" },
      { label: "Brazil", value: "br" },
      { label: "Argentina", value: "ar" },
      { label: "Chile", value: "cl" },
      { label: "Colombia", value: "co" },
      { label: "Peru", value: "pe" },
      { label: "Spain", value: "es" },
      { label: "France", value: "fr" },
      { label: "Germany", value: "de" },
      { label: "Italy", value: "it" },
      { label: "United Kingdom", value: "uk" },
    ],
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story: "Select with many options (countries example).",
      },
    },
  },
};
