import { defineCustomElement } from '@helper/defineCustomElement';
import { LitElement, html, css } from 'lit';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import '../../../../molecules/cc-content-info/cc-content-info.ts';
import '../../../../atoms/cc-image/cc-image.ts';
import componentStyles from './cc-sponsors-group-with-image.lit.ts';

interface sponsorGroupProperties {
  title: string;
  titleFontSize: string;
  titleColor: string;
}

interface sponsorsProperties {
  name: string;
  image: string;
  link: string;
  title?: string;
  alt?: string;
}

// Converter para parsear JSON desde atributos HTML
const jsonConverter = {
  fromAttribute: (value: string | null) => {
    if (!value) return null;
    try {
      return JSON.parse(value);
    } catch (e) {
      console.error('Error parsing JSON:', e, value);
      return null;
    }
  },
  toAttribute: (value: any) => {
    return JSON.stringify(value);
  }
};

export class CcSponsorsGridWithImage extends LitElement {
  static styles: CSSResultGroup[] = [
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

  @property({ type: Object, converter: jsonConverter }) contentInfo: sponsorGroupProperties = {
    title: '',
    titleFontSize: '',
    titleColor: '',
  };

  @property({ type: Number }) itemsPerRow: number = 4; // Valor por defecto, pero dinámico
  @property({ type: Array, converter: jsonConverter }) sponsors: Array<sponsorsProperties> = [];
  @property({ type: String }) sponsorDesign: string = 'none';
  @property({ type: Boolean }) hasSponsorsName: boolean = false;
  @property({ type: String }) sponsorsNameColor: string = 'black';

  isValidURL(str: string): boolean {
    try {
      new URL(str);
      return true;
    } catch (e) {
      return false;
    }
  }

  private renderIntroCard(): TemplateResult {
    const intro = this.contentInfo;
    if (!intro || Object.keys(intro).length === 0 || !intro.title) {
      return html``;
    }

    return html`
      <div class="sponsors-section__title">
        <idblabext-content-info
          title=${intro.title}
          titleFontSize=${intro.titleFontSize}
          titleColor=${intro.titleColor}
          align=${'center'}
        ></idblabext-content-info>
      </div>
    `;
  }

  private renderName(name: string): TemplateResult {
    if (!this.hasSponsorsName) {
      return html``;
    }

    return html`
        <idblabext-content-info
          align=${'center'}
          subtitle=${name}
          subtitleColor=${this.sponsorsNameColor}
          subtitleFontSize="lg"
          subtitleFontFamily="open-sans"
        ></idblabext-content-info>
    `;
  }

  renderSponsor(sponsor: sponsorsProperties) {
    if (!sponsor.image) {
      return html``;
    }
    const flexItemClass = this.sponsors.length === 1 ? 'flex-item-single' : 'flex-item-multiple';

    return html`
      <div
        class=${[
          'sponsor-card',
          'flex-item',
          flexItemClass,
          `sponsor-card--style-${this.sponsorDesign}`,
          `sponsor-card--name-false`,
          this.isValidURL(sponsor.link) ? 'sponsor-card-link' : '',
        ].join(' ')}
      >
        ${this.isValidURL(sponsor.link)
          ? html`
              <a href="${sponsor.link}" target="_blank" class="block">
                <idblabext-image
                  src=${sponsor.image}
                  alt=${sponsor.name}
                  title=${sponsor.title}
                  radius="rounded-none"
                  class="object-cover"
                ></idblabext-image>
              </a>
            `
          : html`
              <idblabext-image
                src=${sponsor.image}
                alt=${sponsor.name}
                title=${sponsor.title}
                radius="rounded-none"
                class="object-cover"
              ></idblabext-image>
            `}
      </div>
    `;
  }

  render(): TemplateResult {
    if (!this.sponsors || this.sponsors.length === 0) {
      return html`<p class="text-center text-gray-500">No hay patrocinadores disponibles.</p>`;
    }

    // Validar itemsPerRow para evitar valores no válidos
    const columns = this.itemsPerRow > 0 ? this.itemsPerRow : 4;

    return html`
      <div class="sponsors-section">
        ${this.renderIntroCard()}
        <div class="sponsors-grid" style="--columns: ${columns}">
          ${this.sponsors.map(sponsor => this.renderSponsor(sponsor))}
        </div>
      </div>
    `;
  }
}

defineCustomElement('cc-sponsors-group-with-image', CcSponsorsGridWithImage);

declare global {
  interface HTMLElementTagNameMap {
    'cc-sponsors-group-with-image': CcSponsorsGridWithImage;
  }
}
