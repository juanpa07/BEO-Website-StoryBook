import { LitElement, html, css } from 'lit';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import { defineCustomElement } from '@helper/defineCustomElement';
import type { ContentCountdownImageProperties } from '@interfaces/contentCountdownImage.interface';
import type { CountdownProperties } from '@interfaces/countdown.interface';
import type { ImageProperties } from '@interfaces/image.interface';
import type { LinkProperties } from '@interfaces/link.interface';

import { AlignItems } from '@enums/alignItems.enum';

import componentStyles from './cc-content-countdown-image.lit';

import '../cc-countdown/cc-countdown';
import '../../atoms/cc-image/cc-image';
import '../../atoms/cc-link/cc-link';

export class CcContentCountdownImage
  extends LitElement
  implements ContentCountdownImageProperties
{
  static styles: CSSResultGroup = [componentStyles, css``];

  // Properties
  @property({ type: String }) language: string = 'es';
  @property({ type: Object }) image: ImageProperties = {};
  @property({ type: Object }) countdown: CountdownProperties = {};
  @property({ type: Array }) links?: LinkProperties[];
  @property({ type: String }) align: AlignItems = AlignItems.Start;

  private renderCountdown(): TemplateResult {
    const countdown = document.createElement('cc-countdown');
    Object.assign(countdown, this.countdown);
    return html`${countdown}`;
  }

  private renderImage(): TemplateResult {
    const image = document.createElement('cc-image');
    Object.assign(image, this.image);
    return html`${image}`;
  }

  private renderlinks(): TemplateResult {
    if (!this.links || this.links.length === 0) {
      return html``; // Retorna vacío si no hay links
    }

    return html`
      ${this.links.map(link => {
        const linkElement = document.createElement('cc-link');
        Object.assign(linkElement, link);
        return html`${linkElement}`;
      })}
    `;
  }

  render(): TemplateResult {
    return html`
      <div class=${[`content-countdown`, `content-countdown--align-${this.align}`].join(' ')}>
        <div class="content-countdown__image">${this.renderImage()}</div>
        ${this.renderCountdown()}
        <div class="content-countdown__links">${this.renderlinks()}</div>
      </div>
    `;
  }
}

defineCustomElement('cc-content-countdown-image', CcContentCountdownImage);

declare global {
  interface HTMLElementTagNameMap {
    'cc-content-countdown-image': CcContentCountdownImage;
  }
}
