/**
 * @fileoverview Content Info Component - A customizable web component for displaying structured content
 * including images, titles, subtitles, descriptions, and links with customizable styling.
 */

import { LitElement, css, html } from 'lit';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { defineCustomElement } from '@helper/defineCustomElement';
import type { renderLinkElements } from '@utils/renderLinkElements.ts';
import { property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import componentStyles from './cc-content-info.lit.ts';
import type { ContentInfoProperties } from '@interfaces/contentInfo.interface';
import type { LinkProperties } from '@interfaces/link.interface';
import type { ImageProperties } from '@interfaces/image.interface';
import type { AlignItems } from '@enums/alignItems.enum';



import '../../atoms/cc-image/cc-image';

/**
 * @class contentInfo
 * @extends {LitElement}
 * @implements {ContentInfoProperties}
 * @description A web component that displays structured content with customizable styling.
 * Supports images, titles, subtitles, descriptions, and links with configurable fonts,
 * colors, and alignments.
 */
export class CcContentInfo extends LitElement implements ContentInfoProperties {
  static styles: CSSResultGroup = [
    componentStyles,
    css`
    :host {
        display: block;
        width: 100%;
      }
    `,
    css`
      
    `
  ];

  // ========== Properties ==========
  @property({ type: Object }) image: ImageProperties = {
    src: '',
    alt: '',
    title: '',
    radius: '',
    isLazyLoading: false,
    size: 'md',
  };
  @property({ type: String }) title: string = '';
  @property({ type: String }) titleColor: string = '';
  @property({ type: String }) titleFontSize: string = '';
  @property({ type: String }) titleFontFamily: string = 'Open Sans';
  @property({ type: String }) subtitle: string = '';
  @property({ type: String }) subtitleColor: string = '';
  @property({ type: String }) subtitleFontSize: string = '';
  @property({ type: String }) subtitleFontFamily: string = 'Open Sans';
  @property({ type: String }) description: string = '';
  @property({ type: String }) descriptionColor: string = '';
  @property({ type: String }) descriptionFontSize: string = 'md';
  @property({ type: String }) descriptionFontFamily: string = 'Open Sans';
  @property({ type: String }) align: AlignItems = AlignItems.Start;
  @property({ type: Boolean }) showLine: boolean = false;
  @property({ type: Object }) links: LinkProperties[] = [];

  // ========== MÉTODOS ==========
  /**
   * Renders text content with specified styling
   * @private
   * @param {Object} params - Text rendering parameters
   * @param {string} [params.text] - The text content to render
   * @param {'title' | 'subtitle'} params.type - Type of text (title or subtitle)
   * @param {string} params.color - Text color
   * @param {string} params.fontSize - Font size tag
   * @param {string} params.fontFamily - Font family to use
   * @returns {TemplateResult} Rendered HTML template
   */
  private renderText({
    text,
    type,
    color,
    fontSize,
    fontFamily,
  }: {
    text?: string;
    type: 'title' | 'subtitle';
    color: string;
    fontSize: string;
    fontFamily: string;
  }): TemplateResult {
    if (!text) {
      return html``;
    }

    const classPrefix = `content-info__${type}--`;
    const classes = [
      `${classPrefix}color-${color}`,
      `${classPrefix}size-${fontSize}`,
      `${classPrefix}font-${fontFamily}`,
      `${classPrefix}align-${this.align}`,
    ].join(' ');

    const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

    // Render usando una función que selecciona el tag manualmente
    if (headingTags.includes(fontSize)) {
      switch (fontSize) {
        case 'h1':
          return html`<h1 class="${classes}">${unsafeHTML(text)}</h1>`;
        case 'h2':
          return html`<h2 class="${classes}">${unsafeHTML(text)}</h2>`;
        case 'h3':
          return html`<h3 class="${classes}">${unsafeHTML(text)}</h3>`;
        case 'h4':
          return html`<h4 class="${classes}">${unsafeHTML(text)}</h4>`;
        case 'h5':
          return html`<h5 class="${classes}">${unsafeHTML(text)}</h5>`;
        case 'h6':
          return html`<h6 class="${classes}">${unsafeHTML(text)}</h6>`;
      }
    }

    // Fallback si no es un heading válido
    return html`<div class="${classes}">${unsafeHTML(text)}</div>`;
  }



  /**
   * Renders the title section
   * @private
   * @returns {TemplateResult} Rendered title template
   */
  private renderTitle() {
    return this.renderText({
      text: this.title,
      type: "title",
      color: this.titleColor,
      fontSize: this.titleFontSize,
      fontFamily: this.titleFontFamily,
    });
  }

  /**
   * Renders the subtitle section
   * @private
   * @returns {TemplateResult} Rendered subtitle template
   */
  private renderSubtitle() {
    return this.renderText({
      text: this.subtitle,
      type: "subtitle",
      color: this.subtitleColor,
      fontSize: this.subtitleFontSize,
      fontFamily: this.subtitleFontFamily,
    });
  }

  /**
   * Renders the description section with custom styling
   * @private
   * @returns {TemplateResult} Rendered description template
   */
  private renderDescription() {
    if (!this.description) {
      return html``;
    }

    const classes = [
      `content-info__description`,
      `content-info__description--color-${this.descriptionColor}`,
      `content-info__description--size-${this.descriptionFontSize}`,
      `content-info__description--font-${this.descriptionFontFamily}`,
      `content-info__description--align-${this.align}`,
    ].join(" ");

    return html`<p class="${classes}">${unsafeHTML(this.description)}</p>`;
  }

  /**
   * Renders the image section if an image object is provided
   * @private
   * @returns {TemplateResult} Rendered image template
   */
  private renderImage() {
    if (!this.image || typeof this.image !== 'object' || !this.image.src) {
      return html``;
    }

    return html`
      <div class="content-info__image content-info__image--size-${this.image.size}">
        <cc-image
          src=${this.image.src}
          alt=${this.image.alt}
          title=${this.image.title}
          radius=${this.image.radius}
        ></cc-image>
      </div>
    `;
  }


  /**
   * Renders the links section using the common renderLinks utility
   * @private
   * @returns {TemplateResult} Rendered links template
   */
  private renderlinks(): TemplateResult {

    if (!this.links || this.links.length === 0) {
      return html``;
    }
    return html`<div class="content-info__links content-info__buttons--align-${this.align}">${renderLinkElements(this.links)}</div>`;
  }

  /**
   * Main render method that composes the complete component structure
   * @returns {TemplateResult} Content info component template
   */
  render(): TemplateResult {
    return html`
      <div
        class="content-info content-info--align-${this.align}"
      >
        ${this.renderImage()}
        ${this.renderTitle()}
        ${this.renderSubtitle()}
        ${this.renderDescription()}
        
       ${this.renderlinks()}
      </div>
    `;
  }
}

defineCustomElement('cc-content-info', CcContentInfo);

declare global {
  interface HTMLElementTagNameMap {
    'cc-content-info': CcContentInfo;
  }
}