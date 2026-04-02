import { LitElement, html, css } from 'lit';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import { defineCustomElement } from '@helper/defineCustomElement';
import type { BannerProperties } from '@interfaces/banner.interface';
import type { BannerContentProperties } from '@interfaces/bannerContent.interface';
import { BackgroundType } from '@enums/backgroundType.enum';

import componentStyles from './cc-banner.lit';

import type { LayoutProperties } from '@interfaces/layout.interface';
import '../../templates/cc-layout-section/cc-layout-section';
import '../../molecules/cc-content-info/cc-content-info';
import '../../molecules/cc-intro-with-multimedia/cc-intro-with-multimedia';
import '../../molecules/cc-content-countdown-image/cc-content-countdown-image';
import { OverlayType } from '@enums/overlayType.enum';
import { GradientType } from '@enums/gradientType.enum';
import { GradientOrientationType } from '@enums/gradientOrientationType.enum';



/*
IMPORTANTE! OJO
se esta unificando y estandarizando la propiedad Background para layoutProperties y layoutContentProperties
para manejar una misma logica de background image, video, y overlay y simplificar la logica del layout-section
*/
export class CcBanner extends LitElement implements BannerProperties {
  static styles: CSSResultGroup = [componentStyles, css``];

  // Properties button
  @property({ type: String }) language: string = 'en';
  @property({ type: String }) bannerHeightOption: string = '';
  @property({ type: String }) bannerVideoURL: string = '';
  @property({ type: String }) bannerContentType: string = '';
  @property({ type: Object }) bannerContent = {} as BannerContentProperties;
  @property({ type: Object }) layout: LayoutProperties = {
    layoutProperties: {
      backgroundType: BackgroundType.Image,
      backgroundColor: 'primary',
      backgroundImage: './MICI-Home-Banner-accountability.jpg',
      backgroundPosition: 'center',
      minHeight: '70vh',
      background: {
        overlay: {
          type: OverlayType.Solid,
          showOverlay: true,
          opacity: 60,
          isGlass: false,
          solid: {
            colorRGB: '0,0,0',
          },
          gradient: {
            type: GradientType.Linear,
            orientation: GradientOrientationType.Horizontal,
            colorOneRGB: '42,123,155',
            colorTwoRGB: '87,199,133',
            colorThreeRGB: '237,221,83',
          },
        },
      },
    },
    layoutContentProperties: {
      maxWidth: 'auto',
      paddingY: 'py-10',
      paddingX: 'px-10',
      marginY: 'my-0',
      marginX: 'mx-0',
      isContentFullHeight: false,
    },
  };

  private renderContentInfo(): TemplateResult {
    const contentInfo = document.createElement('cc-content-info');
    Object.assign(contentInfo, this.bannerContent.contentInfo);
    return html`${contentInfo}`;
  }

  private renderContentInfoWithMultimedia(): TemplateResult {
    const contentInfoWithMultimedia = document.createElement('cc-intro-with-multimedia');
    Object.assign(contentInfoWithMultimedia, this.bannerContent);
    return html`${contentInfoWithMultimedia}`;
  }

  private renderCountdownImage(): TemplateResult {
    const countdownImage = document.createElement('cc-content-countdown-image');
    Object.assign(countdownImage, this.bannerContent.countdownImage);
    return html`${countdownImage}`;
  }

  private renderContentBanner(): TemplateResult {
    switch (this.bannerContentType) {
      case 'contentInfo':
        return this.renderContentInfo();
      case 'contentInfoWithMultimedia':
        return this.renderContentInfoWithMultimedia();
      case 'contentCountdownImage':
        return this.renderCountdownImage();
      // case "countdownBanner":
      //   return this.drawCountdownBanner();
      default:
        return html`Empty banner`;
    }
  }

  render(): TemplateResult {
    return html`
      <cc-layout-section
        .layoutProperties="${this.layout.layoutProperties}"
        .layoutContentProperties="${this.layout.layoutContentProperties}"
      >
        ${this.renderContentBanner()}
      </cc-layout-section>
    `;
  }
}

defineCustomElement('cc-banner', CcBanner);

declare global {
  interface HTMLElementTagNameMap {
    'cc-banner': CcBanner;
  }
}
