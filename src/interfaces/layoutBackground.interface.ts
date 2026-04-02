import type { YoutubeProperties } from './youtube.interface';
import type { LayoutOverlayProperties, OverlayType } from './layoutOverlay.interface';
import { GradientType } from '@enums/gradientType.enum';
import { GradientOrientationType } from '@enums/gradientOrientationType.enum';
import { BackgroundType } from '@enums/backgroundType.enum';


export interface layoutBackgroundProperties {
  backgroundType: BackgroundType;
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundPosition?: string;
  minHeight: string;
  youtube?: YoutubeProperties;
  overlay?: LayoutOverlayProperties;
  background: {
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
};
