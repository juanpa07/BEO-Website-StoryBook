import { LitElement, html, css } from 'lit';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { defineCustomElement } from '@helper/defineCustomElement';

import componentStyles from './cc-value-description.lit';
import '../../../atoms/cc-icon/cc-icon';
import '../../../atoms/cc-text/cc-text';

export class CcValueDescription extends LitElement {
  static styles: CSSResultGroup = [componentStyles, css``];

  // Card Properties
  @property({ type: String }) value: string = '90%';
  @property({ type: String }) description: string = 'Tasa de retención';
  @property({ type: String }) color: string = 'neutral';
  @property({ type: String }) background: string = 'transparent';

  // Properties icon
  //   @property({ type: Object }) iconProps?: IconProperties;

  private getClasses(): string {
    return [
      'metric-card',
      `metric-card--color-${this.color}`,
      `metric-card--background-${this.background}`,
    ].join(' ');
  }

  render(): TemplateResult {
    return html`
      <div class="${this.getClasses()}">
        <h2 class=${['metric-card__value', `metric-card__value--color-${this.color}`].join(' ')}>
          ${this.value}
        </h2>
        <p class="metric-card__description">${this.description}</p>
      </div>
    `;
  }
}

defineCustomElement('cc-value-description', CcValueDescription);

declare global {
  interface HTMLElementTagNameMap {
    'cc-value-description': CcValueDescription;
  }
}
