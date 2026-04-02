import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import './cc-intro-with-multimedia';

import type { IntroWithMultimediaProperties } from '@interfaces/introWithMultimedia.interface';
import { MultimediaType } from '@enums/multimediaType.enum';
import { AlignItems } from '@enums/alignItems.enum';

type IntroWithMultimediaArgs = Partial<IntroWithMultimediaProperties>;

const meta: Meta<IntroWithMultimediaArgs> = {
  title: 'Molecules/Intro With Multimedia',
  component: 'cc-intro-with-multimedia',
  tags: ['autodocs'],
  argTypes: {
    columnTextSize: {
      control: 'select',
      options: ['80', '75', '60', '50', '40', '25', '20'],
      description: 'Width of the text column (percentage)',
    },
    contentTextSize: {
      control: 'select',
      options: ['100', '90', '80', '70', '60', '50'],
      description: 'Width of the inner content column (percentage)',
    },
    isRowReverse: {
      control: 'select',
      options: ['true', 'false'],
      description: 'Reverses the row direction on desktop',
    },
    isColumnReverse: {
      control: 'boolean',
      description: 'Reverses the column direction on mobile',
    },
    contentInfo: {
      control: 'object',
      description: 'Content info properties (title, subtitle, description, links, etc.)',
    },
    multimediaContent: {
      control: 'object',
      description: 'Multimedia content (image, video, countdown)',
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
    <cc-intro-with-multimedia
      columnTextSize=${ifDefined(args.columnTextSize)}
      contentTextSize=${ifDefined(args.contentTextSize)}
      isRowReverse=${ifDefined(args.isRowReverse)}
      .isColumnReverse=${args.isColumnReverse ?? false}
      .contentInfo=${args.contentInfo ?? {}}
      .multimediaContent=${args.multimediaContent ?? {}}
    ></cc-intro-with-multimedia>
  `,
};

export default meta;
type Story = StoryObj<IntroWithMultimediaArgs>;

export const Default: Story = {
  args: {
    columnTextSize: '50',
    contentTextSize: '100',
    isRowReverse: 'false',
    contentInfo: {
      title: 'Image Title',
      titleColor: 'primary',
      titleFontSize: 'h2',
      titleFontFamily: 'open-sans',
      subtitle: 'Image subtitle',
      subtitleColor: 'secondary',
      subtitleFontSize: 'h4',
      subtitleFontFamily: 'open-sans',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      descriptionFontSize: 'lg',
      descriptionFontFamily: 'open-sans',
      align: AlignItems.Start,
      links: [],
    },
    multimediaContent: {
      type: MultimediaType.Image,
      image: { src: '/mujer-sonriendo.png', alt: 'Sonrisa', radius: 'none' },
    },
  },
};

export const WithImage: Story = {
  args: {
    columnTextSize: '50',
    contentTextSize: '100',
    isRowReverse: 'true',
    isColumnReverse: true,
    contentInfo: {
      title: 'Image Title',
      titleColor: 'primary',
      titleFontSize: 'h2',
      titleFontFamily: 'open-sans',
      subtitle: 'Image subtitle',
      subtitleColor: 'secondary',
      subtitleFontSize: 'h4',
      subtitleFontFamily: 'open-sans',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
      descriptionFontSize: 'lg',
      descriptionFontFamily: 'open-sans',
      align: AlignItems.Start,
      links: [
        {
          href: 'https://example.com',
          target: '_blank',
          label: 'Primary Link',
          size: 'base',
          radius: 'rounded-full',
          color: 'green',
          iconProps: {
            library: 'material',
            name: 'chevron_right',
            size: 'medium',
            position: 'right',
          },
        },
      ],
    },
    multimediaContent: {
      type: MultimediaType.Image,
      image: { src: '/mujer-sonriendo.png', alt: 'Sonrisa', radius: 'none' },
    },
  },
};

export const WithImageDownloadApp: Story = {
  args: {
    columnTextSize: '50',
    contentTextSize: '100',
    isRowReverse: 'true',
    isColumnReverse: true,
    contentInfo: {
      title: 'Descárgala gratis',
      titleColor: 'primary',
      titleFontSize: 'h2',
      titleFontFamily: 'open-sans',
      subtitle: '',
      subtitleColor: 'secondary',
      subtitleFontSize: 'h4',
      subtitleFontFamily: 'open-sans',
      description:
        'La aplicación se puede descargar completamente gratis para iPhone, iPad y teléfonos Android.',
      descriptionFontSize: '2xl',
      descriptionFontFamily: 'open-sans',
      descriptionColor: 'neutral',
      align: AlignItems.Start,
      links: [
        {
          href: 'https://www.apple.com/co/app-store/',
          target: '_blank',
          label: 'App Store',
          size: 'large',
          radius: 'rounded-lg',
          color: 'black',
          iconProps: {
            library: 'custom',
            name: 'apple',
            size: 'large',
            position: 'left',
          },
        },
        {
          href: 'https://play.google.com/store/apps',
          target: '_blank',
          label: 'Google Play',
          size: 'large',
          radius: 'rounded-lg',
          color: 'black',
          iconProps: {
            library: 'custom',
            name: 'google-play',
            size: 'large',
            position: 'left',
          },
        },
      ],
    },
    multimediaContent: {
      type: MultimediaType.Image,
      image: { src: '/app-phone.png', alt: 'App Phone', radius: 'none' },
    },
  },
};

export const WithVideo: Story = {
  args: {
    columnTextSize: '50',
    contentTextSize: '100',
    isRowReverse: 'false',
    contentInfo: {
      title: 'Video Summary',
      titleFontSize: '6xl',
      titleColor: 'primary',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
      descriptionFontSize: 'lg',
      descriptionFontFamily: 'open-sans',
      align: AlignItems.Start,
      links: [],
    },
    multimediaContent: {
      type: MultimediaType.Video,
      youtubeData: {
        videoId: 'oiGQDHtK264',
        thumbnail:
          'https://t4.ftcdn.net/jpg/06/56/69/53/360_F_656695306_4gD2WubWsBXdWbgt8xWwGzTaoWY50k5v.jpg',
      },
    },
  },
};

export const WithCountdown: Story = {
  args: {
    columnTextSize: '50',
    contentTextSize: '100',
    isRowReverse: 'false',
    contentInfo: {
      image: { src: '/eBFactory-Logo.png', alt: 'Logo eBFactory', size: 'md' },
      title: 'BID Lab Forum',
      titleColor: 'primary',
      titleFontSize: 'h2',
      titleFontFamily: 'open-sans',
      subtitle: 'BID Lab Forum',
      subtitleColor: 'secondary',
      subtitleFontSize: 'h4',
      subtitleFontFamily: 'open-sans',
      description: '',
      descriptionFontSize: 'lg',
      descriptionFontFamily: 'open-sans',
      align: AlignItems.Start,
      links: [],
    },
    multimediaContent: {
      type: MultimediaType.Countdown,
      countdown: {
        language: 'es',
        location: 'Bogotá / Colombia',
        locationLink: 'https://goo.gl/maps/xoG2px1tkGKoQKqv7',
        labelDate: 'Ago 7, 2025',
        date: '2025-10-31',
        time: '08:00:00',
        timeZone: 'UTC-5',
        color: 'black',
      },
    },
  },
};
