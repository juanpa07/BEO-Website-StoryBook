import { LitElement, html, css } from 'lit';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import { defineCustomElement } from '@helper/defineCustomElement';
import type { IntroWithMultimediaProperties } from '@interfaces/introWithMultimedia.interface';
import type { ContentInfoProperties } from '@interfaces/contentInfo.interface';
import type { MultimediaContent } from '@interfaces/multimediaContent.interface';
import { renderLinkElements } from '@utils/renderLinkElements';

import componentStyles from './cc-intro-with-multimedia.lit';

import '../cc-content-info/cc-content-info';
import '../../atoms/cc-image/cc-image';
import '../cc-youtube-with-thumbnail/cc-youtube-with-thumbnail';
import '../cc-countdown/cc-countdown';

export class CcIntroWithMultimedia extends LitElement implements IntroWithMultimediaProperties {
  static styles: CSSResultGroup = [
    componentStyles,
    css`
      :host {
        box-sizing: border-box;
        height: 100%;
        width: 100%;
      }
      :host *,
      :host *::before,
      :host *::after {
        box-sizing: inherit;
      }
      [hidden] {
        display: none !important;
      }
    `,
  ];

  @property({ type: String }) columnTextSize: string = '50';
  @property({ type: String }) contentTextSize: string = '100';
  @property({ type: String }) isRowReverse: string = 'false';
  @property({ type: Boolean }) isColumnReverse: boolean = false;
  @property({ type: Object }) contentInfo: ContentInfoProperties = {};
  @property({ type: Object }) multimediaContent = {} as MultimediaContent;

  private renderIntroCard(): TemplateResult {
    const contentInfo = document.createElement('cc-content-info');
    Object.assign(contentInfo, this.contentInfo);
    return html`<div class="intro-with-multimedia__introcard-content--size-${this.contentTextSize}">${contentInfo}</div>`;
  }

  private renderImage(): TemplateResult {
    const img = this.multimediaContent.image;
    if (!img?.src) return html``;
    return html`
      <div class="intro-with-multimedia__multimedia--content">
        <cc-image
          src=${img.src}
          alt=${img.alt || ''}
          radius=${img.radius || 'none'}
          .isLazyLoading=${false}
        ></cc-image>
      </div>
    `;
  }

  private renderYoutubeVideo(): TemplateResult {
    const data = this.multimediaContent.youtubeData || {};
    if (!data.videoId) return html``;
    return html`
      <div class="intro-with-multimedia__multimedia--content">
        <cc-youtube-with-thumbnail
          .videoId=${data.videoId}
          .thumbnail=${data.thumbnail}
        ></cc-youtube-with-thumbnail>
      </div>
    `;
  }

  private renderLinks(): TemplateResult {
    if (!this.multimediaContent.links || this.multimediaContent.links.length === 0) {
      return html``;
    }
    return html`<div class="intro-with-multimedia__links">${renderLinkElements(this.multimediaContent.links || [])}</div>`;
  }

  private renderCountdown(): TemplateResult {
    const countdown = document.createElement('cc-countdown');
    Object.assign(countdown, this.multimediaContent.countdown);
    return html`${countdown}`;
  }

  private renderMultimedia(): TemplateResult {
    switch (this.multimediaContent.type) {
      case 'image':
        return this.renderImage();
      case 'video':
        return this.renderYoutubeVideo();
      case 'countdown':
        return this.renderCountdown();
      default:
        return html``;
    }
  }

  render(): TemplateResult {
    return html`
      <div
        class=${[
          'intro-with-multimedia',
          `intro-with-multimedia--isrowreverse-${this.isRowReverse}`,
          `intro-with-multimedia--iscolreverse-${this.isColumnReverse}`,
        ].join(' ')}
      >
        <div
          class=${[
            'intro-with-multimedia__introcard',
            `intro-with-multimedia__introcard--size-${this.columnTextSize}`,
            `intro-with-multimedia__introcard--display-mobile-${this.columnTextSize}`,
          ].join(' ')}
        >
          ${this.renderIntroCard()}
        </div>
        <div
          class=${[
            'intro-with-multimedia__multimedia',
            `intro-with-multimedia__multimedia--size-${this.columnTextSize}`,
            `intro-with-multimedia__multimedia--align-${this.multimediaContent.align}`,
          ].join(' ')}
        >
          ${this.renderMultimedia()}
          ${this.renderLinks()}
        </div>
      </div>
    `;
  }
}

defineCustomElement('cc-intro-with-multimedia', CcIntroWithMultimedia);

declare global {
  interface HTMLElementTagNameMap {
    'cc-intro-with-multimedia': CcIntroWithMultimedia;
  }
}
