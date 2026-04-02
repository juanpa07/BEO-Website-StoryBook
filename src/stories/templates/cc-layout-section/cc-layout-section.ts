import { LitElement, html, css } from "lit";
import type { CSSResultGroup, TemplateResult } from "lit";
import { property } from "lit/decorators.js";
import { defineCustomElement } from "@helper/defineCustomElement";
import componentStyles from "./cc-layout-section.lit";
import type { layoutBackgroundProperties } from "@interfaces/layoutBackground.interface";
import { OverlayType } from "@enums/overlayType.enum";
import { BorderRadiusType } from "@enums/borderRadiusType.enum";
import { BackgroundType } from "@enums/backgroundType.enum";

import type { layoutContentProperties } from "@interfaces/layoutContent.interface";

import "../../atoms/cc-youtube/cc-youtube";
import { GradientType } from "@enums/gradientType.enum";
import { GradientOrientationType } from "@enums/gradientOrientationType.enum";

export class CcLayoutSection extends LitElement {
  static styles: CSSResultGroup[] = [
    componentStyles,
    css`
      :host {
        box-sizing: border-box;
        display: block;
        width: 100%;
        height: 100%;
      }
      :host *,
      :host *::before,
      :host *::after {
        box-sizing: border-box;
      }
      [hidden] {
        display: none !important;
      }
    `,
  ];

  @property({ type: Object }) layoutProperties: layoutBackgroundProperties = {
    backgroundType: BackgroundType.Solid,
    backgroundColor: "",
    backgroundImage: "",
    backgroundPosition: "center",
    minHeight: "fit",
    youtube: {
      videoId: "",
      autoplay: true,
      mute: false,
      controls: false,
      loop: true,
    },
    background: {
      overlay: {
        type: OverlayType.Solid,
        showOverlay: true,
        opacity: 50,
        isGlass: false,
        solid: {
          colorRGB: "255,255,255",
        },
        gradient: {
          type: GradientType.Linear,
          orientation: GradientOrientationType.Horizontal,
          colorOneRGB: "255,255,255",
          colorTwoRGB: "255,255,255",
          colorThreeRGB: "255,255,255",
        },
      },
    },
  };

  @property({ type: Object }) layoutContentProperties: layoutContentProperties =
    {
      maxWidth: "auto",
      paddingY: "py-10",
      paddingX: "px-0",
      marginY: "my-0",
      marginX: "mx-0",
      isContentFullHeight: false,
      background: {
        borderRadius: BorderRadiusType.None,
        image: {
          src: "",
          alt: "",
        },
        youtube: {
          videoId: "",
          autoplay: true,
          mute: true,
          controls: true,
          loop: true,
        },
        overlay: {
          type: OverlayType.Solid,
          showOverlay: true,
          opacity: 50,
          isGlass: false,
          solid: {
            colorRGB: "255,255,255",
          },
          gradient: {
            type: GradientType.Linear,
            orientation: GradientOrientationType.Horizontal,
            colorOneRGB: "255,255,255",
            colorTwoRGB: "255,255,255",
            colorThreeRGB: "255,255,255",
          },
        },
      },
    };

  /**
   * Renderiza el video de fondo si el tipo de fondo es 'Video'.
   * @returns {TemplateResult} Elemento HTML del video de fondo.
   */
  private renderBackgroundVideo(): TemplateResult {
    if (
      this.layoutProperties.backgroundType !== BackgroundType.Video ||
      !this.layoutProperties.youtube
    )
      return html``; // Si no es tipo 'video' o no existe la propiedad 'youtube' en el objeto.

    const { videoId, autoplay, loop, measurement, mute, controls, size } =
      this.layoutProperties.youtube;

    return html`
      <div class="layout-section__background-video">
        <cc-youtube
          .videoId=${videoId}
          .autoplay=${autoplay}
          .loop=${loop}
          .measurement=${measurement}
          .mute=${mute}
          .controls=${controls}
          .size=${size}
          .isBackground=${true}
          style="height: inherit;"
        ></cc-youtube>
      </div>
    `;
  }

  /**
   * Renderiza la imagen de fondo si el tipo de fondo es 'Image'.
   * @returns {TemplateResult} Elemento HTML de la imagen de fondo.
   */
  private renderBackgroundImage(): TemplateResult {
    if (this.layoutProperties.backgroundType !== BackgroundType.Image)
      return html``; // Si no es tipo 'image'

    const { backgroundImage, backgroundPosition, backgroundType } =
      this.layoutProperties;

    const isBackgroundImage = backgroundType === BackgroundType.Image;
    const backgroundStyle = isBackgroundImage
      ? `background-image: url(${backgroundImage}); background-size: cover; background-position: ${backgroundPosition};`
      : "";

    return html`<div
      style="${backgroundStyle}"
      class="layout-section__background-image"
    ></div> `;
  }

  /**
   * Renderiza la superposición sólida si está configurada.
   * @returns {TemplateResult} Elemento HTML de la superposición sólida.
   */
  private renderOverlaySolid(
    block: string,
    opacity: number,
    isGlass: boolean,
    solid: { colorRGB: string },
    borderRadius: BorderRadiusType,
  ): TemplateResult {
    // Check if solid is defined and has colorRGB property
    if (!solid || !solid.colorRGB) {
      return html``;
    }

    const blockClass =
      block != "content"
        ? "layout-section__overlay"
        : "layout-section__content--overlay";
    return html`
      <div
        class=${[
          blockClass,
          `${blockClass}-solid-opacity-${opacity}`,
          isGlass ? `${blockClass}-solid-glass` : `${blockClass}-solid`,
          `${blockClass}-border-radius-${borderRadius}`,
        ].join(" ")}
        style="--color: ${solid.colorRGB}"
      ></div>
    `;
  }

  /**
   * Renderiza la superposición sólida si está configurada.
   * @returns {TemplateResult} Elemento HTML de la superposición sólida.
   */
  private renderOverlayGradient(
    block: string,
    opacity: number,
    isGlass: boolean,
    gradient: {
      type: GradientType;
      colorOneRGB: string;
      colorTwoRGB: string;
      colorThreeRGB: string;
      orientation: GradientOrientationType;
    },
    borderRadius: BorderRadiusType,
  ): TemplateResult {
    // Check if gradient is defined and has required properties
    if (
      !gradient ||
      !gradient.colorOneRGB ||
      !gradient.colorTwoRGB ||
      !gradient.type ||
      !gradient.orientation
    ) {
      return html``;
    }

    const blockClass =
      block != "content"
        ? "layout-section__overlay"
        : "layout-section__content--overlay";

    return html`
      <div
        class=${[
          blockClass,
          `${blockClass}-gradient-opacity-${opacity}`,
          isGlass
            ? `${blockClass}-${gradient.type}-gradient-glass`
            : `${blockClass}-${gradient.type}-gradient`,
          `layout-section__content--border-radius-${borderRadius}`,
        ].join(" ")}
        style="--color-one: ${gradient.colorOneRGB}; --color-two: ${gradient.colorTwoRGB}; --color-three: ${gradient.colorThreeRGB}; --gradient-angle: ${gradient.orientation};"
      ></div>
    `;
  }

  /**
   * Renderiza el fondo según el tipo configurado (imagen o video).
   * @returns {TemplateResult} Elemento HTML del fondo.
   */
  private renderBackgroundType(): TemplateResult {
    switch (this.layoutProperties.backgroundType) {
      case BackgroundType.Image:
        return this.renderBackgroundImage();
      case BackgroundType.Video:
        return this.renderBackgroundVideo();
      default:
        return html``;
    }
  }

  /**
   * Determina y renderiza la superposición según el tipo configurado.
   * @returns {TemplateResult} Elemento HTML de la superposición.
   */
  private renderLayoutOverlay(): TemplateResult {
    if (!this.layoutProperties.background?.overlay?.showOverlay) return html``;

    const { type, opacity, isGlass, solid, gradient } =
      this.layoutProperties.background.overlay;

    switch (type) {
      case OverlayType.Solid:
        return this.renderOverlaySolid(
          "layout",
          opacity,
          isGlass,
          solid,
          BorderRadiusType.None,
        );
      case OverlayType.Gradient:
        return this.renderOverlayGradient(
          "layout",
          opacity,
          isGlass,
          gradient,
          BorderRadiusType.None,
        );
      default:
        return html``;
    }
  }

  /**
   * Renderiza el overlay (solid o gradient) para el contenido dentro del layout si está configurado.
   * @returns {TemplateResult} Elemento HTML del overlay.
   */
  private renderContentOverlay(): TemplateResult {
    if (!this.layoutContentProperties.background?.overlay?.showOverlay)
      return html``;

    const { type, opacity, isGlass, solid, gradient } =
      this.layoutContentProperties.background.overlay;

    switch (type) {
      case OverlayType.Solid:
        return this.renderOverlaySolid(
          "content",
          opacity,
          isGlass,
          solid,
          this.layoutContentProperties.background?.borderRadius,
        );
      case OverlayType.Gradient:
        return this.renderOverlayGradient(
          "content",
          opacity,
          isGlass,
          gradient,
          this.layoutContentProperties.background?.borderRadius,
        );
      default:
        return html``;
    }
  }

  /**
   * Renderiza la estructura principal de la sección de layout.
   * @returns {TemplateResult} Estructura HTML de la sección.
   */
  render(): TemplateResult {
    const { backgroundColor } = this.layoutProperties;
    const { minHeight } = this.layoutProperties;
    const {
      maxWidth,
      paddingY,
      paddingX,
      marginY,
      marginX,
      isContentFullHeight,
    } = this.layoutContentProperties;

    return html`
      <section
        class=${[
          "layout-section",
          `layout-section--height-${minHeight}`,
          `layout-section--bgcolor-${backgroundColor}`,
        ].join(" ")}
      >
        ${this.renderLayoutOverlay()} ${this.renderBackgroundType()}
        <div
          class=${[
            "layout-section__content",
            `layout-section__content--max-width-${maxWidth}`,
            `layout-section__content--${paddingY}`,
            `layout-section__content--${paddingX}`,
            `layout-section__content--${marginY}`,
            `layout-section__content--${marginX}`,
            `layout-section__content--full-height-${isContentFullHeight}`,
          ].join(" ")}
        >
          <div
            class=${[
              "layout-section__content-slot",
              `layout-section__content-slot--border-radius-${this.layoutContentProperties.background?.borderRadius}`,
            ].join(" ")}
          >
            ${this.renderContentOverlay()}
            <slot class="h-full"></slot>
          </div>
        </div>
      </section>
    `;
  }
}

defineCustomElement("cc-layout-section", CcLayoutSection);

declare global {
  interface HTMLElementTagNameMap {
    "cc-layout-section": CcLayoutSection;
  }
}
