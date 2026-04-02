import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './cc-sponsors-group-with-image';

const meta: Meta = {
  title: 'organisms/Collections/Sponsors Group/Grid with Sponsors',
  tags: ['autodocs'],
  component: 'cc-sponsors-group-with-image',
  argTypes: {
    contentInfo: {
      default: '',
      description: 'Attribute to specify the content info of the sponsors group',
      control: 'object',
    },
    itemsPerRow: {
      default: 4,
      description: 'Attribute to specify the size of the sponsor box',
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
    sponsorDesign: {
      name: 'Card design',
      default: 'border',
      description: 'Attribute to specify the design of the sponsor box',
      control: 'select',
      options: ['border', 'blur', 'shadow', 'none'],
    },
    sponsors: {
      default: '',
      description: 'Attribute to specify the sponsors array',
      control: 'object',
    },
    sponsorsNameColor: {
      default: 'black',
      description: 'Attribute to specify the color of the sponsors name',
      control: 'select',
      options: ['black', 'white', 'primary', 'secondary', 'blue', 'blue-darken-1', 'blue-darken-2', 'blue-lighten-1', 'blue-lighten-2', 'magenta', 'magenta-darken-1', 'magenta-darken-2', 'magenta-lighten-1', 'magenta-lighten-2', 'green', 'green-darken-1', 'green-darken-2', 'green-lighten-1', 'green-lighten-2', 'yellow', 'yellow-darken-1', 'yellow-darken-2', 'yellow-lighten-1', 'yellow-lighten-2', 'purple', 'gray-lighten-1', 'gray', 'gray-light', 'gray-dark', 'neutral', 'neutral-dark', 'white', 'black'],
    },
    hasSponsorsName: {
      default: false,
      description: 'Attribute to specify if the sponsors name is displayed',
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => html`
    <cc-sponsors-group-with-image
      .contentInfo=${args.contentInfo}
      .itemsPerRow=${args.itemsPerRow}
      .sponsors=${args.sponsors}
      .sponsorDesign=${args.sponsorDesign}
      .hasSponsorsName=${args.hasSponsorsName}
    ></cc-sponsors-group-with-image>
  `,
  args: {
  contentInfo: {
    title: 'Golden <span class="text-primary">Partners</span>',
    titleFontSize: 'h3',
    titleColor: 'secondary',
  },
  sponsorDesign: 'border',
  itemsPerRow: '4',
  hasSponsorsName: false,
  sponsors: [
    {
      name: 'Microsoft',
      image:
        'https://bidlab.org/sites/default/files/styles/landscape_3x2_490000_490x327_100/public/2024-04/Microsoft.png?h=376210c9&itok=D_jDV_i9',
      link: 'https://arodcorp.com',
      alt: 'Microsoft',
    },
    {
      name: 'Coca Cola',
      image:
        'https://bidlab.org/sites/default/files/styles/landscape_3x2_490000_490x327_100/public/2024-04/CocaCola.png?h=376210c9&itok=TUiXZhPi',
      link: 'https://floridafunders.com',
      alt: 'Microsoft',
    },
    {
      name: 'Master card',
      image:
        'https://bidlab.org/sites/default/files/styles/landscape_3x2_490000_490x327_100/public/2024-04/Mastercard.png?h=376210c9&itok=plnKt6TF',
      link: 'https://www.gtlaw.com',
      alt: 'Microsoft',
    },
    {
      name: 'CITI',
      image:
        'https://bidlab.org/sites/default/files/styles/landscape_3x2_490000_490x327_100/public/2024-04/CITI.png?h=376210c9&itok=WO8itGNR',
      link: 'https://knightfoundation.org',
      alt: 'Microsoft',
    },
    {
      name: 'ABinBev',
      image:
        'https://bidlab.org/sites/default/files/styles/landscape_3x2_490000_490x327_100/public/2024-04/ABinBev.png?h=376210c9&itok=bnjjpcnq',
      link: 'https://www.medinacapital.com',
    },
    {
      name: 'AVP',
      image:
        'https://bidlab.org/sites/default/files/styles/landscape_3x2_490000_490x327_100/public/2024-04/AVP.png?h=376210c9&itok=XW15fEQ4',
      link: 'https://www.miamiherald.com',
    },
    {
      name: 'Miami-Dade County',
      image:
        'https://bidlab.org/sites/default/files/styles/landscape_3x2_490000_490x327_100/public/2024-04/CCB.png?h=376210c9&itok=zTw3Mk0i',
      link: 'https://www.miamidade.gov',
    },
  ],
  },
};

export const NoDesignCard: Story = {
  render: (args: any) => html`
    <cc-sponsors-group-with-image
      .contentInfo=${args.contentInfo}
      .itemsPerRow=${args.itemsPerRow}
      .sponsors=${args.sponsors}
      .sponsorDesign=${args.sponsorDesign}
      .hasSponsorsName=${args.hasSponsorsName}
    ></cc-sponsors-group-with-image>
  `,
  args: {
  contentInfo: {
    title: 'Golden Partners',
    titleFontSize: 'h3',
    titleColor: 'secondary',
  },
  itemsPerRow: '4',
  sponsorDesign: 'none',
  hasSponsorsName: true,
  sponsors: [
    {
      name: 'Microsoft',
      image: './global.webp',
      link: 'https://arodcorp.com',
      alt: 'Microsoft',
    },
    {
      name: 'Coca Cola',
      image: './EuropeanUnion.webp',
      link: 'https://floridafunders.com',
      alt: 'Microsoft',
    },
    {
      name: 'Master card',
      image: './Aop.webp',
      link: 'https://www.gtlaw.com',
      alt: 'Microsoft',
    },
    {
      name: 'CITI',
      image: './IDBLab.webp',
      link: 'https://knightfoundation.org',
      alt: 'Microsoft',
    },
  ],
  },
};
