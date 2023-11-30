import { html, css } from "lit";
import { property } from "lit/decorators.js";
import { CosyElement } from "./base";

export class CosyLabel extends CosyElement {
  @property({ type: String }) color:
    | "yellow"
    | "orange"
    | "teal"
    | "red"
    | "blue"
    | "grey";
  @property({ type: Boolean }) bordered: false;

  static get styles() {
    return [
      CosyElement.styles,
      css`
        div {
          padding: 4px 6px;
          transition: all 0.3s ease;
          background-color: var(--color-label-bg);
          color: var(--color-label-font);
          border-radius: var(--radius-base, 4px);
          display: inline-flex;
          align-items: center;
          font-size: 12px;
        }
        .bordered {
          border: 1px solid var(--color-label-border);
        }
        div:hover {
          border-color: var(--color-label-border-hover);
          background-color: var(--color-label-bg-hover);
          color: var(--color-label-font-hover);
        }
        .round {
          border-radius: 16px;
        }
        .dot {
          margin-right: 6px;
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }
        .yellow {
          background: var(--color-yellow);
        }
        .orange {
          background: var(--color-orange);
        }
        .teal {
          background: var(--color-teal);
        }
        .red {
          background: var(--color-red);
        }
        .blue {
          background: var(--color-blue);
        }
        .grey {
          background: var(--color-grey);
        }
      `,
    ];
  }

  render() {
    return html`<div class="${this.bordered ? "bordered" : ""}">
      <span class="${this.color ? "dot " + this.color : ""}"></span>
      <slot></slot>
    </div>`;
  }
}

if (!customElements.get("cosy-label"))
  customElements.define("cosy-label", CosyLabel);
