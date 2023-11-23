import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("cosy-short-key")
export class CosyShortKey extends LitElement {
  static styles = css`
    div {
      display: inline-flex;
      padding: 6px;
      border-radius: var(--radius-base, 4px);
      background-color: var(--color-short-key-bg);
      color: var(--color-short-key-font);
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
  `;

  render() {
    return html`<div>
      <span><slot></slot></span>
    </div>`;
  }
}
