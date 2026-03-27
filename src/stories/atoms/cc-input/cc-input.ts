import { defineCustomElement } from '@helper/defineCustomElement';
import type { InputProperties } from '@interfaces/input.interface';
import { LitElement, html } from 'lit';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import componentStyles from './cc-input.lit';

export class CcInput extends LitElement implements InputProperties {
  static styles: CSSResultGroup = [componentStyles];

  @property({ type: String }) id: string = '';
  @property({ type: String }) placeholder: string = 'Your text here...';
  @property({ type: String }) name: string = '';
  @property({ type: String }) value: string = '';
  @property({ type: Boolean }) disabled: boolean = false;

  private handleInputChange(event: InputEvent) {
    const target = event.target as HTMLInputElement;
    const value: string = target.value;
    this.dispatchEvent(
      new CustomEvent('input-changed', {
        detail: { name: this.name, value: value },
      })
    );
  }

  render(): TemplateResult {
    return html`
      <input
        type="text"
        id=${this.id}
        name=${this.name}
        .value=${this.value}
        placeholder=${this.placeholder}
        ?disabled=${this.disabled}
        @input=${this.handleInputChange}
      />
    `;
  }
}

defineCustomElement('cc-input', CcInput);

declare global {
  interface HTMLElementTagNameMap {
    'cc-input': CcInput;
  }
}
