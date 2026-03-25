import type { IconProperties } from "./icon.interface";

export interface LinkProperties {
  href: string;
  target: string;
  rel?: string;
  color: string;
  size: string;
  radius: string;
  label: string;
  backGroundColor?: string;
  iconProps?: IconProperties;
}
