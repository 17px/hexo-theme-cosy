import { html, css } from "lit";
import { property } from "lit/decorators.js";
import { CosyElement } from "./base";

export class CosyDivider extends CosyElement {
  static get styles() {
    return [
      CosyElement.styles,
      css`
        div {
          border-top: 1px solid var(--color-border-divider);
          margin: 24px 0px;
        }
      `,
    ];
  }

  render() {
    return html`<div></div>`;
  }
}

if (!customElements.get("cosy-divider"))
  customElements.define("cosy-divider", CosyDivider);
