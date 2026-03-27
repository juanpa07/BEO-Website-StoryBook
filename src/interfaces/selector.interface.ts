/**
 * Interface for Language object
 */
export interface Language {
  code: string;
  label: string;
  selected?: boolean;
}

export interface SelectorProperties {
  languages: Language[];
  currentSelect: string;
  showIcon: boolean
}
