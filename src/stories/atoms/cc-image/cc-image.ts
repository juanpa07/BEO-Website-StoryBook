import { defineCustomElement } from '@helper/defineCustomElement';
import { ImageProperties } from '@interfaces/image.interface';
import { LitElement, html, CSSResultGroup } from 'lit';
import { property } from 'lit/decorators.js';
import componentStyles from './cc-image.lit';

export class CcImage extends LitElement implements ImageProperties {
  static styles: CSSResultGroup = [componentStyles];

  @property({ type: String }) src: string = '';
  @property({ type: String }) alt: string = '';
  @property({ type: String }) title: string = '';
  @property({ type: String }) radius: string = 'none';
  @property({ type: Boolean }) isLazyLoading: boolean = true;

  private getClasses(): string {
    return [
      'image',
      `image--radius-${this.radius}`,
    ].join(' ');
  }

  render() {
    return html`
      <img
        src=${this.src}
        alt=${this.alt}
        title=${this.title}
        class=${this.getClasses()}
        loading=${this.isLazyLoading ? 'lazy' : 'eager'}
      />
    `;
  }
}

defineCustomElement('cc-image', CcImage);

declare global {
  interface HTMLElementTagNameMap {
    'cc-image': CcImage;
  }
}
