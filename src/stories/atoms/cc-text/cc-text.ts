import { LitElement, html } from 'lit';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { defineCustomElement } from '@helper/defineCustomElement';
import type { TextProperties } from '@interfaces/text.interface';

import componentStyles from './cc-text.lit';

export class CcText extends LitElement implements TextProperties {
  static styles: CSSResultGroup = [componentStyles];

  @property({ type: String }) text: string = '';
  @property({ type: String }) color: string = '';
  @property({ type: String }) fontSize: TextProperties['fontSize'] = 'base';
  @property({ type: String }) fontFamily: TextProperties['fontFamily'] = 'open-sans';
  @property({ type: String }) fontStyle: TextProperties['fontStyle'] = 'normal';
  @property({ type: String }) align: TextProperties['align'] = 'left';
  @property({ type: String }) weight: TextProperties['weight'] = 'normal';

  private getClasses(): string {
    return [
      `text--color-${this.color}`,
      `text--size-${this.fontSize}`,
      `text--font-${this.fontFamily}`,
      `text--align-${this.align}`,
      `text--font-style-${this.fontStyle}`,
      `text--weight-${this.weight}`,
    ].join(' ');
  }

  private renderText(): TemplateResult {
    if (!this.text) return html``;

    const classes = this.getClasses();
    const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

    if (headingTags.includes(this.fontSize)) {
      switch (this.fontSize) {
        case 'h1': return html`<h1 class=${classes}>${unsafeHTML(this.text)}</h1>`;
        case 'h2': return html`<h2 class=${classes}>${unsafeHTML(this.text)}</h2>`;
        case 'h3': return html`<h3 class=${classes}>${unsafeHTML(this.text)}</h3>`;
        case 'h4': return html`<h4 class=${classes}>${unsafeHTML(this.text)}</h4>`;
        case 'h5': return html`<h5 class=${classes}>${unsafeHTML(this.text)}</h5>`;
        case 'h6': return html`<h6 class=${classes}>${unsafeHTML(this.text)}</h6>`;
      }
    }

    return html`<p class=${classes}>${unsafeHTML(this.text)}</p>`;
  }

  render(): TemplateResult {
    return this.renderText();
  }
}

defineCustomElement('cc-text', CcText);

declare global {
  interface HTMLElementTagNameMap {
    'cc-text': CcText;
  }
}
