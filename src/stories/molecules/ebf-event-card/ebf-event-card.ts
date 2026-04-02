import { html, LitElement, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { defineCustomElement } from '@helper/defineCustomElement';
import { ContentInfoProperties } from '@interfaces/contentInfo.interface';
import {SectionCardProperties } from '@interfaces/sectionCard.interface';

import componentStyles from './ebf-event-card.lit';
import { EventCardProperties } from '@interfaces/eventCard.interface';
import '../../molecules/ebf-content-info/ebf-content-info';
import '../../atoms/ebf-section-card/ebf-section-card';

export class EbfEventCard extends LitElement implements  EventCardProperties  {
  static styles = [componentStyles];

  @property({ type: Object }) contentInfoData: ContentInfoProperties = {};
  @property({ type: Array }) sectionCards = [];


 private renderContentInfo(): TemplateResult {
    const contentInfoData = document.createElement('ebf-content-info');
    Object.assign(contentInfoData, this.contentInfoData);
    return html`${contentInfoData}`;
  }


  private renderSectionCard(section: SectionCardProperties): TemplateResult {
    return html`
      <ebf-section-card
        .date=${section.date}
        .title=${section.title}
        .linkText=${section.linkText}
        .url=${section.url}
      ></ebf-section-card>
    `;
  }

  render(): TemplateResult {
    return html`
      <div>
        ${this.renderContentInfo()}
        ${this.sectionCards.map(card => this.renderSectionCard(card))}
      </div>
    `;
  }
}

defineCustomElement('ebf-event-card', EbfEventCard);

declare global {
  interface HTMLElementTagNameMap {
    'ebf-event-card': EbfEventCard;
  }
}
