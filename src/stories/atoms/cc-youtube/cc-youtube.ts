import { LitElement, html } from 'lit';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import { defineCustomElement } from '@helper/defineCustomElement';

import componentStyles from './cc-youtube.lit';

export class CcYoutube extends LitElement {
  static styles: CSSResultGroup = [componentStyles];

  @property({ type: String }) videoId: string = '';
  @property({ type: Boolean }) autoplay: boolean = false;

  render(): TemplateResult {
    if (!this.videoId) return html``;

    const src = `https://www.youtube.com/embed/${this.videoId}?autoplay=${this.autoplay ? 1 : 0}&enablejsapi=1`;

    return html`
      <iframe
        class="youtube__iframe"
        src=${src}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    `;
  }
}

defineCustomElement('cc-youtube', CcYoutube);

declare global {
  interface HTMLElementTagNameMap {
    'cc-youtube': CcYoutube;
  }
}
