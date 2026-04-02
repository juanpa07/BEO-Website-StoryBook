import { LitElement, html, css } from 'lit';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';

import { defineCustomElement } from '@helper/defineCustomElement';
import type { TextareaProperties } from '@interfaces/textarea.interface';

import componentStyles from './cc-textarea.lit';

export class CcTextarea extends LitElement implements TextareaProperties {
  static styles: CSSResultGroup = [componentStyles,
    css`
        :host {
            display: block;
            width: 100%;
          }
        `
  ];

  // ============================
  // Properties
  // ============================

  @property({ type: String }) id: string = '';
  @property({ type: String }) name: string = 'textarea';

  // Styling
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
    | 'rounded-xl'
    | 'rounded-none' = 'rounded-xl';

  // Textarea props
  @property({ type: String }) placeholder?: string = 'Your text here...';
  @property({ type: String }) value?: string = '';
  @property({ type: Number }) rows?: number = 4;
  @property({ type: Number }) maxLength?: number;
  @property({ type: Boolean }) disabled?: boolean = false;
  @property({ type: Boolean }) readonly?: boolean = false;
  @property({ type: Boolean }) autoResize?: boolean = true;

  // Validation
  @property({ type: String }) errorMessage?: string = '';
  @property({ type: Boolean }) required?: boolean = false;

  // Event handler (can be overridden externally)
  onChange?: (event: CustomEvent) => void;

  // ============================
  // Internal State
  // ============================

  @state() private internalValue: string = '';
  @state() private characterCount: number = 0;

  // ============================
  // Lifecycle Methods
  // ============================

  connectedCallback() {
    super.connectedCallback();

    // Initialize internal value
    if (this.value) {
      this.internalValue = this.value;
      this.characterCount = this.value.length;
    }
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);

    // Sync external value changes to internal state
    if (changedProperties.has('value') && this.value !== undefined) {
      this.internalValue = this.value;
      this.characterCount = this.value.length;
    }
  }

  // ============================
  // Class Generation Methods
  // ============================

  private getTextareaClasses(): string {
    const classes = [
      'textarea',
      `textarea--color-${this.color}`,
      `textarea--size-${this.size}`,
      `textarea--radius-${this.borderRadius}`,
    ];

    if (this.autoResize) {
      classes.push('textarea--auto-resize');
    }

    if (this.disabled) {
      classes.push('textarea--disabled');
    }

    if (this.readonly) {
      classes.push('textarea--readonly');
    }

    // Add error class if error message exists and field is empty (when required)
    if (this.errorMessage && this.required && !this.internalValue) {
      classes.push('textarea--error');
    }

    return classes.join(' ');
  }

  // ============================
  // Event Handlers
  // ============================

  private handleInput = (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    const newValue = target.value;

    // Update internal state
    this.internalValue = newValue;
    this.characterCount = newValue.length;
    this.value = newValue;

    // Dispatch custom event
    const customEvent = new CustomEvent('textarea-change', {
      detail: {
        name: this.name,
        value: newValue,
        characterCount: this.characterCount,
      },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(customEvent);
  };

  // ============================
  // Render Methods
  // ============================

  private renderCharacterCounter(): TemplateResult | null {
    if (!this.maxLength) {
      return null;
    }

    const isNearLimit = this.characterCount >= this.maxLength * 0.9;
    const counterClass = isNearLimit ? 'character-counter character-counter--limit' : 'character-counter';

    return html`
      <span class=${counterClass}>
        ${this.characterCount} / ${this.maxLength}
      </span>
    `;
  }

  private renderErrorMessage(): TemplateResult | null {
    const hasError = this.errorMessage && this.required && !this.internalValue;

    if (!hasError) {
      return null;
    }

    return html`<span class="error-message">${this.errorMessage}</span>`;
  }

  // ============================
  // Main Render
  // ============================

  render(): TemplateResult {
    return html`
      <div class="textarea-container">
        <textarea
          id=${this.id || ''}
          name=${this.name}
          class=${this.getTextareaClasses()}
          placeholder=${this.placeholder || ''}
          rows=${this.rows || 4}
          maxlength=${this.maxLength || ''}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          .value=${this.internalValue}
          @input=${this.handleInput}
          aria-label=${this.placeholder || this.name}
          aria-invalid=${this.errorMessage && this.required && !this.internalValue}
        ></textarea>
        ${this.renderCharacterCounter()}
        ${this.renderErrorMessage()}
      </div>
    `;
  }
}

defineCustomElement('cc-textarea', CcTextarea);

declare global {
  interface HTMLElementTagNameMap {
    'cc-textarea': CcTextarea;
  }
}
