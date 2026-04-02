import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import './cc-countdown';

import type { CountdownProperties, CountdownLabels } from '@interfaces/countdown.interface';

type CountdownArgs = Omit<Partial<CountdownProperties>, 'labels'> & { labels?: CountdownLabels };

const timeZones = [
  'UTC-12', 'UTC-11', 'UTC-10', 'UTC-9', 'UTC-8', 'UTC-7', 'UTC-6', 'UTC-5',
  'UTC-4', 'UTC-3', 'UTC-2', 'UTC-1', 'UTC+0', 'UTC+1', 'UTC+2', 'UTC+3',
  'UTC+4', 'UTC+5', 'UTC+6', 'UTC+7', 'UTC+8', 'UTC+9', 'UTC+10', 'UTC+11', 'UTC+12',
];

const colors = ['primary', 'secondary', 'neutral', 'white', 'black'] as const;

const meta: Meta<CountdownArgs> = {
  title: 'Molecules/Countdown',
  component: 'cc-countdown',
  tags: ['autodocs'],

  argTypes: {
    labels: {
      control: 'object',
      description: 'Etiquetas de las unidades de tiempo del contador',
    },
    location: {
      control: 'text',
      description: 'Nombre descriptivo del lugar del evento',
    },
    locationLink: {
      control: 'text',
      description: 'URL que se abre al pulsar el lugar',
    },
    labelDate: {
      control: 'text',
      description: 'Etiqueta visible de la fecha (texto libre)',
    },
    date: {
      control: 'text',
      description: 'Fecha objetivo (yyyy-MM-dd) para el contador',
    },
    time: {
      control: 'text',
      description: 'Hora objetivo (HH:mm:ss, 24 h)',
    },
    timeZone: {
      control: 'select',
      options: timeZones,
      description: 'Zona horaria (clave UTC ±N)',
    },
    color: {
      control: 'select',
      options: colors,
      description: 'Variante de color del componente',
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
    <cc-countdown
      .labels=${args.labels}
      timeZone=${ifDefined(args.timeZone)}
      date=${ifDefined(args.date)}
      time=${ifDefined(args.time)}
      labelDate=${ifDefined(args.labelDate)}
      location=${ifDefined(args.location)}
      locationLink=${ifDefined(args.locationLink)}
      color=${ifDefined(args.color)}
    ></cc-countdown>
  `,
};

export default meta;
type Story = StoryObj<CountdownArgs>;

export const Default: Story = {
  args: {
    labels: { days: 'Días', hours: 'Horas', minutes: 'Minutos', seconds: 'Segundos' },
    location: 'Buenos Aires / Argentina',
    locationLink: 'https://maps.app.goo.gl/7DC4b2SRVyVe2bMt7',
    labelDate: 'Oct 31, 2026',
    date: '2026-10-31',
    time: '08:00:00',
    timeZone: 'UTC-3',
    color: 'primary',
  },
};

export const Sydney: Story = {
  name: 'Sydney – Australia',
  args: {
    labels: { days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds' },
    location: 'Sydney / Australia',
    locationLink: 'https://goo.gl/maps/WE1AKpnNHdRESaBPA',
    labelDate: 'Oct 31, 2026',
    date: '2026-10-31',
    time: '08:00:00',
    timeZone: 'UTC+10',
    color: 'secondary',
  },
};

export const Paris: Story = {
  name: 'Paris – France',
  args: {
    labels: { days: 'Jours', hours: 'Heures', minutes: 'Minutes', seconds: 'Secondes' },
    location: 'Paris / France',
    labelDate: 'Oct 31, 2026',
    date: '2026-10-31',
    time: '08:00:00',
    timeZone: 'UTC+2',
    color: 'primary',
  },
};

export const Bogota: Story = {
  name: 'Bogotá – Colombia',
  args: {
    labels: { days: 'Días', hours: 'Horas', minutes: 'Minutos', seconds: 'Segundos' },
    location: 'Bogotá / Colombia',
    locationLink: 'https://goo.gl/maps/xoG2px1tkGKoQKqv7',
    labelDate: 'Oct 31, 2026',
    date: '2026-10-31',
    time: '08:00:00',
    timeZone: 'UTC-5',
    color: 'black',
  },
};
