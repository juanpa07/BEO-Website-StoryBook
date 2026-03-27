

import { action } from 'storybook/actions';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { Language, LanguageSelectorProperties } from '../../../../../interfaces/language-selector.interface';
import './cc-selector';


const sampleLanguages: Language[] = [
  { code: 'en-US', label: 'English (US)', selected: true },
  { code: 'es', label: 'Español' },
  { code: 'pt', label: 'Português' },
  { code: 'fr', label: 'Français' },
];

const meta: Meta<LanguageSelectorProperties> = {
  title: 'Atoms/Selector',
  component: 'cc-selector',
  tags: ['autodocs'],
  argTypes: {
    languages: {
      control: 'object',
      description: 'Array of language objects ({code, label, selected?})',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessibility label for the selector'
    },
    'language-change': {
        action: 'language-change',
        description: 'Fired when a new language is selected.'
    },
    labelColor: {
      control: 'select',
      options: ['primary','secondary','white', 'black'],
  },
    iconProps: {
      control: 'object',
      description: 'Icon properties for the selector',
    },
},
   parameters: {
    actions: {
      handles: ['language-change'],
    },
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<LanguageSelectorProperties>;


const Template = (args: LanguageSelectorProperties) => html`
  <cc-selector
    .languages=${args.languages}
    aria-label=${args.ariaLabel ?? 'Select Language'}
    .iconProps=${args.iconProps}
    .labelColor=${args.labelColor}
    @language-change=${(e: CustomEvent<Language>) => action('language-change')(e.detail)}
  >
  </cc-selector>
`;


export const Default: Story = {
  args: {
    languages: sampleLanguages,
    ariaLabel: 'Choose your language',
    labelColor: 'black',
    iconProps: {
      name: 'keyboard_arrow_down',
      size: 'medium',
      color: 'black',
      library: 'material'
    }
  },
  render: Template,
};


export const SpanishSelected: Story = {
    args: {
        languages: [
            { code: 'en-US', label: 'English (US)' },
            { code: 'es', label: 'Español', selected: true },
            { code: 'pt', label: 'Português' },
        ],
        ariaLabel: 'Selecciona tu idioma',
        labelColor: 'black',
        iconProps: {
            name: 'keyboard_arrow_down',
            size: 'small',
            color: 'black',
            library: 'material'
        }
    },
    render: Template,
};


export const EmptyList: Story = {
    args: {
        languages: [],
        ariaLabel: 'No languages available',
        labelColor: 'black',

    },
    render: Template,
};


export const SingleLanguage: Story = {
    args: {
        languages: [
            { code: 'de', label: 'Deutsch', selected: true }
        ],
        ariaLabel: 'Language',
        labelColor: 'black',

    },
    render: Template,
};
