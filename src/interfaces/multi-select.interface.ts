export interface MultiSelectOption {
  label: string;
  value: string;
}

export interface MultiSelectProperties {
  // Basic props
  id: string;
  name: string;

  // Styling
  color: 'primary' | 'secondary' | 'neutral' | 'gray-border';
  size: 'small' | 'medium' | 'large';
  borderRadius: 'rounded' | 'rounded-md' | 'rounded-lg' | 'rounded-full' | 'rounded-none';

  // Data
  options: MultiSelectOption[];
  placeholder?: string;

  // Multiple select (always)
  selectedValues?: string[];

  // Validation
  errorMessage?: string;
  required?: boolean;

  // Events
  onChange?: (event: CustomEvent) => void;
}
