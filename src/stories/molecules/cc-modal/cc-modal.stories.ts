import type { Meta, StoryObj } from '@storybook/web-components';
import { html} from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';


import './cc-modal';
import '../../atoms/cc-button/cc-button';

const meta: Meta = {
  title: 'Molecules/Modal',
  component: 'cc-modal',
  argTypes: {
    isOpen: { control: 'boolean' },
    showHeader: { control: 'boolean' },
    showFooter: { control: 'boolean' },
    footerAlign: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    titleHeader: { control: 'text' },
    buttons: {
      control: 'object',
      description: 'Array of button objects',
    },
    textAlign: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    textSize: {
      control: 'select',
      options: ['small', 'base', 'large', 'xl', '2xl'],
    },
  },
};

export default meta;

type Story = StoryObj;

const Template = (args: any) => html`
  <cc-button
    color="primary"
    size="base"
    label="Open modal"
    radius="rounded-full"
    @click="${() => {
      const modal = document.querySelector('cc-modal');
      modal?.__onOpen?.();
    }}"
  ></cc-button>

  <cc-modal
    .isOpen=${args.isOpen}
    .showHeader=${args.showHeader}
    .showFooter=${args.showFooter}
    .footerAlign=${args.footerAlign}
    .titleHeader=${args.titleHeader}
    .textAlign=${args.textAlign}
    .textSize=${args.textSize}
    .buttons=${args.buttons}
  >
    <h1>${args.title}</h1>
    ${typeof args.content === 'string'
  ? unsafeHTML(args.content)
  : args.content ?? ''}

  </cc-modal>
`;

export const Default: Story = Template.bind({});
Default.args = {
  isOpen: false,
  showHeader: true,
  showFooter: true,
  footerAlign: 'left',
  titleHeader: 'Terminos y condiciones',
  title: 'Título de la modal',
  content: 'Esta es una descripción de la modal. Puedes agregar cualquier contenido aquí.',
  textAlign: 'left',
  textSize: 'xl',
  buttons: [
    {
      label: 'Aceptar',
      color: 'primary',
      iconProps: { iconName: 'check' },
    },
    {
      label: 'Cancelar',
      color: 'secondary',
      iconProps: { iconName: 'close' },
    },
    {
      label: 'Ver más',
      color: 'info',
      iconProps: { iconName: 'close' },
    },
  ],
};

export const Open: Story = Template.bind({});
Open.args = {
  ...Default.args,
  isOpen: true,
  textAlign: 'right',
  textSize: 'large',
  content:
    'The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.',
  footerAlign: 'right',
};

export const Message: Story = Template.bind({});
Message.args = {
  isOpen: true,
  showHeader: false,
  showFooter: true,
  footerAlign: 'center',
  title: '¿Estás seguro?',
  textAlign: 'center',
  textSize: 'xl',
  content: `
    Esta acción no se puede deshacer. Esto eliminará permanentemente los datos asociados
    a este registro. Asegúrate de haber revisado toda la información antes de proceder.
    ¿Deseas continuar con esta acción?
  `,
  buttons: [
    {
      label: 'Cancelar',
      color: 'secondary',
      iconProps: { iconName: 'close' },
    },
    {
      label: 'Eliminar',
      color: 'primary',
      iconProps: { iconName: 'check' },
    },
  ],
};
