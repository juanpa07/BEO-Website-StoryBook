import { LitElement, html } from "lit";
import type { CSSResultGroup, TemplateResult } from "lit";
import { property } from "lit/decorators.js";

import { defineCustomElement } from "@helper/defineCustomElement";
import type { ButtonProperties } from "@interfaces/button.interface";
import type { IconProperties } from "@interfaces/icon.interface";

import componentStyles from "./cc-button.lit";
import "../cc-icon/cc-icon";

export class CcButton extends LitElement implements ButtonProperties {
  static styles: CSSResultGroup = [componentStyles];

  // Properties button
  @property({ type: String }) color: string = "primary";
  @property({ type: String }) size: string = "small";
  @property({ type: String }) radius: string = "rounded";
  @property({ type: String }) label: string = "Button";

  // Properties icon
  @property({ type: Object }) iconProps?: IconProperties;

  // Properties event
  onClick: (event: MouseEvent) => void = (event: MouseEvent) => {
    this.dispatchEvent(
      new CustomEvent("button-click", {
        detail: { event },
        bubbles: true,
        composed: true,
      })
    );
  };

  private getClasses(): string {
    const classes = [
      "button",
      `button--color-${this.color}`,
      `button--size-${this.size}`,
      `button--radius-${this.radius}`,
    ];

    if (!this.label) {
      classes.push("button--no-label");
    }

    return classes.join(" ");
  }

  private drawIcon(): TemplateResult {
    if (!this.iconProps?.name) {
      return html`${this.label}`;
    }

    return html`
      <span class="button--span button--icon-${this.iconProps.position ?? 'right'}">
        <idblabext-icon
          .library=${this.iconProps.library ?? "material"}
          .name=${this.iconProps.name}
          .size=${this.iconProps.size ?? "small"}
          .color=${this.iconProps.color ?? ""}
        ></idblabext-icon>
        ${this.label ? html`${this.label}` : ''}
      </span>
    `;
  }

  render() {
    return html`
      <button type="button" class=${this.getClasses()} @click=${this.onClick}>
        ${this.drawIcon()}
      </button>
    `;
  }
}

defineCustomElement("cc-button", CcButton);

declare global {
  interface HTMLElementTagNameMap {
    "cc-button": CcButton;
  }
}
