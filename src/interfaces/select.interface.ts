export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProperties {
  id?: string;
  name: string;
  color: string;
  size: string;
  borderRadius: string;
  options: SelectOption[];
  placeholder?: string;
  value: string;
  defaultValue?: string;
  onChange?: (event: CustomEvent) => void;
}
