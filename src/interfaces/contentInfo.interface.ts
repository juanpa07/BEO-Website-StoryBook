import type { LinkProperties } from './link.interface';
import type { AlignItems } from '@enums/alignItems.enum';

export interface ContentInfoProperties {
    image?: unknown;                  // Podrías especificar un tipo más concreto (p. ej. { src: string, alt: string })
    title?: string;
    titleColor?: string;
    titleFontSize?: string;
    titleFontFamily?: string;
    subtitle?: string;
    subtitleColor?: string;
    subtitleFontSize?: string;
    subtitleFontFamily?: string;
    description?: string;
    descriptionColor?: string;
    descriptionFontSize?: string;
    descriptionFontFamily?: string;
    align?: AlignItems;
    links?: LinkProperties[];
}
