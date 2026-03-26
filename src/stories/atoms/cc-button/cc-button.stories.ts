import type { ButtonProperties } from "@interfaces/button.interface";
import type { Meta, StoryObj } from '@storybook/web-components';
import { expect, fn, userEvent } from 'storybook/test';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js'; // Importante para la doc
import './cc-button';

type ButtonArgs = Partial<ButtonProperties> & { onClick?: Function };

const meta: Meta<ButtonArgs> = {
  title: 'Atoms/Button',
  component: 'cc-button',
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: [
        'primary', 'primary-border', 'primary-white', 'primary-transparent-white',
        'secondary', 'secondary-border', 'secondary-white', 'secondary-transparent-white',
        'sucess', 'warning', 'danger', 'info', 'neutral', 'white', 'black'
      ],
      description: 'Button color variant',
      defaultValue: 'secondary'
    },
    size: {
      control: 'select',
      options: ['small', 'base', 'large'],
      description: 'Button size',
      defaultValue: 'base'
    },
    radius: {
      control: 'select',
      options: ['rounded', 'rounded-md', 'rounded-lg', 'rounded-full', 'rounded-none'],
      description: 'Button border radius',
      defaultValue: 'rounded-md'
    },
    label: {
      control: 'text',
      description: 'Button label text',
      defaultValue: 'Button'
    },
    iconProps: {
      control: 'object',
      description: 'Icon configuration object'
    },
    onClick: {
      action: 'clicked',
      description: 'Click event handler'
    }
  },
  // AJUSTE 1: Forzamos a Storybook a leer el DOM dinámicamente para la doc
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
        language: 'html',
      },
    },
  },
};

export default meta;

type Story = StoryObj<ButtonArgs>;

// AJUSTE 2: Cambiamos '.' por atributos normales para que Storybook los "vea"
const Template = (args: ButtonArgs) => html`
  <cc-button
    color=${ifDefined(args.color)}
    size=${ifDefined(args.size)}
    radius=${ifDefined(args.radius)}
    label=${ifDefined(args.label)}
    .iconProps=${args.iconProps}
    @button-click=${(e: CustomEvent) => {
      if (args.onClick) args.onClick(e);
      console.log('Click detect:', e.detail.event);
    }}
  ></cc-button>
`;

export const Primary: Story = {
  args: {
    color: 'primary',
    size: 'base',
    radius: 'rounded-md',
    label: 'Primary Button',
    iconProps: {
      library: 'material',
      name: 'home',
      size: 'full',
      position: 'left'
    }
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'This is a primary button with an icon.',
      },
    },
  },
};

export const Secondary: Story = {
  args: {
    color: 'secondary',
    size: 'base',
    radius: 'rounded-md',
    label: 'Secondary Button'
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'This is a secondary button without an icon.',
      },
    },
  },
};

export const WithIconLeft: Story = {
  args: {
    color: 'primary',
    size: 'base',
    radius: 'rounded-md',
    label: 'Go Home',
    iconProps: {
      library: 'material',
      name: 'home',
      size: 'medium',
      position: 'left'
    }
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'Button with icon on the left.'
      }
    }
  },
};

export const WithIconRight: Story = {
  args: {
    color: 'primary',
    size: 'base',
    radius: 'rounded-md',
    label: 'Search',
    iconProps: {
      library: 'material',
      name: 'search',
      size: 'medium',
      position: 'right'
    }
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'Button with icon on the right.'
      }
    }
  },
};

export const SizesShowcase: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px;">
      <cc-button color="primary" size="small" label="Small"></cc-button>
      <cc-button color="primary" size="base" label="Base"></cc-button>
      <cc-button color="primary" size="large" label="Large"></cc-button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the different button sizes.'
      }
    }
  }
};

export const RadiusVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px;">
      <cc-button label="Rounded" radius="rounded"></cc-button>
      <cc-button label="Rounded MD" radius="rounded-md"></cc-button>
      <cc-button label="Rounded LG" radius="rounded-lg"></cc-button>
      <cc-button label="Full" radius="rounded-full"></cc-button>
      <cc-button label="None" radius="rounded-none"></cc-button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the different edges (radius).'
      }
    }
  }
};

export const AllColorsShowcase: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 12px;">
      ${[
        'primary', 'primary-border', 'primary-white', 'primary-transparent-white',
        'secondary', 'secondary-border', 'secondary-white', 'secondary-transparent-white',
        'sucess', 'warning', 'danger', 'info', 'neutral', 'white', 'black',
      ].map(color => html`
        <cc-button
          color=${color}
          label=${color}
          size=${'base'}
          radius=${'rounded-md'}>
        </cc-button>
      `)}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Displaying all available button colors.'
      }
    }
  }
};

export const IconOnlyButton: Story = {
  args: {
    label: '', // Importante que sea string vacío
    radius: 'rounded-full',
    size: 'base',
    color: 'primary',
    iconProps: {
      library: 'material',
      name: 'menu',
      size: 'medium', // 'large' a veces rompe el padding si el botón es pequeño
      position: 'left'
    }
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'Circular button with icon only. Para que funcione, el label debe estar vacío.'
      }
    }
  }
};

// 🧪 Testing Stories con Play Functions (Tus originales mantenidos)

export const ClickInteraction: Story = {
  args: {
    color: 'primary',
    size: 'base',
    label: 'Click Me'
  },
  render: Template,
  play: async ({ canvasElement }) => {
    const buttonElement = canvasElement.querySelector('cc-button');
    const shadowRoot = buttonElement?.shadowRoot;
    const button = shadowRoot?.querySelector('button');
    await expect(button).toBeTruthy();
    const eventSpy = fn();
    buttonElement?.addEventListener('button-click', eventSpy);
    if (button) {
      await userEvent.click(button);
    }
    await new Promise(resolve => setTimeout(resolve, 100));
    await expect(eventSpy).toHaveBeenCalled();
    await expect(eventSpy).toHaveBeenCalledTimes(1);
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests button click interaction and verifies the button-click event is fired.'
      }
    }
  }
};

export const MultipleClicks: Story = {
  args: {
    color: 'secondary',
    size: 'base',
    label: 'Click Multiple Times'
  },
  render: Template,
  play: async ({ canvasElement }) => {
    const buttonElement = canvasElement.querySelector('cc-button');
    const button = buttonElement?.shadowRoot?.querySelector('button');
    await expect(button).toBeTruthy();
    const eventSpy = fn();
    buttonElement?.addEventListener('button-click', eventSpy);
    if (button) {
      await userEvent.click(button);
      await userEvent.click(button);
      await userEvent.click(button);
    }
    await new Promise(resolve => setTimeout(resolve, 100));
    await expect(eventSpy).toHaveBeenCalledTimes(3);
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests multiple clicks on the button and verifies the count.'
      }
    }
  }
};

export const ButtonWithIcon: Story = {
  args: {
    color: 'primary',
    size: 'base',
    label: 'Search',
    iconProps: {
      library: 'material',
      name: 'search',
      size: 'medium',
      position: 'left'
    }
  },
  render: Template,
  play: async ({ canvasElement }) => {
    const buttonElement = canvasElement.querySelector('cc-button');
    const shadowRoot = buttonElement?.shadowRoot;
    const button = shadowRoot?.querySelector('button');
    await expect(button).toBeTruthy();
    const icon = shadowRoot?.querySelector('cc-icon');
    await expect(icon).toBeTruthy();
    const eventSpy = fn();
    buttonElement?.addEventListener('button-click', eventSpy);
    if (button) {
      await userEvent.click(button);
    }
    await new Promise(resolve => setTimeout(resolve, 100));
    await expect(eventSpy).toHaveBeenCalled();
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests button with icon, verifying both the button and icon are rendered correctly.'
      }
    }
  }
};

export const AccessibilityTest: Story = {
  args: {
    color: 'primary',
    size: 'base',
    label: 'Accessible Button'
  },
  render: Template,
  play: async ({ canvasElement }) => {
    const buttonElement = canvasElement.querySelector('cc-button');
    const shadowRoot = buttonElement?.shadowRoot;
    const button = shadowRoot?.querySelector('button');
    await expect(button).toBeTruthy();
    await expect(button).toHaveAttribute('type', 'button');
    await expect(button?.textContent?.trim()).toContain('Accessible Button');
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests accessibility features of the button component.'
      }
    }
  }
};