import { defineCustomElement } from "@helper/defineCustomElement";
import type { SkeletonProperties } from "@interfaces/skeleton.interface";
import { LitElement, html } from "lit";
import type { CSSResultGroup, TemplateResult } from "lit";
import { property } from "lit/decorators.js";
import componentStyles from "./cc-skeleton.lit";

export class CcSkeleton extends LitElement implements SkeletonProperties {
  static styles: CSSResultGroup = [componentStyles];

  @property({ type: String }) width: string = "50%";
  @property({ type: String }) height: string = "2.5rem";

  render(): TemplateResult {
    return html`<div class="skeleton" style="width: ${this.width}; height: ${this.height};"></div>`;
  }
}

defineCustomElement("cc-skeleton", CcSkeleton);

declare global {
  interface HTMLElementTagNameMap {
    "cc-skeleton": CcSkeleton;
  }
}
