import type { ContentInfoProperties } from './contentInfo.interface';
import type { MultimediaContent } from './multimediaContent.interface';
import type { ContentCountdownImageProperties } from './contentCountdownImage.interface';

export interface BannerContentProperties {
  columnTextSize?: string;
  isRowReverse: boolean;
  contentInfo: ContentInfoProperties;
  multimediaContent?: MultimediaContent;
  countdownImage?: ContentCountdownImageProperties;
}
