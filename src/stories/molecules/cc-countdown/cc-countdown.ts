import { LitElement, html } from 'lit';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { DateTime } from 'luxon';
import type { CountdownProperties, CountdownLabels } from '@interfaces/countdown.interface';
import { defineCustomElement } from '@helper/defineCustomElement';
import componentStyles from './cc-countdown.lit';

import '../../atoms/cc-icon/cc-icon';

export class CcCountdown extends LitElement implements CountdownProperties {
  static styles: CSSResultGroup = [componentStyles];

  @property({ type: Object }) labels: CountdownLabels = { days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds' };
  @property({ type: String }) timeZone = 'UTC-3';
  @property({ type: String }) date = '2024-10-31';
  @property({ type: String }) time = '08:00:00';
  @property({ type: String }) labelDate = 'Oct 31 - Nov 1, 2024';
  @property({ type: String }) location = 'Buenos Aires - Argentina';
  @property({ type: String }) locationLink = '#';
  @property({ type: String }) color = 'primary';

  @property({ type: Number }) days = 0;
  @property({ type: Number }) hours = 0;
  @property({ type: Number }) minutes = 0;
  @property({ type: Number }) seconds = 0;

  private intervalId: number | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this.startCountdown();
  }

  updated(changed: Map<PropertyKey, unknown>): void {
    if (changed.has('date') || changed.has('time') || changed.has('timeZone')) {
      this.restartCountdown();
    }
  }

  private restartCountdown(): void {
    if (this.intervalId) clearInterval(this.intervalId);
    this.startCountdown();
  }

  private formatTimeTo12Hours(hms: string): string {
    const [h, m] = hms.split(':');
    const hour = Number(h);
    const period = hour >= 12 ? 'PM' : 'AM';
    const h12 = hour % 12 || 12;
    return `${h12}:${m} ${period}`;
  }

  private startCountdown(): void {
    const targetDateTime = DateTime.fromISO(`${this.date}T${this.time}`, {
      zone: this.timeZone,
    });

    const tick = (): void => {
      const now = DateTime.now().setZone(this.timeZone);
      const diff = targetDateTime.diff(now, ['days', 'hours', 'minutes', 'seconds']).toObject();

      this.days = Math.floor(diff.days ?? 0);
      this.hours = Math.floor(diff.hours ?? 0);
      this.minutes = Math.floor(diff.minutes ?? 0);
      this.seconds = Math.floor(diff.seconds ?? 0);

      if (targetDateTime <= now && this.intervalId) {
        clearInterval(this.intervalId);
        this.days = this.hours = this.minutes = this.seconds = 0;
      }
    };

    tick();
    this.intervalId = window.setInterval(tick, 1_000);
  }

  private isValidURL(str: string): boolean {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  }

  private drawLocation(): TemplateResult {
    return this.isValidURL(this.locationLink)
      ? html`<a href=${this.locationLink} target="_blank" class="underline">${this.location}</a>`
      : html`${this.location}`;
  }

  private getClasses() {
    return classMap({
      countdown: true,
      [`countdown--color-${this.color}`]: true,
    });
  }

  private counterBox(value: number, label: string): TemplateResult {
    return html`
      <div class="countdown__counter">
        <span class="countdown__value">${value}</span>
        <span class="countdown__label">${label}</span>
      </div>
    `;
  }

  render(): TemplateResult {
    const time12h = this.formatTimeTo12Hours(this.time);
    const dateLabel = this.labelDate || this.date;

    return html`
      <div class="countdown ${this.getClasses()}">
        <div class="countdown__counters">
          ${this.counterBox(this.days, this.labels.days)}
          ${this.counterBox(this.hours, this.labels.hours)}
          ${this.counterBox(this.minutes, this.labels.minutes)}
          ${this.counterBox(this.seconds, this.labels.seconds)}
        </div>

        <div class="countdown__meta">
          <div class="countdown__location">
            <div class="countdown__item">
              <cc-icon .library=${'material'} .name=${'location_on'} .size=${'medium'}></cc-icon>
              ${this.drawLocation()}
            </div>
          </div>

          <div class="countdown__datetime">
            <div class="countdown__item">
              <cc-icon
                .library=${'material'}
                .name=${'calendar_month'}
                .size=${'medium'}
              ></cc-icon>
              ${dateLabel}
            </div>
            <div class="countdown__item">
              <cc-icon .library=${'material'} .name=${'schedule'} .size=${'medium'}></cc-icon>
              ${time12h} ${this.timeZone}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

defineCustomElement('cc-countdown', CcCountdown);
declare global {
  interface HTMLElementTagNameMap {
    'cc-countdown': CcCountdown;
  }
}
