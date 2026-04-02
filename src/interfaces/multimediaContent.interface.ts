import { CountdownProperties } from "./countdown.interface"
import { ImageProperties } from "./image.interface"
import { YoutubeProperties } from "./youtube.interface"
import { MultimediaType } from "../enums/multimediaType.enum"
import { LinkProperties } from './link.interface';
import { AlignItems } from '@enums/alignItems.enum';

export interface MultimediaContent {
  type: MultimediaType;
  youtubeData?: YoutubeProperties;
  tickets?: any[];
  videos?: any[];
  image?: ImageProperties;
  countdown?: CountdownProperties;
  links?: LinkProperties[];
  align?: AlignItems;
}