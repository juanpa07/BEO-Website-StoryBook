import { LitElement, html } from 'lit';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import { defineCustomElement } from '@helper/defineCustomElement';
import type { AlertProperties } from '@interfaces/alert.interface';

import componentStyles from './cc-alert-with-content.lit';

import '../cc-icon/cc-icon';

export class CcAlertWithContent extends LitElement implements AlertProperties {
  static styles: CSSResultGroup = [componentStyles];

  @property({ type: String }) title: string = 'test warning';
  @property({ type: String }) type: string = 'info';
  @property({ type: String }) description: string = 'test description';

  render(): TemplateResult {
    return html`
      <div class=${['alert', `alert--color-${this.type}`].join(' ')} role="alert">
        <div class="alert__header">
          <cc-icon library="material" name="warning" size="medium"></cc-icon>
          <span class="sr-only">Info</span>
          <h3 class="alert__title">${this.title}</h3>
        </div>
        <div class="alert__description">${this.description}</div>
      </div>
    `;
  }
}

defineCustomElement('cc-alert-with-content', CcAlertWithContent);

declare global {
  interface HTMLElementTagNameMap {
    'cc-alert-with-content': CcAlertWithContent;
  }
}
