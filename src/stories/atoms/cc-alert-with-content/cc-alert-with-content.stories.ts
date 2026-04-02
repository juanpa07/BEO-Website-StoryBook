import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import './cc-alert-with-content';

import type { AlertProperties } from '@interfaces/alert.interface';

type AlertArgs = Partial<AlertProperties>;

const meta: Meta<AlertArgs> = {
  title: 'Atoms/Alert With Content',
  component: 'cc-alert-with-content',
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Alert heading text',
    },
    type: {
      control: 'select',
      options: ['info', 'danger', 'success', 'warning', 'dark'],
      description: 'Color variant of the alert',
    },
    description: {
      control: 'text',
      description: 'Alert body text',
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
    <cc-alert-with-content
      title=${ifDefined(args.title)}
      type=${ifDefined(args.type)}
      description=${ifDefined(args.description)}
    ></cc-alert-with-content>
  `,
};

export default meta;
type Story = StoryObj<AlertArgs>;

export const Default: Story = {
  args: {
    title: 'This is an info alert',
    description:
      'More info about this alert goes here. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.',
    type: 'info',
  },
};

export const InfoAlert: Story = {
  args: {
    title: 'This is an info alert',
    description:
      'More info about this alert goes here. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.',
    type: 'info',
  },
};

export const SuccessAlert: Story = {
  args: {
    title: 'This is a success alert',
    description:
      'More info about this alert goes here. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.',
    type: 'success',
  },
};

export const DangerAlert: Story = {
  args: {
    title: 'This is a danger alert',
    description:
      'More info about this alert goes here. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.',
    type: 'danger',
  },
};

export const WarningAlert: Story = {
  args: {
    title: 'This is a warning alert',
    description:
      'More info about this alert goes here. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.',
    type: 'warning',
  },
};

export const DarkAlert: Story = {
  args: {
    title: 'This is a dark alert',
    description:
      'More info about this alert goes here. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.',
    type: 'dark',
  },
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <cc-alert-with-content type="info" title="Info alert" description="This is an info message."></cc-alert-with-content>
      <cc-alert-with-content type="success" title="Success alert" description="This is a success message."></cc-alert-with-content>
      <cc-alert-with-content type="warning" title="Warning alert" description="This is a warning message."></cc-alert-with-content>
      <cc-alert-with-content type="danger" title="Danger alert" description="This is a danger message."></cc-alert-with-content>
      <cc-alert-with-content type="dark" title="Dark alert" description="This is a dark message."></cc-alert-with-content>
    </div>
  `,
};
