export interface IconProperties {
  name: string;
  library?: "material" | "custom" | "material-symbols";
  size?: 'small' | 'medium' | 'large' | 'full' | string;
  color?: string;
  fill?: 0 | 1;
  position?: "left" | "right";
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
  grade?: -25 | 0 | 200;
}