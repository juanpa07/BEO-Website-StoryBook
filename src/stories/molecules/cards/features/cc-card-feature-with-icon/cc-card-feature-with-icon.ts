import { LitElement, html, css } from 'lit';
import type { CSSResultGroup } from 'lit';
import { property } from 'lit/decorators.js';

import { defineCustomElement } from '@helper/defineCustomElement';
//import { ButtonProperties } from "@interfaces/button.interface";
import type { IconProperties } from '@interfaces/icon.interface';

import componentStyles from './cc-card-feature-with-icon.lit';
import '../../../../atoms/cc-icon/cc-icon';

//export class IdblabExtButton extends LitElement implements ButtonProperties {
export class CcCardFeatureWithIcon extends LitElement {
  static styles: CSSResultGroup = [componentStyles, css``];

  // Properties button
  //   @property({ type: String }) color: string = "primary";
  //   @property({ type: String }) size: string = "small";
  //   @property({ type: String }) radius: string = "rounded";
  //   @property({ type: String }) label: string = "Button";

  // Properties icon
  //   @property({ type: Object }) iconProps?: IconProperties;

  // Properties event
  //   onClick: (event: MouseEvent) => void = (event: MouseEvent) => {
  //     this.dispatchEvent(
  //       new CustomEvent("button-click", {
  //         detail: { event },
  //         bubbles: true,
  //         composed: true,
  //       })
  //     );
  //   };

  //   private getClasses(): string {
  //     return [
  //       "button",
  //       `button--color-${this.color}`,
  //       `button--size-${this.size}`,
  //       `button--radius-${this.radius}`,
  //     ].join(" ");
  //   }

  //   private renderIcon(): TemplateResult {
  //     if (!this.iconProps?.name) {
  //       return html`${this.label}`;
  //     }

  //     return html`
  //       <span class="button--span button--icon-${this.iconProps.position ?? 'right'}">
  //         <idblabext-icon
  //           .library=${this.iconProps.library ?? "material"}
  //           .name=${this.iconProps.name}
  //           .size=${this.iconProps.size ?? "small"}
  //           .color=${this.iconProps.color ?? ""}
  //         ></idblabext-icon>
  //         ${this.label}
  //       </span>
  //     `;
  //   }

  //   private renderCard(): TemplateResult {
  //     if (!this.iconProps?.name) {
  //       return html`${this.label}`;
  //     }

  //     return html`
  //       <span class="button--span button--icon-${this.iconProps.position ?? 'right'}">
  //         <idblabext-icon
  //           .library=${this.iconProps.library ?? "material"}
  //           .name=${this.iconProps.name}
  //           .size=${this.iconProps.size ?? "small"}
  //           .color=${this.iconProps.color ?? ""}
  //         ></idblabext-icon>
  //         ${this.label}
  //       </span>
  //     `;
  //   }

  // 1. https://www.flaticon.com/free-icon/app-development_2335253?term=development&related_id=2335253
  // 2. https://www.flaticon.com/free-icon/data-integration_8637227?related_id=8637240&origin=search
  


  render() {
    return html`
      <div class="features-cards">
        <div class="card">
          <div class="card__icon" style="font-size: 7rem;">
            <idblabext-icon library="material-symbols" name="home" size="full" weight="100"></idblabext-icon>
          </div>
          <div class="card-body">
            <h2>Custom Software Development</h2>
            <p>
              We carry out the entire process for software development according to the needs of our
              clients,
            </p>
          </div>
        </div>

        <div class="card">
          <div class="card__icon">
            <i class="lni lni-briefcase color-green"></i>
          </div>
          <div class="card-body">
            <p>Integration of Infrastructure and Services</p>
            <p>
              We analyze, design and implement solutions that incorporate existing information
              systems in order to obtain new innovative and useful products for our clients.
            </p>
          </div>
        </div>

        <div class="card">
          <div class="card__icon">
            <i class="lni lni-heart"></i>
          </div>
          <div class="card-body">
            <p>RPA - Robotic Process Automation</p>
            <p>
              Is any technology oriented to the use of software with the objective of reducing human
              intervention in the use of computer applications
            </p>
          </div>
        </div>

        <div class="card">
          <div class="card__icon">
            <i class="lni lni-heart"></i>
          </div>
          <div class="card-body">
            <p>Corporate portals and Intranets</p>
            <p>
              We develop business portals and intranets using state-of-the-art technologies and
              advanced web concepts.
            </p>
          </div>
        </div>

        <div class="card">
          <div class="card__icon">
            <i class="lni lni-heart"></i>
          </div>
          <div class="card-body">
            <p>Offshoring / Outsourcing</p>
            <p>
              We perform international outsourcing to companies of any kind for the development of
              custom software regardless of location.
            </p>
          </div>
        </div>

        <div class="card">
          <div class="card__icon">
            <i class="lni lni-heart"></i>
          </div>
          <div class="card-body">
            <p>Consulting</p>
            <p>
              We advise on information technology issues, technical requirements, information
              systems changes and system impacts on your organization.
            </p>
          </div>
        </div>
      </div>
    `;
  }
}

defineCustomElement('cc-card-feature-with-icon', CcCardFeatureWithIcon);

declare global {
  interface HTMLElementTagNameMap {
    'cc-card-feature-with-icon': CcCardFeatureWithIcon;
  }
}
