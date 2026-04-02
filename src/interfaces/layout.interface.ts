import type { layoutBackgroundProperties } from './layoutBackground.interface';
import type { layoutContentProperties } from './layoutContent.interface';

export interface LayoutProperties {
  layoutProperties: layoutBackgroundProperties;
  layoutContentProperties: layoutContentProperties;
}