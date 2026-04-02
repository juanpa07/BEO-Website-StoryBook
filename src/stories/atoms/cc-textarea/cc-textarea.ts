import { LitElement, html, css } from 'lit';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';

import { defineCustomElement } from '@helper/defineCustomElement';
import type { TextareaProperties } from '@interfaces/textarea.interface';

import componentStyles from './cc-textarea.lit';

export class CcTextarea extends LitElement implements TextareaProperties {
  static styles: CSSResultGroup = [
    componentStyles,
    css`
      :host {
        display: block;
        width: 100%;
      }
    `,
  ];

  @property({ type: String }) id: string = '';
  @property({ type: String }) name: string = 'textarea';
  @property({ type: String }) color: TextareaProperties['color'] = 'neutral';
  @property({ type: String }) size: TextareaProperties['size'] = 'medium';
  @property({ type: String }) borderRadius: TextareaProperties['borderRadius'] = 'rounded-xl';
  @property({ type: String }) placeholder?: string = 'Your text here...';
  @property({ type: String }) value?: string = '';
  @property({ type: Number }) rows?: number = 4;
  @property({ type: Number }) maxLength?: number;
  @property({ type: Boolean }) disabled?: boolean = false;
  @property({ type: Boolean }) readonly?: boolean = false;
  @property({ type: Boolean }) autoResize?: boolean = true;
  @property({ type: String }) errorMessage?: string = '';
  @property({ type: Boolean }) required?: boolean = false;

  onChange?: (event: CustomEvent) => void;

  @state() private internalValue: string = '';
  @state() private characterCount: number = 0;

  connectedCallback() {
    super.connectedCallback();
    if (this.value) {
      this.internalValue = this.value;
      this.characterCount = this.value.length;
    }
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('value') && this.value !== undefined) {
      this.internalValue = this.value;
      this.characterCount = this.value.length;
    }
  }

  private getClasses(): string {
    const classes = [
      'textarea',
      `textarea--color-${this.color}`,
      `textarea--size-${this.size}`,
      `textarea--radius-${this.borderRadius}`,
    ];
    if (this.autoResize) classes.push('textarea--auto-resize');
    if (this.disabled) classes.push('textarea--disabled');
    if (this.readonly) classes.push('textarea--readonly');
    if (this.errorMessage && this.required && !this.internalValue) classes.push('textarea--error');
    return classes.join(' ');
  }

  private handleInput = (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    const newValue = target.value;
    this.internalValue = newValue;
    this.characterCount = newValue.length;
    this.value = newValue;
    this.dispatchEvent(
      new CustomEvent('textarea-change', {
        detail: { name: this.name, value: newValue, characterCount: this.characterCount },
        bubbles: true,
        composed: true,
      })
    );
  };

  private renderCharacterCounter(): TemplateResult | null {
    if (!this.maxLength) return null;
    const isNearLimit = this.characterCount >= this.maxLength * 0.9;
    const counterClass = isNearLimit ? 'character-counter character-counter--limit' : 'character-counter';
    return html`<span class=${counterClass}>${this.characterCount} / ${this.maxLength}</span>`;
  }

  private renderErrorMessage(): TemplateResult | null {
    if (!(this.errorMessage && this.required && !this.internalValue)) return null;
    return html`<span class="error-message">${this.errorMessage}</span>`;
  }

  render(): TemplateResult {
    return html`
      <div class="textarea-container">
        <textarea
          id=${this.id || ''}
          name=${this.name}
          class=${this.getClasses()}
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
