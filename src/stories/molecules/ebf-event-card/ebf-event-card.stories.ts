import { html } from 'lit';
import './ebf-event-card';
import { Meta, StoryObj } from '@storybook/web-components-vite';

const meta: Meta = {
  title: 'Molecules/Event Card',
  component: 'ebf-event-card',
  tags: ['autodocs'],
  argTypes: {
    contentInfoData: {
      control: 'object',
      description: 'Array of content info data used to display titles, subtitles, and descriptions.',
    },
    sectionCards: {
      control: 'object',
      description: 'Array of section card data for each event section.',
    },
  },
};

export default meta;
type Story = StoryObj;

const Template = (args: any) => html`
  <ebf-event-card
    .contentInfoData=${args.contentInfoData}
    .sectionCards=${args.sectionCards}
  ></ebf-event-card>
`;

export const Default: Story = {
  args: {
    contentInfoData: 
      {
        title: 'Virtual Innovators Hub',
        titleColor: 'neutral-dark',
        titleFontSize: '2xl',
        titleFontFamily: 'open-sans',
        subtitle: 'Summer 2025',
        subtitleColor: 'neutral',
        subtitleFontSize: 'lg',
        subtitleFontFamily: 'open-sans',
        description:
          'A series of innovative talks and discussions focusing on AI advancements, designed to inspire and educate participants throughout the summer season.',
        descriptionColor: 'gray-dark',
        descriptionFontSize: 'base',
        descriptionFontFamily: 'open-sans',
        align: 'center',
      },
    sectionCards: [
      {
        date: 'March 14, 2025',
        title: 'Sustainability Forum 2025',
        linkText: 'Learn more',
        url: '#',
      },
      {
        date: 'April 22, 2025',
        title: 'Innovation in Education Summit',
        linkText: 'Register now',
        url: '#',
      },
      {
        date: 'June 10, 2025',
        title: 'Future of Work Conference',
        linkText: 'Get details',
        url: '#',
      },
    ],
  },
  render: Template,
};
