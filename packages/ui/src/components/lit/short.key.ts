import { html, css } from "lit";
import { property } from "lit/decorators.js";
import { CosyElement } from "./base";

export class CosyShortKey extends CosyElement {
  @property({ type: String }) size: "sm" | "md" | "lg" = "md";

  static get styles() {
    return [
      CosyElement.styles,
      css`
        div {
          display: inline-flex;
          padding: 6px;
          border-radius: var(--radius-base, 4px);
          background-color: var(--color-short-key-bg);
          color: var(--color-short-key-font);
        }
        .size-sm {
          padding: 2px;
        }
        .size-md {
          padding: 4px;
        }
        .size-lg {
          padding: 6px;
        }
        span {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          text-transform: capitalize;
          height: 14px;
          min-width: 14px;
          font-size: 14px;
        }
        svg {
          width: 100%;
          height: 100%;
          fill: currentColor;
        }
      `,
    ];
  }

  render() {
    return html`<div class=${`size-${this.size}`}>
      <span><slot></slot></span>
    </div>`;
  }
}

if (!customElements.get("cosy-short-key"))
  customElements.define("cosy-short-key", CosyShortKey);
