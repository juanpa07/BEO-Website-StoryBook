export interface TextareaProperties {
  // Basic props
  id?: string;
  name: string;

  // Styling
  color: 'primary' | 'secondary' | 'neutral' | 'gray-border';
  size: 'small' | 'medium' | 'large';
  borderRadius: 'rounded' | 'rounded-md' | 'rounded-lg' | 'rounded-xl' | 'rounded-none';

  // Textarea props
  placeholder?: string;
  value?: string;
  rows?: number;
  maxLength?: number;
  disabled?: boolean;
  readonly?: boolean;
  autoResize?: boolean;

  // Validation
  errorMessage?: string;
  required?: boolean;

  // Events
  onChange?: (event: CustomEvent) => void;
}
