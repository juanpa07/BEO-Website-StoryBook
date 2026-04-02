import { OverlayType } from "@enums/overlayType.enum";

export interface SolidOverlayProperties {
  colorRGB: string;
}

export interface GradientOverlayProperties {
  type: string;
  orientation: string;
  colorOneRGB: string;
  colorTwoRGB: string;
  colorThreeRGB: string;
}

export interface LayoutOverlayProperties {
  type: OverlayType;
  showOverlay: boolean;
  opacity: number;
  isGlass: boolean;
  solid: SolidOverlayProperties;
  gradient: GradientOverlayProperties;
}
