
import { defineCustomElement } from '@helper/defineCustomElement';
import { LitElement, html } from 'lit';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import componentStyles from './cc-text.lit';

export class CcText extends LitElement {
  static styles: CSSResultGroup = [componentStyles];

  @property({ type: String }) text = '';
  @property({ type: String }) color = '';
  @property({ type: String }) fontSize = '';
  @property({ type: String }) fontFamily = 'open-sans';
  @property({ type: String }) fontStyle = 'normal';
  @property({ type: String }) align: 'left' | 'center' | 'right' = 'left';
  @property({ type: String }) weight: 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black' = 'normal';




  private renderText(): TemplateResult {
    if (!this.text) {
      return html``;
    }

    const classes = [
      `text--color-${this.color}`,
      `text--size-${this.fontSize}`,
      `text--font-${this.fontFamily}`,
      `text--align-${this.align}`,
      `text--font-style-${this.fontStyle}`,
      `text--weight-${this.weight}`,
    ].join(' ');

    const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

    // Render usando una función que selecciona el tag manualmente
    if (headingTags.includes(this.fontSize)) {
      switch (this.fontSize) {
        case 'h1':
          return html`<h1 class="${classes}">${unsafeHTML(this.text)}</h1>`;
        case 'h2':
          return html`<h2 class="${classes}">${unsafeHTML(this.text)}</h2>`;
        case 'h3':
          return html`<h3 class="${classes}">${unsafeHTML(this.text)}</h3>`;
        case 'h4':
          return html`<h4 class="${classes}">${unsafeHTML(this.text)}</h4>`;
        case 'h5':
          return html`<h5 class="${classes}">${unsafeHTML(this.text)}</h5>`;
        case 'h6':
          return html`<h6 class="${classes}">${unsafeHTML(this.text)}</h6>`;
      }
    }

    // Fallback si no es un heading válido
    return html`<p class="${classes}">${unsafeHTML(this.text)}</p>`;
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
