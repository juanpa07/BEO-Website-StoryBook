import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./cc-content-info";
import type { ContentInfoProperties } from "@interfaces/contentInfo.interface";
import { AlignItems } from "@enums/alignItems.enum";

// Ajusta tus opciones/arrays a lo que uses. Pasar esto a un helper de constantes para facilitar la carga repetitivas de opciones
const colors = ["primary", "secondary", "blue-darken-2", "blue-darken-1", "blue", "blue-lighten-1", "blue-lighten-2", "magenta-darken-2", "magenta-darken-1", "magenta", "magenta-lighten-1", "magenta-lighten-2", "green-darken-2", "green-darken-1", "green", "green-lighten-1", "green-lighten-2", "yellow-darken-2", "yellow-darken-1", "yellow", "yellow-lighten-1", "yellow-lighten-2", "purple", "gray-lighten-1", "gray", "gray-light", "gray-dark", "neutral", "neutral-dark", "white", "black", "caribequity", "caribequity-2", "caribe-yellow", "caribe-blue", "caribe-green", "caribe-red"];
const positions = ["left", "center", "right"];

type ContentInfoArgs = Partial<ContentInfoProperties>;

const meta: Meta<ContentInfoArgs> = {
  title: "Molecules/Content Info",
  tags: ["autodocs"],
  component: "cc-content-info", // <-- OJO: Debe coincidir con el @customElement
  argTypes: {
    image: {
      description: "Attribute to specify the image URL",
      control: "object",
    },
    title: { name: "Title", control: "text" },
    titleFontSize: {
      name: "Title font-size",
      defaultValue: "h2",
      description: "Header de la propiedad title",
      control: { type: "select" },
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "6xl", "7xl", "8xl", "9xl"],
    },
    titleColor: {
      name: "Title color",
      defaultValue: "primary",
      description: "Color del title",
      control: { type: "select" },
      options: colors,
    },
    titleFontFamily: {
      name: "Title font-family",
      defaultValue: "open-sans",
      description: "Font family",
      control: { type: "select" },
      options: ["open-sans", "roboto", "montserrat", "dancing"],
    },
    subtitle: { name: "Subtitle", control: "text" },
    subtitleFontSize: {
      name: "Subtitle font-size",
      defaultValue: "h3",
      description: "Header de la propiedad subtitle",
      control: { type: "select" },
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "6xl", "7xl", "8xl", "9xl"],
    },
    subtitleColor: {
      name: "Subtitle color",
      defaultValue: "primary",
      description: "Color del subtitle",
      control: { type: "select" },
      options: colors,
    },
    subtitleFontFamily: {
      name: "Subtitle font-family",
      defaultValue: "open-sans",
      description: "Font family",
      control: { type: "select" },
      options: ["open-sans", "roboto", "montserrat", "dancing"],
    },
    description: { name: "Description", control: "text" },
    descriptionColor: {
      name: "Description color",
      defaultValue: "primary",
      description: "Color de la description",
      control: { type: "select" },
      options: colors,
    },
    descriptionFontSize: {
      name: "Description size",
      defaultValue: "base",
      description: "Font family",
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl"],
    },
    descriptionFontFamily: {
      name: "Description font-family",
      defaultValue: "open-sans",
      description: "Font family",
      control: { type: "select" },
      options: ["open-sans", "roboto", "montserrat", "dancing"],
    },
    align: {
      name: "Align content info",
      defaultValue: AlignItems.Start,
      description: "Alineación del contenido",
      control: { type: "select" },
      options: Object.values(AlignItems),
    },
    links: { control: "object" },
  },
};

export default meta;
type Story = StoryObj<ContentInfoArgs>;

const Template = (args: ContentInfoArgs) => html`
  <cc-content-info
    .image=${args.image}
    .title=${args.title}
    .titleColor=${args.titleColor}
    .titleFontSize=${args.titleFontSize}
    .titleFontFamily=${args.titleFontFamily}
    .subtitle=${args.subtitle}
    .subtitleColor=${args.subtitleColor}
    .subtitleFontSize=${args.subtitleFontSize}
    .subtitleFontFamily=${args.subtitleFontFamily}
    .description=${args.description}
    .descriptionColor=${args.descriptionColor}
    .descriptionFontSize=${args.descriptionFontSize}
    .descriptionFontFamily=${args.descriptionFontFamily}
    .align=${args.align}
    .links=${args.links}
  ></cc-content-info>
`;

export const ContentInfoIntroH1: Story = {
  args: {
    title: "Acessibilidade, Eficácia, Imparcialidade e Transparência",
    titleFontSize: "h1",
    titleColor: "primary",
    titleFontFamily: "open-sans",
    subtitle: "Sobre o MICI",
    subtitleFontSize: "h3",
    subtitleColor: "secondary",
    subtitleFontFamily: "dancing",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    descriptionColor: "neutral",
    descriptionFontSize: "lg",
    descriptionFontFamily: "open-sans",
    links: [{
      href: '#',
      target: '_blank',
      label: 'Primary Link',
      size: 'base',
      radius: 'rounded-full',
      color: 'primary',
      iconProps: {
        library: 'material',
        name: 'chevron_right',
        size: 'medium',
        position: 'right',
      },
    },
    {
      href: '#',
      target: '_blank',
      label: 'Secondary Link',
      size: 'base',
      radius: 'rounded-full',
      color: 'secondary',
      iconProps: {
        library: 'material',
        name: 'chevron_right',
        size: 'medium',
        position: 'right',
      },
    },
    {
      href: '#',
      target: '_blank',
      label: 'Neutral Link',
      size: 'base',
      radius: 'rounded-full',
      color: 'neutral',
      iconProps: {
        library: 'material',
        name: 'chevron_right',
        size: 'medium',
        position: 'left',
      },
    }],
    align: AlignItems.Start,
  },
  render: Template,
};

export const ContentInfo7xlTitleCenter: Story = {
  args: {
    title: "Acessibilidade, Eficácia, Imparcialidade e Transparência",
    titleFontSize: "7xl",
    titleColor: "secondary",
    titleFontFamily: "open-sans",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    descriptionColor: "neutral",
    descriptionFontSize: "lg",
    descriptionFontFamily: "open-sans",
    links: [],
    align: AlignItems.Center,
  },
  render: Template,
};

export const ContentInfoImageTitle: Story = {
  args: {
    image: { src: "/eBFactory-Logo.png", alt: "Logo eBFactory", size: "md" },
    subtitle: "Sobre eBFactory",
    subtitleFontSize: "h5",
    subtitleColor: "secondary",
    subtitleFontFamily: "monserrat",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <ul class='bullet-list'><li>Lorem ipsum dolor sit amet</li><li>Lorem ipsum dolor sit amet</li><li>Lorem ipsum dolor sit amet</li></ul>",
    descriptionColor: "neutral",
    descriptionFontSize: "lg",
    descriptionFontFamily: "open-sans",
    links: [{
      href: 'https://example.com',
      target: '_blank',
      label: 'Event Recording',
      size: 'base',
      radius: 'rounded-full',
      color: 'green',
      iconProps: {
        library: 'material',
        name: 'chevron_right',
        size: 'medium',
        position: 'right',
      },
    }],
    align: AlignItems.Start,
  },
  render: Template,
};


export const ContentInfoTitleSubtitleAndLinks: Story = {
  args: {
    title: "Acessibilidade, Eficácia, Imparcialidade e Transparência",
    titleFontSize: "7xl",
    titleColor: "secondary",
    titleFontFamily: "open-sans",
    subtitle: "Sobre eBFactory",
    subtitleFontSize: "h5",
    subtitleColor: "primary",
    subtitleFontFamily: "monserrat",
    links: [{
      href: '#',
      target: '_blank',
      label: 'Primary Link',
      size: 'base',
      radius: 'rounded-full',
      color: 'primary',
      iconProps: {
        library: 'material',
        name: 'chevron_right',
        size: 'medium',
        position: 'right',
      },
    },
    {
      href: '#',
      target: '_blank',
      label: 'Primary Link',
      size: 'base',
      radius: 'rounded-full',
      color: 'primary',
      iconProps: {
        library: 'material',
        name: 'chevron_right',
        size: 'medium',
        position: 'right',
      },
    }],
    align: AlignItems.Center,
  },
  render: Template,
};


export const ContentInfoTitleSubtitleAndLinksRight: Story = {
  args: {
    title: "Acessibilidade, <span class='text-primary'>Eficácia</span>, Imparcialidade e Transparência",
    titleFontSize: "6xl",
    titleColor: "secondary",
    titleFontFamily: "open-sans",
    subtitle: "Sobre eBFactory",
    subtitleFontSize: "h5",
    subtitleColor: "primary",
    subtitleFontFamily: "monserrat",
    links: [],
    align: AlignItems.End,
  },
  render: Template,
};

export const ContentInfoTitleSubtitleAndLeyend: Story = {
  args: {
    title: "Agenda",
    titleFontSize: "h1",
    titleColor: "primary",
    titleFontFamily: "open-sans",
    subtitle: "Local time El Salvador",
    subtitleFontSize: "h4",
    subtitleColor: "neutral",
    subtitleFontFamily: "open-sans",
    description: "<div style='display: flex; flex-wrap: wrap; gap: 15px; align-items: center; justify-content: center;'><span class='text-pillar-blue' style='display: flex; flex-wrap: wrap; gap: 5px; align-items: center;'><cc-icon name='radio_button_checked' size='medium' color='text-pillar-blue'></cc-icon>Economic Opportunities</span> <span class='text-pillar-orange' class='text-pillar-blue' style='display: flex; flex-wrap: wrap; gap: 5px; align-items: center;'><cc-icon name='radio_button_checked' size='medium' color='text-pillar-orange'></cc-icon>Investment Promotion & Venture Capital</span> <span class='text-pillar-pink' class='text-pillar-blue' style='display: flex; flex-wrap: wrap; gap: 5px; align-items: center;'><cc-icon name='radio_button_checked' size='medium' color='text-pillar-pink'></cc-icon>Enabling Policies for Growth</span></div>",
    descriptionColor: "neutral",
    descriptionFontSize: "lg",
    descriptionFontFamily: "open-sans",
    links: [],
    align: AlignItems.Center,
  },
  render: Template,
};