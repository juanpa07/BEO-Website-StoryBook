import type { LayoutProperties } from './layout.interface';
import type { BannerContentProperties } from './bannerContent.interface';

export interface BannerProperties {
  language: string;
  bannerHeightOption: string;
  bannerVideoURL: string;
  bannerContentType: string;
  bannerContent: BannerContentProperties;
  layout: LayoutProperties;
}
