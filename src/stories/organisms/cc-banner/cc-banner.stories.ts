import type { BannerProperties } from '@interfaces/banner.interface';
import { OverlayType } from '@enums/overlayType.enum';
import { BackgroundType } from '@enums/backgroundType.enum';
import { AlignItems } from '@enums/alignItems.enum';
import { MultimediaType } from '@enums/multimediaType.enum';
import { BorderRadiusType } from '@enums/borderRadiusType.enum';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './cc-banner';
import { GradientType } from '@enums/gradientType.enum';
import { GradientOrientationType } from '@enums/gradientOrientationType.enum';

type BannerArgs = Partial<BannerProperties>;

const meta: Meta = {
  title: 'Organisms/Banner',
  tags: ['autodocs'],
  component: 'cc-banner',
  argTypes: {
    bannerHeightOption: {
      default: 'min-h-screen',
      description: 'Attribute to specify the height size of the banner',
      control: {
        type: 'select',
      },
      options: ['min-h-screen', 'min-h-[50vh]', 'h-[70vh]', 'min-h-[90vh]'],
    },
    bannerVideoURL: {
      description: 'Attribute to specify the video of the banner background',
      control: 'text',
    },
    bannerContentType: {
      default: 'introCard',
      description: 'Attribute to specify the kind of the banner content',
      control: {
        type: 'select',
      },
      options: ['introCard', 'introWithMultimedia', 'countdown', 'countdownBanner'],
    },
    bannerContent: {
      description: 'Attribute to specify the content card',
      control: { type: 'object' },
    },
    layout: {
      description: 'Attribute to specify the banner background and content margin',
      control: { type: 'object' },
    },
  },
};

export default meta;

type Story = StoryObj<BannerArgs>;

const Template = (args: BannerArgs) => html`
  <cc-banner
    .bannerHeightOption=${args.bannerHeightOption ?? ''}
    .bannerVideoURL=${args.bannerVideoURL ?? ''}
    .bannerContentType=${args.bannerContentType ?? ''}
    .bannerContent=${args.bannerContent ?? ''}
    .layout=${args.layout ?? ''}
  ></cc-banner>
`;

export const BannerContentInfo: Story = {
  args: {
    bannerVideoURL: '',
    bannerContentType: 'contentInfo',
    layout: {
      layoutProperties: {
        backgroundType: BackgroundType.Image,
        backgroundColor: 'primary',
        backgroundImage: './MICI-Home-Banner-accountability.jpg',
        backgroundPosition: 'center',
        minHeight: '70vh',
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

    bannerContent: {
      isRowReverse: false,
      contentInfo: {
        title: 'Titulo del content info',
        titleColor: 'white',
        titleFontSize: '6xl',
        titleFontFamily: 'open-sans',
        subtitle: 'Image subtitle',
        subtitleColor: 'primary',
        subtitleFontSize: '3xl',
        subtitleFontFamily: 'open-sans',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
        descriptionColor: 'white',
        descriptionFontSize: 'lg',
        descriptionFontFamily: 'open-sans',
        align: 'left',
        buttons: [],
      },
    },

    bannerHeightOption: 'min-h-screen',
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'This is a single banner with content info and primary background color.',
      },
    },
  },
};

export const BannerContentInfoWithGradient: Story = {
  args: {
    bannerVideoURL: '',
    bannerContentType: 'contentInfo',

    layout: {
      layoutProperties: {
        backgroundType: BackgroundType.Image,
        backgroundColor: 'primary',
        backgroundImage: './MICI-Home-Banner-accountability.jpg',
        backgroundPosition: 'center',
        minHeight: '70vh',
        background: {
          overlay: {
            type: OverlayType.Gradient,
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

    bannerContent: {
      isRowReverse: false,
      contentInfo: {
        title: 'Titulo del content info',
        titleColor: 'white',
        titleFontSize: '6xl',
        titleFontFamily: 'open-sans',
        subtitle: 'Image subtitle',
        subtitleColor: 'primary',
        subtitleFontSize: '3xl',
        subtitleFontFamily: 'open-sans',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
        descriptionColor: 'white',
        descriptionFontSize: 'lg',
        descriptionFontFamily: 'open-sans',
        align: 'left',
        buttons: [],
      },
    },

    bannerHeightOption: 'min-h-screen',
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'This is a single banner with content info and primary background color.',
      },
    },
  },
};

export const BannerContentInfoWithMultimediaImage: Story = {
  args: {
    bannerVideoURL: '',
    bannerContentType: 'contentInfoWithMultimedia',
    layout: {
      layoutProperties: {
        backgroundType: BackgroundType.Image,
        backgroundColor: '',
        backgroundImage: './banner-background-blue-marine-with-light.png',
        backgroundPosition: 'center',
        minHeight: '70vh',
        background: {
          overlay: {
            type: OverlayType.Solid,
            showOverlay: false,
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
    bannerContent: {
      isRowReverse: false,
      columnTextSize: '50',
      contentInfo: {
        title: 'Titulo del content info',
        titleColor: 'primary',
        titleFontSize: '7xl',
        titleFontFamily: 'open-sans',
        subtitle: 'Image subtitle',
        subtitleColor: 'white',
        subtitleFontSize: '3xl',
        subtitleFontFamily: 'open-sans',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
        descriptionColor: 'white',
        descriptionFontSize: 'lg',
        descriptionFontFamily: 'open-sans',
        align: 'left',
        buttons: [],
      },
      multimediaContent: {
        type: MultimediaType.Image,
        image: {
          alt: 'Image Summary 2023 Edition',
          radius: 'none',
          src: '/mujer-sonriendo.png',
        },
      },
    },
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'This is a banner with content info and image.',
      },
    },
  },
};

export const BannerContentInfoWithMultimediaVideo: Story = {
  args: {
    bannerVideoURL: '',
    bannerContentType: 'contentInfoWithMultimedia',
    layout: {
      layoutProperties: {
        backgroundType: BackgroundType.Solid,
        backgroundColor: 'white',
        backgroundImage: '',
        backgroundPosition: 'center',
        minHeight: '70vh',
        background: {
          overlay: {
            type: OverlayType.Solid,
            showOverlay: false,
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
    bannerContent: {
      isRowReverse: true,
      columnTextSize: '50',
      contentInfo: {
        title: 'Titulo del content info',
        titleColor: 'primary',
        titleFontSize: 'h2',
        titleFontFamily: 'open-sans',
        subtitle: 'Image subtitle',
        subtitleColor: 'neutral',
        subtitleFontSize: '3xl',
        subtitleFontFamily: 'open-sans',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
        descriptionColor: 'neutral',
        descriptionFontSize: 'lg',
        descriptionFontFamily: 'open-sans',
        align: 'left',
        buttons: [],
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
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'This is a banner with content info and video.',
      },
    },
  },
};

export const BannerContentInfoWithMultimediaImageAndBackgroundVideo: Story = {
  args: {
    bannerVideoURL: '',
    bannerContentType: 'contentInfoWithMultimedia',
    layout: {
      layoutProperties: {
        backgroundType: BackgroundType.Video,
        backgroundColor: '',
        backgroundImage: '',
        backgroundPosition: 'center',
        minHeight: '330',
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
    bannerContent: {
      isRowReverse: false,
      columnTextSize: '50',
      contentInfo: {
        title: 'Titulo del content info',
        titleColor: 'white',
        titleFontSize: 'h2',
        titleFontFamily: 'open-sans',
        subtitle: 'Image subtitle',
        subtitleColor: 'white',
        subtitleFontSize: '3xl',
        subtitleFontFamily: 'open-sans',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
        descriptionColor: 'white',
        descriptionFontSize: 'lg',
        descriptionFontFamily: 'open-sans',
        align: 'left',
        buttons: [],
      },
      multimediaContent: {
        type: MultimediaType.Image,
        image: {
          alt: 'Image Summary 2023 Edition',
          radius: 'none',
          src: '/mujer-sonriendo.png',
        },
      },
    },
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'This is a banner with content info and image.',
      },
    },
  },
};

export const BannerBackgroundVideo: Story = {
  args: {
    bannerVideoURL: '',
    bannerContentType: 'contentInfoWithMultimedia',
    layout: {
      layoutProperties: {
        backgroundType: BackgroundType.Video,
        backgroundColor: '',
        backgroundImage: '',
        backgroundPosition: 'center',
        minHeight: '70vh',
        youtube: {
          videoId: '82Bn8ZCSOKY',
          autoplay: true,
          mute: true,
          controls: false,
          loop: true,
        },
        background: {
          overlay: {
            type: OverlayType.Solid,
            showOverlay: false,
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
    bannerContent: {
      isRowReverse: false,
      columnTextSize: '50',
      contentInfo: {},
      multimediaContent: {
        type: MultimediaType.Image,
        image: {},
      },
    },
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'This is a banner with content info and image.',
      },
    },
  },
};

export const BannerLogoCountdownVertical: Story = {
  args: {
    bannerVideoURL: '',
    bannerContentType: 'contentCountdownImage',
    layout: {
      layoutProperties: {
        backgroundType: BackgroundType.Video,
        backgroundColor: '',
        backgroundImage: '',
        backgroundPosition: 'center',
        minHeight: 'fit',
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
    bannerContent: {
      isRowReverse: false,
      columnTextSize: '50',
      contentInfo: {},
      multimediaContent: {},
      countdownImage: {
        image: {
          src: './GET-Forum.webp',
          alt: 'Get Forum 2025',
          title: 'Get Forum 2025',
          radius: 'none',
        },
        countdown: {
          language: 'fr',
          location: 'Paris / France',
          labelDate: '14 juil. 2025',
          date: '2025-10-31',
          time: '08:00:00',
          timeZone: 'UTC+2',
          color: 'white',
        },
        links: [
          {
            href: 'https://example.com',
            target: '_blank',
            label: 'Primary Link',
            size: 'base',
            radius: 'rounded-lg',
            color: 'primary',
            iconProps: {
              library: 'material',
              name: 'chevron_right',
              size: 'medium',
              position: 'right',
            },
          },
        ],
        align: AlignItems.Start,
      },
    },
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'This is a banner with countdown image content.',
      },
    },
  },
};

export const BannerLogoCountdownHorizontal: Story = {
  args: {
    bannerVideoURL: '',
    bannerContentType: 'contentInfoWithMultimedia',
    layout: {
      layoutProperties: {
        backgroundType: BackgroundType.Video,
        backgroundColor: '',
        backgroundImage: '',
        backgroundPosition: 'center',
        minHeight: '70vh',
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
          },
        },
      },
      layoutContentProperties: {
        maxWidth: 'auto',
        paddingY: 'py-0',
        paddingX: 'px-0',
        marginY: 'my-40',
        marginX: 'mx-0',
        isContentFullHeight: false,
      },
    },
    bannerContent: {
      isRowReverse: false,
      columnTextSize: '50',
      contentInfo: {
        image: { src: "/GET-Forum.webp", alt: "Logo eBFactory", size: "xs" },
        title: "Global Entrepreneurship and Technology for Latin America and the Caribbean",
        titleColor: "white",
        titleFontSize: "h4",
        subtitle: "",
        subtitleFontSize: "h5",
        subtitleColor: "white",
        subtitleFontFamily: "monserrat",
        description: "[IDB Lab Forum is now GET Forum]",
        descriptionColor: "white",
        descriptionFontSize: "lg",
        descriptionFontFamily: "open-sans",
        links: [],
        align: AlignItems.Start,
      },
      multimediaContent: {
        type: MultimediaType.Countdown,
        align: AlignItems.Start,
        countdown: {
          language: 'es',
          location: 'San Salvador',
          locationLink: 'https://goo.gl/maps/xoG2px1tkGKoQKqv7',
          labelDate: 'Nov 30 - Dec 2',
          date: '2025-11-30',
          time: '08:00:00',
          timeZone: 'UTC-6',
          color: 'white',
        },
        links: [{
          href: 'https://getforum.funcapital.com/',
          target: '_blank',
          label: 'REGISTER HERE',
          size: 'large',
          radius: 'rounded-full',
          color: 'gradient-get-2025',
          iconProps: {
            library: 'material',
            name: 'chevron_right',
            size: 'medium',
            position: 'right',
          },
        }],
      },
    },
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'This is a banner with countdown image content.',
      },
    },
  },
};

export const BannerWithContentGlassEffect: Story = {
  args: {
    bannerVideoURL: '',
    bannerContentType: 'contentInfoWithMultimedia',
    layout: {
      layoutProperties: {
        backgroundType: BackgroundType.Image,
        backgroundColor: '',
        backgroundImage: './banner-background-blue-marine-with-light.png',
        backgroundPosition: 'center',
        minHeight: '70vh',
        overlay: {
          type: OverlayType.Solid,
          showOverlay: false,
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
        },
      },
      layoutContentProperties: {
        maxWidth: 'auto',
        paddingY: 'py-10',
        paddingX: 'px-10',
        marginY: 'my-0',
        marginX: 'mx-0',
        isContentFullHeight: false,
        background: {
          borderRadius: BorderRadiusType.None,
          type: BackgroundType.Solid,
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
            type: OverlayType.Solid,
            showOverlay: true,
            opacity: 60,
            isGlass: true,
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
          },
        },
      },
    },
    bannerContent: {
      isRowReverse: false,
      columnTextSize: '50',
      contentInfo: {
        title: 'Banner con Efecto Glass',
        titleColor: 'primary',
        titleFontSize: '7xl',
        titleFontFamily: 'open-sans',
        subtitle: 'Contenido con efecto glass',
        subtitleColor: 'white',
        subtitleFontSize: '3xl',
        subtitleFontFamily: 'open-sans',
        description:
          'Este banner demuestra el efecto glass aplicado al contenido. El efecto crea una capa translúcida que mejora la legibilidad del texto sobre el fondo de imagen.',
        descriptionColor: 'white',
        descriptionFontSize: 'lg',
        descriptionFontFamily: 'open-sans',
        align: 'left',
        buttons: [],
      },
      multimediaContent: {
        type: MultimediaType.Image,
        image: {
          alt: 'Imagen con efecto glass',
          radius: BorderRadiusType.None,
          src: '/mujer-sonriendo.png',
        },
      },
    },
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'Este banner demuestra el efecto glass aplicado al contenido del layout. El efecto glass crea una capa translúcida con blur que mejora la legibilidad del texto sobre el fondo.',
      },
    },
  },
};

export const BannerCaribbeanEquity: Story = {
  args: {
    bannerVideoURL: '',
    bannerContentType: 'contentInfoWithMultimedia',
    layout: {
      layoutProperties: {
        backgroundType: BackgroundType.Solid,
        backgroundColor: '',
        backgroundImage: '',
        backgroundPosition: 'center',
        minHeight: '555',
        background: {
          overlay: {
            type: OverlayType.Gradient,
            showOverlay: true,
            opacity: 100,
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
          },
        },
      },
      layoutContentProperties: {
        maxWidth: 'auto',
        paddingY: 'py-10',
        paddingX: 'px-10',
        marginY: 'my-20',
        marginX: 'mx-0',
        isContentFullHeight: false,
        background: {
          borderRadius: BorderRadiusType.Xl,
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
            type: OverlayType.Solid,
            showOverlay: true,
            opacity: 40,
            isGlass: false,
            solid: {
              colorRGB: '19,15,37',
            },
            gradient: {
              type: GradientType.Linear,
              orientation: GradientOrientationType.DiagonalDown,
              colorOneRGB: '42,123,155',
              colorTwoRGB: '87,199,133',
              colorThreeRGB: '250,173,23',
            },
          }
        },
      },
    },
    bannerContent: {
      isRowReverse: false,
      columnTextSize: '50',
      contentTextSize: '80',
      contentInfo: {
        image: { src: "/caribEquity.webp", alt: "Logo eBFactory", size: "md" },
        title: '',
        titleColor: 'primary',
        titleFontSize: '7xl',
        titleFontFamily: 'open-sans',
        subtitle: '',
        subtitleColor: 'white',
        subtitleFontSize: '3xl',
        subtitleFontFamily: 'open-sans',
        description:
          'A Facility co-funded by the European Union and <span style="text-wrap: nowrap;">IDB Lab</span> to consolidate a Caribbean investment ecosystem for inclusive private sector innovation.',
        descriptionColor: 'white',
        descriptionFontSize: 'xl',
        descriptionFontFamily: 'open-sans',
        align: 'left',
        links: [{
          href: 'https://example.com',
          target: '_blank',
          label: 'Primary Link',
          size: 'base',
          radius: 'rounded-full',
          color: 'yellow',
          iconProps: {
            library: 'material',
            name: 'chevron_right',
            size: 'medium',
            position: 'right',
          },
        }],
      },
      multimediaContent: {
        type: MultimediaType.Image,
        image: {
          alt: 'Imagen con efecto glass',
          radius: BorderRadiusType.None,
          src: '/jovencitaenchat.png',
        },
      },
    },
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'Este banner demuestra el efecto glass aplicado al contenido del layout. El efecto glass crea una capa translúcida con blur que mejora la legibilidad del texto sobre el fondo.',
      },
    },
  },
};