import { html, type TemplateResult } from 'lit';
import type { LinkProperties } from '@interfaces/link.interface';

import '../stories/atoms/cc-link/cc-link';

/**
 * Renders a list of links using ebf-link components
 * @param {LinkProperties[]} links - Array of link properties to render
 * @returns {TemplateResult} Rendered links template
 */
export function renderLinkElements(links: LinkProperties[]): TemplateResult {
  if (!links || links.length === 0) {
    return html``;
  }

  return html`
    ${links.map(link => {
      const linkElement = document.createElement('cc-link');
      Object.assign(linkElement, link);
      return html`${linkElement}`;
    })}
  `;
}
