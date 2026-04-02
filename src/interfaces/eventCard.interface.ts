import { ContentInfoProperties } from '@interfaces/contentInfo.interface';
import { SectionCardProperties } from '@interfaces/sectionCard.interface';

export interface EventCardProperties {
  contentInfoData: ContentInfoProperties;
  sectionCards: SectionCardProperties[];
}
