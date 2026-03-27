import { LitElement, html } from 'lit';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import { defineCustomElement } from '@helper/defineCustomElement';
import type { SelectProperties, SelectOption } from '@interfaces/select.interface';

import componentStyles from './cc-select.lit';
import "../cc-icon/cc-icon";


export class CcSelect extends LitElement implements SelectProperties {
  static styles: CSSResultGroup = [componentStyles];

  // Properties
  @property({ type: String }) id: string = "";
  @property({ type: String }) name: string = "select-field";
  @property({ type: String }) color: string = "neutral";
  @property({ type: String }) size: string = "medium";
  @property({ type: String }) borderRadius: string = "rounded-full";
  @property({ type: Array }) options: SelectOption[] = [];
  @property({ type: String }) placeholder?: string = "Select an option";
  @property({ type: String }) value: string = "";
  @property({ type: String }) defaultValue?: string = "";

  // Event handler
  onChange: (event: CustomEvent) => void = (event: CustomEvent) => {
    // This will be overridden by external listeners
  };

  connectedCallback() {
    super.connectedCallback();
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
  }

  private getClasses(): string {
    const classes = [
      "select",
      `select--color-${this.color}`,
      `select--size-${this.size}`,
      `select--radius-${this.borderRadius}`,
    ];

    return classes.join(" ");
  }

  private getLabel(optionValue: string): string {
    if (!Array.isArray(this.options)) {
      return "";
    }
    const option = this.options.find((item) => {
      if (typeof item === 'string') return item === optionValue;
      return item.value === optionValue;
    });
    if (typeof option === 'string') return option;
    return option?.label || "";
  }

  private handleChange = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    const selectedValue = target.value;
    const label = this.getLabel(selectedValue);

    // Update internal value
    this.value = selectedValue;

    // Dispatch custom event
    const customEvent = new CustomEvent("select-change", {
      detail: {
        name: this.name,
        value: selectedValue,
        label: label,
      },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(customEvent);
  };

  render(): TemplateResult {
    const currentValue = this.value || this.defaultValue || "";
    const hasValue = currentValue !== "";
    const optionsList = Array.isArray(this.options) ? this.options : [];

    return html`
      <select
        id=${this.id || ""}
        name=${this.name}
        class=${this.getClasses()}
        @change=${this.handleChange}
      >
        ${this.placeholder
          ? html`<option value="" ?disabled=${true} ?selected=${!hasValue}>
              ${this.placeholder}
            </option>`
          : null}
        ${optionsList.map((option) => {
          const optionValue = typeof option === "string" ? option : option.value;
          const optionLabel = typeof option === "string" ? option : option.label;
          const isSelected = currentValue === optionValue;

          return html`
            <option value=${optionValue} ?selected=${isSelected}>
              ${optionLabel}
            </option>
          `;
        })}
      </select>
    `;
  }
}

defineCustomElement("cc-select", CcSelect);

declare global {
  interface HTMLElementTagNameMap {
    "cc-select": CcSelect;
  }
}
