import type { MetricValueProperties } from '@interfaces/metricValueDescription.interface';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './cc-value-description';

type MetricValueArgs = Partial<MetricValueProperties>;

const meta: Meta = {
  title: 'molecules/Metrics/Value with description',
  component: 'cc-value-description',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'text' },
      description: 'Value to be displayed in the metric',
    },
    description: {
      control: { type: 'text' },
      description: 'Description to be displayed in the metric',
    },
    color: {
      control: { type: 'select' },
      options: ['neutral', 'primary', 'secondary'],
      description: 'Color of the text',
      defaultValue: 'neutral',
    },
    background: {
      control: { type: 'select' },
      options: ['transparent', 'white', 'black'],
      description: 'Background color of the metric',
      defaultValue: 'transparent',
    },
  },
};

export default meta;

type Story = StoryObj<MetricValueArgs>;

const Template = (args: MetricValueArgs) => html`
  <cc-value-description
    .value=${args.value ?? ''}
    .description=${args.description ?? ''}
    .color=${args.color ?? ''}
    .background=${args.background ?? ''}
  ></cc-value-description>
`;

export const Neutral: Story = {
  args: {
    value: '91%',
    description: 'Tasa de retención.',
    color: 'neutral',
    background: 'transparent',
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'This is a neutral single metric.',
      },
    },
  },
};
