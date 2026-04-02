import { LitElement, html } from 'lit';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import { defineCustomElement } from '@helper/defineCustomElement';
import type {
  TableProperties,
  TableColumn,
  TableRow,
  TableAction,
  TableBadge,
} from '@interfaces/table.interface';

import componentStyles from './cc-table.lit';
import '../cc-button/cc-button';

export class CcTable extends LitElement implements TableProperties {
  static styles: CSSResultGroup = [componentStyles];

  // ============================
  // Properties
  // ============================

  @property({ type: String }) id: string = '';
  @property({ type: Array }) columns: TableColumn[] = [];
  @property({ type: Array }) rows: TableRow[] = [];
  @property({ type: Array }) actions?: TableAction[] = [];
  @property({ type: Boolean }) striped?: boolean = false;
  @property({ type: Boolean }) hoverable?: boolean = true;
  @property({ type: Boolean }) bordered?: boolean = false;
  @property({ type: Boolean }) compact?: boolean = false;
  @property({ type: Boolean }) responsive?: boolean = true;
  @property({ type: String }) emptyMessage?: string = 'No data available';

  onRowClick?: (row: TableRow, index: number) => void;

  // ============================
  // Class Generation Methods
  // ============================

  private getTableClasses(): string {
    const classes = ['table'];

    if (this.striped) classes.push('table--striped');
    if (this.bordered) classes.push('table--bordered');
    if (this.compact) classes.push('table--compact');

    return classes.join(' ');
  }

  // ============================
  // Event Handlers
  // ============================

  private handleRowClick = (row: TableRow, index: number) => {
    if (!this.hoverable) return;

    this.dispatchEvent(
      new CustomEvent('row-click', {
        detail: { row, index },
        bubbles: true,
        composed: true,
      })
    );

    if (this.onRowClick) {
      this.onRowClick(row, index);
    }
  };

  private handleActionClick = (
    action: TableAction,
    row: TableRow,
    rowIndex: number,
    e: Event
  ) => {
    e.stopPropagation();

    this.dispatchEvent(
      new CustomEvent('action-click', {
        detail: { action, row, rowIndex },
        bubbles: true,
        composed: true,
      })
    );

    if (action.onClick) {
      action.onClick(row, rowIndex);
    }
  };

  // ============================
  // Utility Methods
  // ============================

  private isBadge(value: unknown): value is TableBadge {
    return (
      typeof value === 'object' &&
      value !== null &&
      'label' in value &&
      'variant' in value
    );
  }

  private getCellValue(row: TableRow, column: TableColumn): unknown {
    return row[column.key];
  }

  private getAlignClass(align?: string): string {
    if (align === 'center') return 'align-center';
    if (align === 'right') return 'align-right';
    return '';
  }

  // ============================
  // Render Methods
  // ============================

  private renderBadge(badge: TableBadge): TemplateResult {
    return html`
      <span class="badge badge-soft badge-${badge.variant}">
        ${badge.label}
      </span>
    `;
  }

  private renderCellContent(value: unknown): TemplateResult | string {
    if (this.isBadge(value)) {
      return this.renderBadge(value);
    }

    if (value === null || value === undefined) {
      return '—';
    }

    return String(value);
  }

  private renderActions(row: TableRow, rowIndex: number): TemplateResult {
    if (!this.actions || this.actions.length === 0) {
      return html``;
    }

    return html`
      <div class="table-actions">
        ${this.actions.map(
          (action) => html`
            <cc-button
              color="transparent"
              size="sm"
              radius="rounded-full"
              label=""
              .iconProps=${{
                library: 'material',
                name: action.icon,
                size: 'medium',
                position: 'left',
              }}
              @button-click=${(e: CustomEvent) => {
                this.handleActionClick(action, row, rowIndex, e.detail.event);
              }}
            ></cc-button>
          `
        )}
      </div>
    `;
  }

  private renderTableHeader(): TemplateResult {
    return html`
      <thead>
        <tr>
          ${this.columns.map(
            (column) => html`
              <th
                class=${this.getAlignClass(column.align)}
                style=${column.width ? `width: ${column.width}` : ''}
              >
                ${column.label}
              </th>
            `
          )}
          ${this.actions && this.actions.length > 0
            ? html`<th class="align-center">Actions</th>`
            : ''}
        </tr>
      </thead>
    `;
  }

  private renderTableBody(): TemplateResult {
    if (this.rows.length === 0) {
      return html`
        <tbody>
          <tr>
            <td
              colspan=${this.columns.length +
              (this.actions && this.actions.length > 0 ? 1 : 0)}
            >
              ${this.renderEmptyState()}
            </td>
          </tr>
        </tbody>
      `;
    }

    return html`
      <tbody>
        ${this.rows.map(
          (row, index) => html`
            <tr
              class=${this.hoverable ? 'row-hover' : ''}
              @click=${() => this.handleRowClick(row, index)}
            >
              ${this.columns.map((column) => {
                const value = this.getCellValue(row, column);
                return html`
                  <td class=${this.getAlignClass(column.align)}>
                    ${this.renderCellContent(value)}
                  </td>
                `;
              })}
              ${this.actions && this.actions.length > 0
                ? html`<td class="align-center">
                    ${this.renderActions(row, index)}
                  </td>`
                : ''}
            </tr>
          `
        )}
      </tbody>
    `;
  }

  private renderEmptyState(): TemplateResult {
    return html`
      <div class="table-empty">
        <svg
          class="table-empty-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <p class="table-empty-message">${this.emptyMessage}</p>
        <p class="table-empty-description">
          Try adjusting your search or filter to find what you're looking for.
        </p>
      </div>
    `;
  }

  // ============================
  // Main Render
  // ============================

  render(): TemplateResult {
    const wrapperClass = this.responsive ? 'table-wrapper' : 'table-container';

    return html`
      <div class="table-container">
        <div class=${wrapperClass}>
          <table id=${this.id || ''} class=${this.getTableClasses()}>
            ${this.renderTableHeader()} ${this.renderTableBody()}
          </table>
        </div>
      </div>
    `;
  }
}

defineCustomElement('cc-table', CcTable);

declare global {
  interface HTMLElementTagNameMap {
    'cc-table': CcTable;
  }
}
