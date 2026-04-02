import { LitElement, html, css } from "lit";
import type { CSSResultGroup, TemplateResult } from "lit";
import { property } from "lit/decorators.js";

import { defineCustomElement } from "@helper/defineCustomElement";
import type { ImageProperties } from "@interfaces/image.interface";
import type { TitleProperties } from "@interfaces/title.interface";
import type { DescriptionProperties } from "@interfaces/description.interface";
import type { LinkProperties } from "@interfaces/link.interface";

import type { CardFeatureWithImageProperties } from "@interfaces/cardFeatureWithImage.interface";

import componentStyles from "./cc-card-feature-with-image.lit";
import "../../../../atoms/cc-icon/cc-icon";
import "../../../../atoms/cc-text/cc-text";
import "../../../../atoms/cc-link/cc-link";

//export class IdblabExtButton extends LitElement implements ButtonProperties {
export class CcCardFeatureWithImage
  extends LitElement
  implements CardFeatureWithImageProperties
{
  static styles: CSSResultGroup = [
    componentStyles,
    css`
      :host {
        display: block;
        height: 100%;
      }
    `,
  ];

  @property({ type: Object }) isVertical: boolean = true;
  @property({ type: Object }) image: ImageProperties = {};
  @property({ type: Object }) titleProperties: TitleProperties = {};
  @property({ type: Object }) descriptionProperties: DescriptionProperties = {};
  @property({ type: Object }) link: LinkProperties = {};
  @property({ type: String }) align: string = "left";

  /**
   * Envuelve el contenido en un <a> si link.href existe,
   * o retorna sólo el contenido en caso contrario.
   */
  private wrapWithLink(
    content: TemplateResult,
    linkProps: LinkProperties = this.link,
  ): TemplateResult {
    const { href, target, rel } = linkProps;
    return href
      ? html`<a href=${href} target=${target} rel=${rel}>${content}</a>`
      : content;
  }

  /**
   * Renderiza un texto con las propiedades dadas.
   * @param text Texto a renderizar.
   * @param color Color del texto.
   * @param fontSize Tamaño de la fuente.
   * @param fontFamily Familia de la fuente.
   * @param align Alineación del texto.
   */

  private renderText({
    text,
    color,
    fontSize,
    fontFamily,
    align,
  }: {
    text: string;
    color: string;
    fontSize: string;
    fontFamily: string;
    align: string;
  }): TemplateResult {
    if (!text) return html``;
    return html`
      <cc-text
        text=${text}
        color=${color}
        fontSize=${fontSize}
        fontFamily=${fontFamily}
        align=${align}
      ></cc-text>
    `;
  }

  private renderCardInner(): TemplateResult {
    const { title, titleColor, titleFontSize, titleFontFamily } =
      this.titleProperties;
    const {
      description,
      descriptionColor,
      descriptionFontSize,
      descriptionFontFamily,
    } = this.descriptionProperties;

    return html`
      <div class="card">
        <img class="card__image" src=${this.image.src} alt=${this.image.alt} />
        <div class="p-5">
          <div class="card__title">
            ${this.renderText({
              text: title,
              color: titleColor,
              fontSize: titleFontSize,
              fontFamily: titleFontFamily,
              align: this.align,
            })}
          </div>
          ${this.renderText({
            text: description,
            color: descriptionColor,
            fontSize: descriptionFontSize,
            fontFamily: descriptionFontFamily,
            align: this.align,
          })}
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <div class="features-cards shadow-indigo-500/50 shadow-lg">
        ${this.wrapWithLink(this.renderCardInner(), this.link)}
      </div>
    `;
  }
}

defineCustomElement("cc-card-feature-with-image", CcCardFeatureWithImage);

declare global {
  interface HTMLElementTagNameMap {
    "cc-card-feature-with-image": CcCardFeatureWithImage;
  }
}
