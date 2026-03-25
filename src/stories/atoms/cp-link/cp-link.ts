import { defineCustomElement } from '@helper/defineCustomElement';
import type { IconProperties } from '@interfaces/icon.interface';
import type { LinkProperties } from '@interfaces/link.interface';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { LitElement, html } from 'lit';
import type { CSSResultGroup, TemplateResult } from "lit";

import { property } from 'lit/decorators.js';

import componentStyles from './cp-link.lit';
import "../cp-icon/cp-icon";


export class CpLink extends LitElement implements LinkProperties {

  static styles: CSSResultGroup = [componentStyles];

  // Properties link
  @property({ type: String }) href: string = '';
  @property({ type: String }) target: string = '';
  @property({ type: String }) rel: string | undefined;
  @property({ type: String }) color: string = 'primary';
  @property({ type: String }) size: string = 'small';
  @property({ type: String }) radius: string = 'rounded';
  @property({ type: String }) label: string = '';

  // Properties icon
  @property({ type: Object }) iconProps?: IconProperties;

  private getClasses(): string {
    const classes = [
      'link',
      `link--color-${this.color}`,
      `link--size-${this.size}`,
      `link--radius-${this.radius}`,
      this.iconProps?.position ? `link--icon-alig-${this.iconProps.position}` : '',
    ];

    if (!this.label) {
      classes.push('link--no-label');
    }

    return classes.join(' ').trim();
  }

  // private renderIcon(): unknown {
  //   if (!this.iconProps?.name) {
  //     return null;
  //   }

  //   return html`
  //     <span class="link__icon" aria-hidden="true">
  //       <idblabext-icon
  //         .library=${this.iconProps.library ?? 'material'}
  //         .name=${this.iconProps.name}
  //         .size=${this.iconProps.size ?? 'small'}
  //         .color=${this.iconProps.color}
  //       ></idblabext-icon>
  //     </span>
  //   `;
  // }

  private renderIcon(): TemplateResult {
    if (!this.iconProps?.name) {
      return html`${this.label}`;
    }

    return html`
      <span class="link--span link--icon-${this.iconProps.position ?? 'right'}">
        <idblabext-icon
          .library=${this.iconProps.library ?? "material"}
          .name=${this.iconProps.name}
          .size=${this.iconProps.size ?? "small"}
          .color=${this.iconProps.color ?? ""}
        ></idblabext-icon>
        ${this.label ? unsafeHTML(this.label) : ''}
      </span>
    `;
  }


  render() {
    const isExternal = this.href.startsWith('http') || this.target === '_blank';
    const relValue = this.rel ?? (isExternal ? 'noopener noreferrer' : undefined);
    const isValidHref = this.href !== '#' && this.href.trim() !== '';

    return html`
      <a
        href=${this.href}
        target=${this.target}
        rel=${relValue ?? ''}
        class=${this.getClasses()}
        role="link"
        aria-label=${this.label || this.href}
        tabindex=${isValidHref ? '0' : '-1'}
      >
      ${this.renderIcon()}
      </a>
    `;
  }
}

defineCustomElement('cp-link', CpLink);

declare global {
  interface HTMLElementTagNameMap {
    'cp-link': CpLink;
  }
}
