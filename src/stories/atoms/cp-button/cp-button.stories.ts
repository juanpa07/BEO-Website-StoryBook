import type { ButtonProperties } from "@interfaces/button.interface";
import type { Meta, StoryObj } from '@storybook/web-components';
import { expect, fn, userEvent } from 'storybook/test';
import { html } from 'lit';
import './cp-button';

type ButtonArgs = Partial<ButtonProperties>;

const meta: Meta = {
  title: 'Atoms/Button',
  component: 'cp-button',
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: [
        'primary', 'primary-border', 'primary-white', 'primary-transparent-white',
        'secondary', 'secondary-border', 'secondary-white', 'secondary-transparent-white',
        'sucess', 'warning', 'danger', 'info', 'neutral', 'white', 'black', 'caribe-yellow', 'caribe-blue', 'caribe-green', 'caribe-red'
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
  }
};

export default meta;

type Story = StoryObj<ButtonArgs>;

const Template = (args: ButtonArgs) => html`
  <cp-button
    .color=${args.color ?? ''}
    .size=${args.size ?? ''}
    .radius=${args.radius ?? ''}
    .label=${args.label ?? ''}
    .iconProps=${args.iconProps}
    @button-click=${(e: CustomEvent) => {
      // no-delete - temporal para debugging
      console.log('Click detect:', e.detail.event);
    }}
  ></cp-button>
`;

export const Primary: Story = {
  args: {
    color: 'caribe-yellow',
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
      <cp-button color="primary" size="small" label="Small"></cp-button>
      <cp-button color="primary" size="base" label="Base"></cp-button>
      <cp-button color="primary" size="large" label="Large"></cp-button>
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
      <cp-button label="Rounded" radius="rounded"></cp-button>
      <cp-button label="Rounded MD" radius="rounded-md"></cp-button>
      <cp-button label="Rounded LG" radius="rounded-lg"></cp-button>
      <cp-button label="Full" radius="rounded-full"></cp-button>
      <cp-button label="None" radius="rounded-none"></cp-button>
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
        'sucess', 'warning', 'danger', 'info', 'neutral', 'white', 'black', 'gradient-1',
      ].map(color => html`
        <cp-button
          .color=${color}
          .label=${color}
          .size=${'base'}
          .radius=${'rounded-md'}>
        </cp-button>
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
    label: '',
    radius: 'rounded-full',
    size: 'base',
    iconProps: {
      library: 'material',
      name: 'menu',
      size: 'large',
      position: 'left'
    }
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'Circular button with icon only.'
      }
    }
  }
};

// 🧪 Testing Stories with Play Functions

export const ClickInteraction: Story = {
  args: {
    color: 'primary',
    size: 'base',
    label: 'Click Me'
  },
  render: Template,
  play: async ({ canvasElement }) => {
    // Get the custom element
    const buttonElement = canvasElement.querySelector('cp-button');
    
    // Access shadow root to get the actual button
    const shadowRoot = buttonElement?.shadowRoot;
    const button = shadowRoot?.querySelector('button');
    
    // Verify button exists
    await expect(button).toBeTruthy();
    
    // Create a spy for the custom event
    const eventSpy = fn();
    buttonElement?.addEventListener('button-click', eventSpy);
    
    // Simulate click
    if (button) {
      await userEvent.click(button);
    }
    
    // Wait a bit for the event to propagate
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Verify event was fired
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
    const buttonElement = canvasElement.querySelector('cp-button');
    const button = buttonElement?.shadowRoot?.querySelector('button');
    
    await expect(button).toBeTruthy();
    
    // Create event spy
    const eventSpy = fn();
    buttonElement?.addEventListener('button-click', eventSpy);
    
    // Click 3 times
    if (button) {
      await userEvent.click(button);
      await userEvent.click(button);
      await userEvent.click(button);
    }
    
    // Wait for events
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Verify it was clicked 3 times
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
    const buttonElement = canvasElement.querySelector('cp-button');
    const shadowRoot = buttonElement?.shadowRoot;
    const button = shadowRoot?.querySelector('button');
    
    // Verify button exists
    await expect(button).toBeTruthy();
    
    // Verify icon is present inside shadow root
    const icon = shadowRoot?.querySelector('cp-icon');
    await expect(icon).toBeTruthy();
    
    // Create event spy
    const eventSpy = fn();
    buttonElement?.addEventListener('button-click', eventSpy);
    
    // Click and verify
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
    const buttonElement = canvasElement.querySelector('cp-button');
    const shadowRoot = buttonElement?.shadowRoot;
    const button = shadowRoot?.querySelector('button');
    
    // Verify button exists
    await expect(button).toBeTruthy();
    
    // Verify button has correct type
    await expect(button).toHaveAttribute('type', 'button');
    
    // Verify button text content
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
