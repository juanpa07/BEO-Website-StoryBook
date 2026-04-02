import { LitElement, html, css } from 'lit';
import type { CSSResultGroup } from 'lit';
import { property } from 'lit/decorators.js';
import { defineCustomElement } from '@helper/defineCustomElement';
import componentStyles from './cc-metrics-value-desc-card-grid.lit';

// Importa el card de metricas
import '../../../../molecules/metrics/cc-value-description/cc-value-description';

export class CcMetricsValueDescriptionCardGrid extends LitElement {
  static styles: CSSResultGroup = [
    componentStyles,
    css`
      :host {
        display: block;
      }
    `,
  ];

  @property({ type: Number }) itemsPerRow: number = 3;
  @property({ type: Array }) cards: any[] = [];

  private getGridClass(): string {
    return `grid-container grid-cols-${this.itemsPerRow}`;
  }

  render() {
    return html`
      <div class="${this.getGridClass()}">
        ${this.cards.map(
          card => html`
            <cc-value-description
              .value=${card.value}
              .description=${card.description}
              .color=${card.color}
              .background=${card.background}
            ></cc-value-description>
          `
        )}
      </div>
    `;
  }
}

defineCustomElement('cc-metrics-value-desc-card-grid', CcMetricsValueDescriptionCardGrid);

declare global {
  interface HTMLElementTagNameMap {
    'cc-metrics-value-desc-card-grid': CcMetricsValueDescriptionCardGrid;
  }
}
