import { LitElement, html, css } from 'lit';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import { defineCustomElement } from '@helper/defineCustomElement';
import type { YoutubeWithThumbnailProperties } from '@interfaces/youtubeWithThumbnail.interface';

import componentStyles from './cc-youtube-with-thumbnail.lit';

import '../../atoms/cc-youtube/cc-youtube';
import '../../atoms/cc-image/cc-image';
import '../../atoms/cc-icon/cc-icon';

export class CcYoutubeWithThumbnail extends LitElement implements YoutubeWithThumbnailProperties {
  static styles: CSSResultGroup = [componentStyles, css``];

  @property({ type: Object }) videoId: string = '';
  @property({ type: Object }) thumbnail: string = '';

  @property({ type: Boolean }) autoplay: boolean = false;
  @property({ type: Boolean }) showThumbnail: boolean = true;
  @property({ type: Boolean }) modestBranding: boolean = false;

  private renderYoutubeVideo(): TemplateResult {
    if (!this.videoId) return html``;
    return html`<cc-youtube .videoId=${this.videoId} .autoplay=${this.autoplay}></cc-youtube>`;
  }

  private renderThumbnail(): TemplateResult {
    if (!this.thumbnail) return html``;
    return html`
      <div
        class="video__thumbnail ${this.showThumbnail && !this.autoplay
          ? ''
          : 'video__thumbnail--hidden'}"
        style="background-image: url('${this.thumbnail}')"
      >
        <div class="video__play-icon">
          <cc-icon library="material" name="play_arrow" size="full"></cc-icon>
        </div>
      </div>
    `;
  }

  render(): TemplateResult {
    return html`
      <div class="video" @click=${this.toggleThumbnail}>
        ${this.renderThumbnail()}
        <div class="video__youtube">${this.renderYoutubeVideo()}</div>
      </div>
    `;
  }

  toggleThumbnail() {
    this.autoplay = true;
    this.showThumbnail = false;
  }
}

defineCustomElement('cc-youtube-with-thumbnail', CcYoutubeWithThumbnail);

declare global {
  interface HTMLElementTagNameMap {
    'cc-youtube-with-thumbnail': CcYoutubeWithThumbnail;
  }
}
