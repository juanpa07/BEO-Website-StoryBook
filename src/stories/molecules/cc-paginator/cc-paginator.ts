import { LitElement, html, css } from "lit";
import type { TemplateResult, CSSResultGroup } from "lit";
import { defineCustomElement } from "@helper/defineCustomElement";
import { property } from "lit/decorators.js";
import componentStyles from "./cc-paginator.lit";
import type { PaginatorProperties } from "@interfaces/paginator.interface";

//import '../../atoms/idblabext-icon/idblabext-icon';
import "../../atoms/cc-button/cc-button";

export class CcPaginator extends LitElement implements PaginatorProperties {
  static styles: CSSResultGroup = [componentStyles, css``];

  @property({ type: Object }) totalPages: number = 0;
  @property({ type: Object }) currentPage: number = 1;
  @property({ type: Object }) onSelectItem: Function = () => {};
  @property({ type: Number }) pagesToShow: number = 4;

  private resizeHandler = () => {
    this.requestUpdate();
  };

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("resize", this.resizeHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("resize", this.resizeHandler);
  }

  private goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    }
    this.onSelectItem(pageNumber); // Mover la llamada aquí para que se llame siempre
  }

  private getResponsivePagesToShow(): number {
    const width = window.innerWidth;

    // Mobile: max 3 pages
    if (width < 768) {
      return Math.min(this.pagesToShow, 3);
    }
    // Tablet: max 6 pages
    else if (width < 1024) {
      return Math.min(this.pagesToShow, 6);
    }
    // Desktop/Wide: max 9 pages
    else {
      return Math.min(this.pagesToShow, 9);
    }
  }

  private isMobile(): boolean {
    return window.innerWidth < 768;
  }

  private renderPageButtons() {
    // Verificar si el total de páginas es cero
    if (this.totalPages === 0) {
      return html``; // No renderizar ningún botón si no hay páginas
    }

    const buttons = [];
    const responsivePagesToShow = this.getResponsivePagesToShow();
    let start = Math.max(
      1,
      this.currentPage - Math.floor(responsivePagesToShow / 2),
    );
    let end = Math.min(this.totalPages, start + responsivePagesToShow - 1);

    if (end - start < responsivePagesToShow) {
      start = Math.max(1, end - responsivePagesToShow + 1);
    }

    for (let i = start; i <= end; i++) {
      buttons.push(html`
        <li>
          <cc-button
            color="${this.currentPage === i ? "secondary" : "secondary-border"}"
            size="base"
            radius="rounded-lg"
            label=${i}
            iconProps=""
            @button-click="${() => this.goToPage(i)}"
          ></cc-button>
        </li>
      `);
    }
    return buttons;
  }

  render(): TemplateResult {
    return html`
      <ul class="pagination">
        ${this.currentPage > 1 && this.totalPages > 1
          ? html`
              ${!this.isMobile()
                ? html`
                    <li class="md:inline">
                      <cc-button
                        color="secondary-border"
                        size="base"
                        radius="rounded-lg"
                        label="&lt;&lt; First"
                        iconProps=""
                        @button-click="${() => this.goToPage(1)}"
                      ></cc-button>
                    </li>
                  `
                : ""}
              <li>
                <cc-button
                  @click="${() => this.goToPage(this.currentPage - 1)}"
                  size="base"
                  radius="rounded-lg"
                  label=" &lt;"
                  color="secondary-border"
                ></cc-button>
              </li>
            `
          : ""}
        ${this.renderPageButtons()}
        ${this.totalPages > 1 && this.currentPage !== this.totalPages
          ? html`
              <li>
                <cc-button
                  @click="${() => this.goToPage(this.currentPage + 1)}"
                  size="base"
                  radius="rounded-lg"
                  label="&gt;"
                  color="secondary-border"
                ></cc-button>
              </li>
              ${!this.isMobile()
                ? html`
                    <li class="md:inline">
                      <cc-button
                        @click="${() => this.goToPage(this.totalPages)}"
                        size="base"
                        radius="rounded-lg"
                        label="Last &gt;&gt;"
                        color="secondary-border"
                      ></cc-button>
                    </li>
                  `
                : ""}
            `
          : ""}
      </ul>
    `;
  }
}

defineCustomElement("cc-paginator", CcPaginator);

declare global {
  interface HTMLElementTagNameMap {
    "cc-paginator": CcPaginator;
  }
}
