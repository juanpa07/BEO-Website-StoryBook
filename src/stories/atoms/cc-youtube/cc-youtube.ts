/**
 * © eBFactory S.A.S. Todos los derechos reservados.
 */

/**
 * IdblabExtYoutube
 * -------------
 * Este componente embebe un reproductor de YouTube utilizando un iframe.
 * Las propiedades configurables permiten definir el video a reproducir, así como la
 * configuración de reproducción automática, sonido, bucle, controles y dimensiones del reproductor.
 */

import { defineCustomElement } from '@helper/defineCustomElement';
import type { YoutubeProperties } from "@interfaces/youtube.interface";
import { LitElement, html, css } from "lit";
import type { CSSResultGroup, TemplateResult } from "lit";
import { property } from "lit/decorators.js";
import componentStyles from "./cc-youtube.lit";

/**
 * Decorador de clase que registra el elemento personalizado con el nombre 'cc-youtube'
 */
export class CcYoutube extends LitElement implements YoutubeProperties {


  /**
   * Estilos CSS para el componente
   * ------------------------------
   * Se importan los estilos personalizados y preprocesados del componente y se asignan al array para
   * facilitar la extensión de estilos en caso de ser necesario en el futuro.
   */
  static styles: CSSResultGroup = [
    componentStyles,
    css`
      :host {
        display: block;
      }
    `,
  ];

  /*
  * PROPERTIES:
  * - videoId: Identificador del video de YouTube a mostrar.
  * - autoplay: Indica si el video se reproducirá automáticamente al cargar el componente.
  * - size: Define el tamaño del reproductor.
  * - measurement: Unidad de medida para el tamaño del reproductor (por ejemplo, "%" o "px").
  * - mute: Permite iniciar el video sin sonido.
  * - loop: Configura el video para que se repita en bucle.
  * - controls: Define si se muestran los controles de reproducción.
  */
  @property({ type: String }) videoId: string = "ATGv84uorF4";
  @property({ type: Boolean }) autoplay?: boolean = false;
  @property({ type: Number }) size?: number = 100;
  @property({ type: String }) measurement?: string = "%";
  @property({ type: Boolean }) mute?: boolean = false;
  @property({ type: Boolean }) loop?: boolean = false;
  @property({ type: Boolean }) controls?: boolean = true;
  @property({ type: Boolean }) isBackground?: boolean = false;

  /**
   * Método privado para construir dinámicamente la URL del iframe.
   * Se basa en las propiedades configuradas para formar los parámetros de reproducción.
   *
   * @returns {string} URL del iframe configurada con el video y parámetros correspondientes.
   */
  private getIframeSrc(): string {
    return `https://www.youtube.com/embed/${this.videoId}?autoplay=${this.autoplay ? "1" : "0"
      }&mute=${this.mute ? "1" : "0"}${this.loop ? `&loop=1&playlist=${this.videoId}` : ""
      }&controls=${this.controls ? "1" : "0"}`;
  }

  /**
   * Función encargada de renderizar la plantilla del componente.
   * Se compone de un contenedor que incluye el iframe con el reproductor de YouTube.
   *
   * @returns {TemplateResult} Plantilla HTML que se renderiza en el DOM.
   */
  render(): TemplateResult {
    const viewTypeClass = this.isBackground ? 'youtube-background' : 'youtube-target'
    
    return html`
      <div class=${['youtube', viewTypeClass].join(' ')}>
        <iframe
          src="${this.getIframeSrc()}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    `;
  }
}

defineCustomElement('cc-youtube', CcYoutube);

declare global {
  interface HTMLElementTagNameMap {
    'cc-youtube': CcYoutube;
  }
}
