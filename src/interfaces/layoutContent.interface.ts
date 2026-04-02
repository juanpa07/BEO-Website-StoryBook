import type { OverlayType } from '@interfaces/layoutOverlay.interface';
import type { BorderRadiusType } from '@enums/borderRadiusType.enum';
import type { GradientType } from '@enums/gradientType.enum';
import type { GradientOrientationType } from '@enums/gradientOrientationType.enum';

export interface layoutContentProperties {
  minHeight?: string;
  maxWidth: string;
  paddingY: string;
  paddingX: string;
  marginY: string;
  marginX: string;
  isContentFullHeight: boolean;
  background?: {
    borderRadius: BorderRadiusType;
    image: {
      src: string;
      alt: string;
    };
    youtube: {
      videoId: string;
      autoplay: boolean;
      mute: boolean;
      controls: boolean;
      loop: boolean;
    };
    overlay: {
      type: OverlayType;
      showOverlay: boolean;
      opacity: number;
      isGlass: boolean;
      solid: {
        colorRGB: string;
      };
      gradient: {
        type: GradientType;
        orientation: GradientOrientationType;
        colorOneRGB: string;
        colorTwoRGB: string;
        colorThreeRGB: string;
      };
    };
  };
}