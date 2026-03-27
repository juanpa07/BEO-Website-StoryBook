import { LitElement, html } from 'lit';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { property, state, query } from 'lit/decorators.js';

import { defineCustomElement } from '@helper/defineCustomElement';
import type {
  MultiSelectProperties,
  MultiSelectOption,
} from '@interfaces/multi-select.interface';

import componentStyles from './cc-multi-select.lit';

export class CcMultiSelect extends LitElement implements MultiSelectProperties {
  static styles: CSSResultGroup = [componentStyles];

  @property({ type: String }) id: string = '';
  @property({ type: String }) name: string = 'multi-select';

  @property({ type: String }) color:
    | 'primary'
    | 'secondary'
    | 'neutral'
    | 'gray-border' = 'neutral';
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: String }) borderRadius:
    | 'rounded'
    | 'rounded-md'
    | 'rounded-lg'
    | 'rounded-full'
    | 'rounded-none' = 'rounded-full';

  @property({ type: Array }) options: MultiSelectOption[] = [];
  @property({ type: String }) placeholder?: string = 'Select options';

  @property({ type: Array }) selectedValues?: string[] = [];

  @property({ type: String }) errorMessage?: string = '';
  @property({ type: Boolean }) required?: boolean = false;

  onChange?: (event: CustomEvent) => void;

  @state() private isOpen: boolean = false;
  @state() private internalSelectedValues: string[] = [];

  @query('.multi-select-wrapper') private wrapperElement?: HTMLElement;

  connectedCallback() {
    super.connectedCallback();

    if (this.selectedValues) {
      this.internalSelectedValues = [...this.selectedValues];
    }

    document.addEventListener('click', this.handleClickOutside);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.handleClickOutside);
    super.disconnectedCallback();
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has('selectedValues')) {
      this.internalSelectedValues = this.selectedValues
        ? [...this.selectedValues]
        : [];
    }
  }

  private getTriggerClasses(): string {
    const classes = [
      'multi-select-trigger',
      `multi-select-trigger--color-${this.color}`,
      `multi-select-trigger--size-${this.size}`,
      `multi-select--radius-${this.borderRadius}`,
    ];

    if (this.isOpen) {
      classes.push('multi-select-trigger--active');
    }

    if (this.errorMessage && this.internalSelectedValues.length === 0) {
      classes.push('multi-select-trigger--error');
    }

    return classes.join(' ');
  }

  private getLabel(optionValue: string): string {
    if (!Array.isArray(this.options)) {
      return '';
    }

    const option = this.options.find((item) => item.value === optionValue);
    return option?.label || '';
  }

  private isChecked(value: string): boolean {
    return this.internalSelectedValues.includes(value);
  }

  private handleCheckboxChange = (e: Event, optionValue: string) => {
    const target = e.target as HTMLInputElement;
    const checked = target.checked;

    if (checked) {
      this.internalSelectedValues = [...this.internalSelectedValues, optionValue];
    } else {
      this.internalSelectedValues = this.internalSelectedValues.filter(
        (val) => val !== optionValue
      );
    }

    const customEvent = new CustomEvent('multi-select-change', {
      detail: {
        name: this.name,
        values: this.internalSelectedValues,
        count: this.internalSelectedValues.length,
      },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(customEvent);
  };

  private toggleDropdown = (e: Event) => {
    e.stopPropagation();
    this.isOpen = !this.isOpen;
  };

  private handleClickOutside = (e: Event) => {
    const path = e.composedPath();

    if (!path.includes(this)) {
      this.isOpen = false;
    }
  };

  private handleDropdownClick = (e: Event) => {
    e.stopPropagation();
  };

  private renderMultipleSelect(): TemplateResult {
    const count = this.internalSelectedValues.length;
    const placeholderText = count > 0
      ? `${this.placeholder} +${count}`
      : this.placeholder;

    return html`
      <div class="multi-select-wrapper">
        <div
          class=${this.getTriggerClasses()}
          @click=${this.toggleDropdown}
          role="button"
          tabindex="0"
          aria-haspopup="listbox"
          aria-expanded=${this.isOpen}
        >
          <span class=${count === 0 ? 'multi-select-placeholder' : ''}>
            ${placeholderText}
          </span>
        </div>

        <ul
          class="multi-select-dropdown"
          ?hidden=${!this.isOpen}
          @click=${this.handleDropdownClick}
          role="listbox"
          aria-multiselectable="true"
        >
          ${this.options.map((option, index) => {
            const checkboxId = `${this.name}-checkbox-${index}`;
            const checked = this.isChecked(option.value);

            return html`
              <li class="multi-select-item" role="option" aria-selected=${checked}>
                <input
                  type="checkbox"
                  id=${checkboxId}
                  name=${this.name}
                  class="multi-select-checkbox"
                  .checked=${checked}
                  @change=${(e: Event) => this.handleCheckboxChange(e, option.value)}
                />
                <label for=${checkboxId} class="multi-select-label">
                  ${option.label}
                </label>
              </li>
            `;
          })}
        </ul>
      </div>
    `;
  }

  private renderErrorMessage(): TemplateResult | null {
    const hasError = this.errorMessage && this.internalSelectedValues.length === 0;

    if (!hasError) {
      return null;
    }

    return html`<span class="error-message">${this.errorMessage}</span>`;
  }

  render(): TemplateResult {
    return html`
      <div class="multi-select-container">
        ${this.renderMultipleSelect()}
        ${this.renderErrorMessage()}
      </div>
    `;
  }
}

defineCustomElement('cc-multi-select', CcMultiSelect);

declare global {
  interface HTMLElementTagNameMap {
    'cc-multi-select': CcMultiSelect;
  }
}
