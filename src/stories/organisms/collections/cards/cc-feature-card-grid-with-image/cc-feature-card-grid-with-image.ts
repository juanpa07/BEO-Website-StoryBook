import { LitElement, html, css } from 'lit';
import type { CSSResultGroup } from 'lit';
import { property } from 'lit/decorators.js';
import { defineCustomElement } from '@helper/defineCustomElement';
import componentStyles from './cc-feature-card-grid-with-image.lit';

// Importa el card que ya tienes
import '../../../../molecules/cards/features/cc-card-feature-with-image/cc-card-feature-with-image';

export class CcFeatureCardGridWithImage extends LitElement {
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
            <cc-card-feature-with-image
              .isVertical=${card.isVertical}
              .image=${card.image}
              .titleProperties=${card.titleProperties}
              .descriptionProperties=${card.descriptionProperties}
              .link=${card.link}
              .align=${card.align}
            ></cc-card-feature-with-image>
          `
        )}
      </div>
    `;
  }
}

defineCustomElement('cc-feature-card-grid-with-image', CcFeatureCardGridWithImage);

declare global {
  interface HTMLElementTagNameMap {
    'cc-feature-card-grid-with-image': CcFeatureCardGridWithImage;
  }
}
