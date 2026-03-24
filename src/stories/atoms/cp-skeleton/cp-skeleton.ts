import { defineCustomElement } from "@helper/defineCustomElement";
import type { SkeletonProperties } from "@interfaces/skeleton.interface";
import { LitElement, html } from "lit";
import type { CSSResultGroup, TemplateResult } from "lit";
import { property } from "lit/decorators.js";
import componentStyles from "./cp-skeleton.lit";

export class CpSkeleton extends LitElement implements SkeletonProperties {
  static styles: CSSResultGroup = [componentStyles];

  @property({ type: String }) width: string = "w-1/2";
  @property({ type: String }) height: string = "h-10";

  render(): TemplateResult {
    return html`<div class="skeleton ${this.height} ${this.width}"></div>`;
  }
}

defineCustomElement("cp-skeleton", CpSkeleton);

declare global {
  interface HTMLElementTagNameMap {
    "cp-skeleton": CpSkeleton;
  }
}
