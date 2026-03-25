import { LitElement, html, css } from "lit";
import type { CSSResultGroup, TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { defineCustomElement } from "@helper/defineCustomElement";
import componentStyles from "./cc-icon.lit";
import type { IconProperties } from "@interfaces/icon.interface";
import { getCustomIcon } from "@assets/common/custom-icons/customIcons";

export class CcIcon extends LitElement implements IconProperties {
    static styles: CSSResultGroup = [
        componentStyles,
        css`
            :host {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .svg-icon svg {
                width: 1em;
                height: 1em;
                display: inline-block;
                fill: currentColor;
            }
        `
    ];

    @property({ type: String }) name = "home";
    @property({ type: String }) library: "material" | "custom" = "material";
    @property({ type: String }) size: "small" | "medium" | "large" | "xlarge" | "xxlarge" | "full" | string = "small";
    @property({ type: String }) color = "";
    @property({ type: Number }) fill: 0 | 1 = 0;
    @property({ type: Number }) weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 = 400;
    @property({ type: Number }) grade: -25 | 0 | 200 = 0;

    @state() private svgContent: string | null = null;

    updated(changed: Map<string, unknown>) {
        if (this.library === "custom" && (changed.has("name") || changed.has("library"))) {
            this.loadCustomSvg();
        }
    }

    private async loadCustomSvg(): Promise<void> {
        try {
            const svgContent = await getCustomIcon(this.name);
            if (!svgContent) {
                console.warn(`Custom icon "${this.name}" not found.`);
            }
            this.svgContent = svgContent;
        } catch (error) {
            console.error(`Error loading custom icon "${this.name}":`, error);
            this.svgContent = null;
        }
    }

    private getMaterialIconStyles(): Record<string, string> {
        const styles: Record<string, string> = {
            'font-variation-settings': `'FILL' ${this.fill}, 'wght' ${this.weight}, 'GRAD' ${this.grade}`,
        };
        if (this.color) styles['color'] = this.color;
        return styles;
    }

    private renderMaterialIcon(): TemplateResult {
        return html`
            <span
                class=${[
                    "material-symbols",
                    `material-symbols--size-${this.size}`,
                ].join(" ")}
                style="${Object.entries(this.getMaterialIconStyles())
                    .map(([k, v]) => `${k}: ${v};`)
                    .join(" ")}"
            >
                ${this.name}
            </span>
        `;
    }

    private renderCustomIcon(): TemplateResult {
        return html`
            <span
                class=${[
                    "svg-icon",
                    `material-symbols--size-${this.size}`,
                ].join(" ")}
                style="color: ${this.color};"
            >
                ${this.svgContent ? unsafeHTML(this.svgContent) : ""}
            </span>
        `;
    }

    render(): TemplateResult {
        switch (this.library) {
            case "custom":
                return this.renderCustomIcon();
            case "material":
            default:
                return this.renderMaterialIcon();
        }
    }
}

defineCustomElement("cc-icon", CcIcon);

declare global {
    interface HTMLElementTagNameMap {
        "cc-icon": CcIcon;
    }
}
