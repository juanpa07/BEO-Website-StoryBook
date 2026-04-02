import { LitElement, html } from 'lit';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { defineCustomElement } from '@helper/defineCustomElement';
import { property } from 'lit/decorators.js';
import componentStyles from './cc-modal.lit.ts';

import '../../atoms/cc-button/cc-button.ts';
import '../../atoms/cc-text/cc-text.ts';
import type { IconProperties } from '@interfaces/icon.interface.ts';

export class CcModal extends LitElement {
  static styles: CSSResultGroup = [componentStyles];

  @property({ type: Boolean }) isOpen: boolean = false;
  @property({ type: Boolean }) showHeader: boolean = true;
  @property({ type: Boolean }) showFooter: boolean = true;
  @property({ type: String }) footerAlign: 'left' | 'center' | 'right' = 'center';
  @property({ type: String }) titleHeader: string = '';
  @property({ type: String }) textAlign: 'left' | 'center' | 'right' = 'left';
  @property({ type: String }) textSize: 'small' | 'base' | 'large' | 'xl' | '2xl' = 'large';
  @property({ type: Array }) buttons: {
    label: string;
    color: string;
    iconProps?: IconProperties;
    onClick?: () => void;
  }[] = [];

  @property({ type: Function }) onClose?: () => void;

  private dialogRef: HTMLDialogElement | null = null;

  firstUpdated() {
    this.dialogRef = this.renderRoot.querySelector('#dialog');

    this.dialogRef?.addEventListener('close', () => {
      if (this.isOpen) {
        this.isOpen = false;
        this.onClose?.();
      }
    });
  }

  updated(changedProps: Map<string, unknown>) {
    if (!this.dialogRef) return;

    if (changedProps.has('isOpen')) {
      if (this.isOpen) {
        // Always try to open when isOpen is true
        if (!this.dialogRef.open) {
          this.dialogRef.showModal();
          document.body.style.overflow = 'hidden';
        }
      } else {
        // Always close when isOpen is false
        if (this.dialogRef.open) {
          this.dialogRef.close();
        }
        document.body.style.overflow = '';
      }
    }
  }

  renderButtons(): TemplateResult {
    if (!this.buttons?.length) return html``;

    return html`
    ${this.buttons.map(
      (btn) => html`
        <cc-button
          label=""
          iconProps=${btn.iconProps}
          size='base'
          onClick=${btn.onClick ?? this.__handleClose}
          radius='rounded-full'
        ></cc-button>
      `
    )}
  `;
  }

  private __handleClose = (): void => {
    this.isOpen = false;
    this.dialogRef?.close();
    this.onClose?.();
  };

  __onOpen = (): void => {
    this.isOpen = true;
    this.dialogRef?.showModal();
  };

  private getIconProps(
    name: string,
    size: 'small' | 'medium' | 'large'
  ): IconProperties {
    return {
      name,
      library: 'material',
      size,
      position: 'right',
    };
  }

  private getFooterClasses(): string {
    return `modal__footer modal__footer--${this.footerAlign}`;
  }

  private getClasses(): string {
    const classes = [
      'modal__body',
      `modal__body--${this.textAlign}`,
      `modal__body--${this.textSize}`,
    ].join(' ');
    return classes;
  }
  render(): TemplateResult {
    return html`
      <dialog id="dialog">
        <div class="modal__wrapper">
          <div class="modal__content">
            ${this.showHeader
        ? html`
                  <div class="modal__header">
                    <cc-text
                      text=${this.titleHeader}
                      color="primary"
                      fontSize="2xl"
                      fontFamily=""
                      align="left"
                      weight="semibold"
                    ></cc-text>
                    <cc-button
                      class="modal__close-btn"
                      label=""
                      .iconProps=${this.getIconProps('close', 'medium')}
                      size='base'
                      color="primary"
                      .onClick=${this.__handleClose}
                      radius='rounded-none'
                    ></cc-button>
                  </div>
                `
        : null}

            <div class="${this.getClasses()}">
              <slot></slot>
            </div>

            ${this.showFooter
        ? html` <div class=${this.getFooterClasses()}>
              ${this.renderButtons()}
              </div> `
        : null}
          </div>
        </div>
      </dialog>
    `;
  }
}

defineCustomElement('cc-modal', CcModal);

declare global {
  interface HTMLElementTagNameMap {
    'cc-modal': CcModal;
  }
}
