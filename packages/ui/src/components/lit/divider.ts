import { html, css } from "lit";
import { property } from "lit/decorators.js";
import { CosyElement } from "./base";

export class CosyDivider extends CosyElement {
  @property({ type: String }) margin = "1rem 0";
  static get styles() {
    return [
      CosyElement.styles,
      css`
        div {
          height: 1px;
          background-image: linear-gradient(
            to right,
            transparent,
            var(--color-border),
            transparent
          );
        }
      `,
    ];
  }

  render() {
    return html`<div style="margin: ${this.margin}"></div>`;
  }
}

if (!customElements.get("cosy-divider"))
  customElements.define("cosy-divider", CosyDivider);
