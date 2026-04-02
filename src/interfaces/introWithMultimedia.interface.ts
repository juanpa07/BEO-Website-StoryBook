import { ContentInfoProperties } from "./contentInfo.interface";
import { MultimediaContent } from "./multimediaContent.interface";


export interface IntroWithMultimediaProperties {
  columnTextSize?: string;
  contentTextSize?: string;
  isRowReverse?: string;
  isColReverse?: string;
  isColumnReverse?: boolean;
  contentInfo?: ContentInfoProperties;
  multimediaContent?: MultimediaContent;
}
