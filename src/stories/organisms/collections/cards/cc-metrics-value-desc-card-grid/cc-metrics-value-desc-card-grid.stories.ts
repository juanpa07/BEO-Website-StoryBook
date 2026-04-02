import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './cc-metrics-value-desc-card-grid';

const meta: Meta = {
  title: 'organisms/Collections/Metrics Cards/Value and description',
  component: 'cc-metrics-value-desc-card-grid',
  tags: ['autodocs'],
  argTypes: {
    itemsPerRow: {
      control: { type: 'number' },
      description: 'Número de cards por fila',
    },
    cards: {
      control: { type: 'object' },
      description: 'Array de objetos con la configuración de cada card',
    },
  },
};

export default meta;
type Story = StoryObj;

export const GridExample: Story = {
  args: {
    itemsPerRow: 4,
    cards: [
      {
        value: '91%',
        description: 'Tasa de retención.',
        color: 'neutral',
        background: 'transparent',
      },
      {
        value: '80%',
        description: 'Tasa de conversión.',
        color: 'primary',
        background: 'white',
      },
      {
        value: '75%',
        description: 'Tasa de satisfacción.',
        color: 'secondary',
        background: 'black',
      },
      {
        value: '60%',
        description: 'Tasa de abandono.',
        color: 'neutral',
        background: 'transparent',
      },
      {
        value: '50%',
        description: 'Tasa de clics.',
        color: 'primary',
        background: 'white',
      },
      {
        value: '40%',
        description: 'Tasa de apertura.',
        color: 'secondary',
        background: 'black',
      },
    ],
  },
  render: ({ itemsPerRow, cards }) => html`
    <cc-metrics-value-desc-card-grid
      .itemsPerRow=${itemsPerRow}
      .cards=${cards}
    ></cc-metrics-value-desc-card-grid>
  `,
};
