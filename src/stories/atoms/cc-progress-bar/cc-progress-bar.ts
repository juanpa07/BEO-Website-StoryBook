import { LitElement, html } from 'lit';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import { defineCustomElement } from '@helper/defineCustomElement';
import type { ProgressBarProperties } from '@interfaces/progressBar.interface';

import componentStyles from './cc-progress-bar.lit';

export class CcProgressBar extends LitElement implements ProgressBarProperties {
  static styles: CSSResultGroup = [componentStyles];

  @property({ type: String }) bgColor: string = 'secondary';
  @property({ type: Number }) progress: number = 100;

  private getProgressBarFillClasses(): string {
    return [
      'progressbar__fill',
      `progressbar__fill--color-${this.bgColor}`,
    ].join(' ');
  }

  render(): TemplateResult {
    return html`
      <div class="progressbar">
        <div
          class="${this.getProgressBarFillClasses()}"
          style="width: ${this.progress}%;"
        ></div>
      </div>
    `;
  }
}

defineCustomElement('cc-progress-bar', CcProgressBar);

declare global {
  interface HTMLElementTagNameMap {
    'cc-progress-bar': CcProgressBar;
  }
}
