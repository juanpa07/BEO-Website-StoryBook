import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { LayoutProperties } from '@interfaces/layout.interface';
import './cc-layout-section';
import { BackgroundType } from '@enums/backgroundType.enum';
import { OverlayType } from '@enums/overlayType.enum';
import { GradientType } from '@enums/gradientType.enum';
import { GradientOrientationType } from '@enums/gradientOrientationType.enum';
import { BorderRadiusType } from '@enums/borderRadiusType.enum';

type LayouSectionArgs = Partial<LayoutProperties>;

const meta: Meta = {
  title: 'Templates/Layout Section',
  component: 'cc-layout-section',
  tags: ['autodocs'],
  argTypes: {
    layoutProperties: {
      description: 'Background properties for the layout section.',
      control: { type: 'object' },
    },
    layoutContentProperties: {
      description: 'Content sizing and spacing properties.',
      control: { type: 'object' },
    },
  },
};

export default meta;

type Story = StoryObj<LayouSectionArgs>;

const Template = (args: LayouSectionArgs) => html`
  <cc-layout-section
    .layoutProperties=${args.layoutProperties}
    .layoutContentProperties=${args.layoutContentProperties}
  ></cc-layout-section>
`;

export const LayoutSectionWithBackgroundColor: Story = {
  render: Template,
  args: {
    layoutProperties: {
      backgroundType: BackgroundType.Solid,
      backgroundColor: 'primary',
      backgroundImage: '',
      backgroundPosition: 'center',
      minHeight: '70vh',
      overlay: {
        type: OverlayType.Solid,
        showOverlay: false,
        opacity: 70,
        isGlass: false,
        solid: {
          colorRGB: '255,255,255',
        },
        gradient: {
          type: 'linear',
          orientation: 'horizontal',
          colorOneRGB: '255,255,255',
          colorTwoRGB: '255,255,255',
          colorThreeRGB: '255,255,255',
        },
      },
    },
    layoutContentProperties: {
      maxWidth: 'auto',
      paddingY: 'py-10',
      paddingX: 'px-10',
      marginY: 'my-0',
      marginX: 'mx-0',
      isContentFullHeight: false,
    },
  },
};

export const LayoutSectionWithBackgroundImageAndSolidOverlay: Story = {
  render: Template,
  args: {
    layoutProperties: {
      backgroundType: BackgroundType.Image,
      backgroundImage:
        'https://bidlab.org/sites/default/files/styles/landscape_4x1_2560000_2560x640_100/public/2024-04/IDB-Lab-Forum-Banner-SPA.webp?h=2815bd5e&itok=Men0ltvj',
      backgroundPosition: 'center',
      minHeight: 'screen',
      background: {
        overlay: {
          type: OverlayType.Solid,
          showOverlay: true,
          opacity: 60,
          isGlass: false,
          solid: {
            colorRGB: '0,0,0',
          },
          gradient: {
            type: GradientType.Linear,
            orientation: GradientOrientationType.Horizontal,
            colorOneRGB: '42,123,155',
            colorTwoRGB: '87,199,133',
            colorThreeRGB: '237,221,83',
          },
        }
      },
    },
    layoutContentProperties: {
      maxWidth: 'full',
      paddingY: 'py-5',
      paddingX: 'px-0',
      marginY: 'my-0',
      marginX: 'mx-0',
      isContentFullHeight: true,
    },
  },
};

export const LayoutSectionWithBackgrounVideo: Story = {
  render: Template,
  args: {
    layoutProperties: {
      backgroundType: BackgroundType.Video,
      backgroundColor: '',
      backgroundImage: '',
      backgroundPosition: 'center',
      minHeight: 'screen',
      youtube: {
        videoId: 'l0raSAdR0NA',
        autoplay: true,
        mute: true,
        controls: false,
        loop: true,
      },
      background: {
        overlay: {
          type: OverlayType.Solid,
          showOverlay: false,
          opacity: 50,
          isGlass: false,
          solid: {
            colorRGB: '0,0,0',
          },
          gradient: {
            type: GradientType.Linear,
            orientation: GradientOrientationType.Horizontal,
            colorOneRGB: '42,123,155',
            colorTwoRGB: '87,199,133',
            colorThreeRGB: '237,221,83',
          },
        }
      },
    },
    layoutContentProperties: {
      maxWidth: 'full',
      paddingY: 'py-5',
      paddingX: 'px-0',
      marginY: 'my-0',
      marginX: 'mx-0',
      isContentFullHeight: true,
    },
  },
};

export const LayoutSectionWithBackgroundVideoAndSolidOverlay: Story = {
  render: Template,
  args: {
    layoutProperties: {
      backgroundType: BackgroundType.Video,
      backgroundColor: '',
      backgroundImage: '',
      backgroundPosition: 'center',
      minHeight: 'screen',
      youtube: {
        videoId: 'l0raSAdR0NA',
        autoplay: true,
        mute: true,
        controls: false,
        loop: true,
      },
      background: {
        overlay: {
          type: OverlayType.Solid,
          showOverlay: true,
          opacity: 50,
          isGlass: false,
          solid: {
            colorRGB: '0,0,0',
          },
          gradient: {
            type: GradientType.Linear,
            orientation: GradientOrientationType.Horizontal,
            colorOneRGB: '42,123,155',
            colorTwoRGB: '87,199,133',
            colorThreeRGB: '237,221,83',
          },
        }
      },
    },
    layoutContentProperties: {
      maxWidth: 'auto',
      paddingY: 'py-5',
      paddingX: 'px-0',
      marginY: 'my-0',
      marginX: 'mx-0',
      isContentFullHeight: true,
    },
  },
};

export const LayoutSectionWithLinearGradientOverlay: Story = {
  render: Template,
  args: {
    layoutProperties: {
      backgroundType: BackgroundType.Solid,
      backgroundColor: 'white',
      backgroundImage: '',
      backgroundPosition: '',
      minHeight: 'screen',
      background: {
        overlay: {
          type: OverlayType.Gradient,
          showOverlay: true,
          opacity: 100,
          isGlass: true,
          solid: {
            colorRGB: '237,221,83',
          },
          gradient: {
            type: GradientType.Linear,
            orientation: GradientOrientationType.Horizontal,
            colorOneRGB: '42,123,155',
            colorTwoRGB: '87,199,133',
            colorThreeRGB: '237,221,83',
          },
        }
      },
    },
    layoutContentProperties: {
      maxWidth: 'auto',
      paddingY: 'py-5',
      paddingX: 'px-0',
      marginY: 'my-0',
      marginX: 'mx-0',
      isContentFullHeight: true,
    },
  },
};

export const RadialGradientOverlay: Story = {
  render: Template,
  args: {
    layoutProperties: {
      backgroundType: BackgroundType.Solid,
      backgroundColor: 'white',
      backgroundImage: '',
      backgroundPosition: '',
      minHeight: 'screen',
      background: {
        overlay: {
          type: OverlayType.Gradient,
          showOverlay: true,
          opacity: 100,
          isGlass: false,
          solid: {
            colorRGB: '237,221,83',
          },
          gradient: {
            type: GradientType.Radial,
            orientation: GradientOrientationType.Horizontal,
            colorOneRGB: '42,123,155',
            colorTwoRGB: '87,199,133',
            colorThreeRGB: '237,221,83',
          },
        }
      },
    },
    layoutContentProperties: {
      maxWidth: 'auto',
      paddingY: 'py-5',
      paddingX: 'px-0',
      marginY: 'my-0',
      marginX: 'mx-0',
      isContentFullHeight: true,
    },
  },
};

export const LayoutSectionWithGlassEffectAndContentWithSolidOverlay: Story = {
  render: Template,
  args: {
    layoutProperties: {
      backgroundType: BackgroundType.Image,
      backgroundColor: '',
      backgroundImage:
        'https://bidlab.org/sites/default/files/styles/landscape_4x1_2560000_2560x640_100/public/2024-04/IDB-Lab-Forum-Banner-SPA.webp?h=2815bd5e&itok=Men0ltvj',
      backgroundPosition: 'center',
      minHeight: 'screen',
      background: {
        overlay: {
          type: OverlayType.Gradient,
          showOverlay: true,
          opacity: 100,
          isGlass: true,
          solid: {
            colorRGB: '237,221,83',
          },
          gradient: {
            type: GradientType.Linear,
            orientation: GradientOrientationType.Horizontal,
            colorOneRGB: '42,123,155',
            colorTwoRGB: '87,199,133',
            colorThreeRGB: '237,221,83',
          },
        }
      },
    },
    layoutContentProperties: {
      maxWidth: 'auto',
      paddingY: 'py-10',
      paddingX: 'px-10',
      marginY: 'my-0',
      marginX: 'mx-0',
      isContentFullHeight: true,
      background: {
        borderRadius: BorderRadiusType.None,
        image: {
          src: '',
          alt: '',
        },
        youtube: {
          videoId: '',
          autoplay: true,
          mute: true,
          controls: true,
          loop: true,
        },
        overlay: {
          type: OverlayType.Gradient,
          showOverlay: true,
          opacity: 100,
          isGlass: true,
          solid: {
            colorRGB: '150,0,0',
          },
          gradient: {
            type: GradientType.Radial,
            orientation: GradientOrientationType.Horizontal,
            colorOneRGB: '42,123,155',
            colorTwoRGB: '87,199,133',
            colorThreeRGB: '237,221,83',
          },
        }
      },
    },
  },
};
