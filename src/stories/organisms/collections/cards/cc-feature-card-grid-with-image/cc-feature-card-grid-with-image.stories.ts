import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './cc-feature-card-grid-with-image';

const meta: Meta = {
  title: 'organisms/Collections/Feature Cards/Grid with Image',
  component: 'cc-feature-card-grid-with-image',
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
    itemsPerRow: 3,
    cards: [
      {
        isVertical: true,
        image: {
          src: 'https://dev-ebfactory-v25.pantheonsite.io/sites/default/files/2025-05/Custom_Software_Development.jpg',
          alt: 'Image 1',
        },
        titleProperties: {
          title: 'Custom Software Development',
          titleColor: 'neutral',
          titleFontSize: 'h4',
        },
        descriptionProperties: {
          description: 'We carry out the entire process for software development according to the needs of our clients',
          descriptionColor: 'neutral',
          descriptionFontSize: 'base',
          descriptionFontFamily: 'open-sans',
        },
        link: {
          href: '',
          target: '_blank',
          label: 'Read more',
          color: 'primary',
          radius: 'md',
          iconProps: {
            library: 'material',
            name: '',
            size: 'medium',
          },
        },
        align: 'left',
      },
      {
        isVertical: true,
        image: {
          src: 'https://dev-ebfactory-v25.pantheonsite.io/sites/default/files/2025-05/Integration_of_Infrastructure_and_Services.jpg',
          alt: 'Image 1',
        },
        titleProperties: {
          title: 'Integration of Infrastructure and Services',
          titleColor: 'neutral',
          titleFontSize: 'h4',
          titleFontFamily: 'open-sans',
        },
        descriptionProperties: {
          description: 'We analyze, design and implement solutions that incorporate existing information systems in order to obtain new innovative and useful products for our clients.',
          descriptionColor: 'neutral',
          descriptionFontSize: 'base',
          descriptionFontFamily: 'open-sans',
        },
        link: {
          href: '',
          target: '_blank',
          label: 'Read more',
          color: 'primary',
          radius: 'md',
          iconProps: {
            library: 'material',
            name: '',
            size: 'medium',
          },
        },
        align: 'left',
      },
      {
        isVertical: true,
        image: {
          src: 'https://dev-ebfactory-v25.pantheonsite.io/sites/default/files/2025-05/RPA_Robotic_Process_Automation.jpg',
          alt: 'Image 1',
        },
        titleProperties: {
          title: 'RPA - Robotic Process Automation',
          titleColor: 'neutral',
          titleFontSize: 'h4',
          titleFontFamily: 'open-sans',
        },
        descriptionProperties: {
          description: 'Is any technology oriented to the use of software with the objective of reducing human intervention in the use of computer applications,',
          descriptionColor: 'neutral',
          descriptionFontSize: 'base',
          descriptionFontFamily: 'open-sans',
        },
        link: {
          href: '#',
          target: '_blank',
          label: 'Read more',
          color: 'primary',
          radius: 'md',
          iconProps: {
            library: 'material',
            name: '',
            size: 'medium',
          },
        },
        align: 'left',
      },
      {
        isVertical: true,
        image: {
          src: 'https://dev-ebfactory-v25.pantheonsite.io/sites/default/files/2025-05/Corporate_portals_and_Intranets.jpg',
          alt: 'Image 1',
        },
        titleProperties: {
          title: 'Corporate portals and Intranets',
          titleColor: 'neutral',
          titleFontSize: 'h4',
          titleFontFamily: 'open-sans',
        },
        descriptionProperties: {
          description: 'We develop business portals and intranets using state-of-the-art technologies and advanced web concepts.',
          descriptionColor: 'neutral',
          descriptionFontSize: 'base',
          descriptionFontFamily: 'open-sans',
        },
        link: {
          href: '#',
          target: '_blank',
          label: 'Read more',
          color: 'primary',
          radius: 'md',
          iconProps: {
            library: 'material',
            name: '',
            size: 'medium',
          },
        },
        align: 'left',
      },
      {
        isVertical: true,
        image: {
          src: 'https://dev-ebfactory-v25.pantheonsite.io/sites/default/files/2025-05/Offshoring_Outsourcing.jpg',
          alt: 'Image 1',
        },
        titleProperties: {
          title: 'Offshoring / Outsourcing',
          titleColor: 'neutral',
          titleFontSize: 'h4',
          titleFontFamily: 'open-sans',
        },
        descriptionProperties: {
          description: 'We perform international outsourcing to companies of any kind for the development of custom software regardless of location.',
          descriptionColor: 'neutral',
          descriptionFontSize: 'base',
          descriptionFontFamily: 'open-sans',
        },
        link: {
          href: '#',
          target: '_blank',
          label: 'Read more',
          color: 'primary',
          radius: 'md',
          iconProps: {
            library: 'material',
            name: '',
            size: 'medium',
          },
        },
        align: 'left',
      },
      {
        isVertical: true,
        image: {
          src: 'https://dev-ebfactory-v25.pantheonsite.io/sites/default/files/2025-05/Offshoring_Outsourcing.jpg',
          alt: 'Image 1',
        },
        titleProperties: {
          title: 'Consulting',
          titleColor: 'neutral',
          titleFontSize: 'h4',
          titleFontFamily: 'open-sans',
        },
        descriptionProperties: {
          description: 'We advise on information technology issues, technical requirements, information systems changes and system impacts on your organization.',
          descriptionColor: 'neutral',
          descriptionFontSize: 'base',
          descriptionFontFamily: 'open-sans',
        },
        link: {
          href: '#',
          target: '_blank',
          label: 'Read more',
          color: 'primary',
          radius: 'md',
          iconProps: {
            library: 'material',
            name: '',
            size: 'medium',
          },
        },
        align: 'left',
      },
    ],
  },
  render: ({ itemsPerRow, cards }) => html`
    <cc-feature-card-grid-with-image
      .itemsPerRow=${itemsPerRow}
      .cards=${cards}
    ></cc-feature-card-grid-with-image>
  `,
};
