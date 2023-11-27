import { html, css } from "lit";
import { property } from "lit/decorators.js";
import { CosyElement } from "./base";

const HTML_TAG = `cosy-icon`;

export class CosyIcon extends CosyElement {
  @property({ type: String }) size: "sm" | "md" | "large" = "md";
  @property({ type: String }) href: string = "#";

  static get styles() {
    return css`
      :host {
        display: inline-flex;
        justify-content: center;
        align-items: center;
      }
      a {
        color: var(--color-icon);
        text-decoration: none;
        transition: color 0.3s;
        cursor: pointer;
      }
      a:hover {
        color: var(--color-icon-hover);
      }
      .size-sm {
        width: 16px;
        height: 16px;
      }
      .size-md {
        width: 20px;
        height: 20px;
      }
      .size-lg {
        width: 24px;
        height: 24px;
      }
      svg {
        width: 100%;
        height: 100%;
        fill: currentColor;
      }
    `;
  }

  render() {
    return html`
      <a href="${this.href}" class="size-${this.size}"> <slot></slot></a>
    `;
  }
}

if (!customElements.get(HTML_TAG)) customElements.define(HTML_TAG, CosyIcon);
