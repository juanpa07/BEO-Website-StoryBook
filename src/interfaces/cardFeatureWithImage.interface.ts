import { ImageProperties } from './image.interface';
import { TitleProperties } from './title.interface';
import { DescriptionProperties } from './description.interface';
import { LinkProperties } from './link.interface';

export interface CardFeatureWithImageProperties {
  isVertical?: boolean;
  image?: ImageProperties;
  titleProperties: TitleProperties;
  descriptionProperties: DescriptionProperties;
  link?: LinkProperties;
  align: string;
}
