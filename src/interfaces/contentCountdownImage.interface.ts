import type { CountdownProperties } from './countdown.interface';
import type { ImageProperties } from './image.interface';
import type { LinkProperties } from './link.interface';
import { AlignItems } from '@enums/alignItems.enum';

export interface ContentCountdownImageProperties {
  language: string;
  image: ImageProperties;
  countdown: CountdownProperties;
  links?: LinkProperties[];
  align: AlignItems;
}
