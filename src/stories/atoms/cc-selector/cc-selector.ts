import type { SelectorProperties } from '@interfaces/selector.interface';
import type { Language } from '@interfaces/selector.interface';
import { LitElement, html } from 'lit';
import type { CSSResultGroup, PropertyValueMap } from 'lit';
import { property, state } from 'lit/decorators.js';
import componentStyles from './cc-selector.lit';
import { defineCustomElement } from '@helper/defineCustomElement';
import type { IconProperties } from '@interfaces/icon.interface';

export class CcSelector extends LitElement implements SelectorProperties {
  currentSelect = '';
  showIcon = false;

  static styles: CSSResultGroup = [componentStyles];

  @property({ type: Array }) languages: Language[] = [];
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = 'Select Language';
  @property({ type: Object }) iconProps?:IconProperties;
  @property({ type: String }) labelColor = 'white';

  @state() private _selectOpen = false;
  @state() private _selectedLanguageLabel = '';

  connectedCallback() {
    super.connectedCallback();
    this._updateSelectedLabel();
    document.addEventListener('click', this._onOutsideClick);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('click', this._onOutsideClick);
  }

  protected willUpdate(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (changedProperties.has('languages')) {
      this._updateSelectedLabel();
    }
  }

  private _updateSelectedLabel(): void {
    const selectedLang = this.languages.find(lang => lang.selected);

    // Si no hay ninguno con selected: true, usa el de la URL (para producción)
    if (selectedLang) {
      this._selectedLanguageLabel = selectedLang.label;
    } else {
      const currentLangCode = window.location.pathname.split('/')[1];
      const langFromUrl = this.languages.find(lang => lang.code === currentLangCode);
      this._selectedLanguageLabel = langFromUrl?.label || this.languages[0]?.label || 'Select';
    }
  }

  private _selectLanguage(lang: Language, e: Event): void {
    e.stopPropagation();
    if (this._selectedLanguageLabel !== lang.label) {
      this._selectedLanguageLabel = lang.label;
      this.dispatchEvent(
        new CustomEvent('language-change', {
          detail: lang,
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  private _onOutsideClick = (e: MouseEvent) => {
    if (!this.shadowRoot?.contains(e.target as Node)) {
      this._selectOpen = false;
    }
  };

  private _toggleMenu(e: Event): void {
    e.stopPropagation();
    this._selectOpen = !this._selectOpen;
  }


  private renderIcon(): unknown {
    if (!this.iconProps?.name) {
      return null;
    }

    return html`
        <cc-icon
          .library=${this.iconProps.library ?? 'material'}
          .name=${this.iconProps.name}
          .size=${this.iconProps.size ?? 'small'}
          .color=${this.iconProps.color}
        ></cc-icon>
    `;
  }

  getClasses(): string {
    return `selector-selected selector-selected--color-${this.labelColor}`;
  }

  render() {
    return html`
      <div class="selector-dropdown" role="listbox" aria-label=${this.ariaLabel}>
        <div class=${this.getClasses()} @click=${this._toggleMenu}><span>${this._selectedLanguageLabel}</span>
        ${this.renderIcon()}
        </div>

        <ul class=${`selector-options ${this._selectOpen ? 'open' : ''}`}>
          ${this.languages.map(
            lang => html`
            <li><a
            href="/${lang.code}"
            aria-selected=${this._selectedLanguageLabel === lang.label}
            @click=${(e: Event) => this._selectLanguage(lang, e)}
            >
            ${lang.label}
            </a></li>
            `
          )}
        </ul>
      </div>
    `;
  }
}

defineCustomElement('cc-selector', CcSelector);

declare global {
  interface HTMLElementTagNameMap {
    'cc-selector': CcSelector;
  }
}
