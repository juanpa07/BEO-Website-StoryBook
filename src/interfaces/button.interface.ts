import type { IconProperties } from "./icon.interface";

export interface ButtonProperties {
  color: string;
  size: string;
  radius: string;
  label: string;
  iconProps?: IconProperties;
  onClick?: (event: MouseEvent) => void;
}
