import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("cosy-icon")
export class CosyIcon extends LitElement {
  @property({ type: String }) color: string = "black";
  @property({ type: String }) hoverColor: string = "#ccc";
  @property({ type: String }) size: string = "24px";

  static get styles() {
    return css`
      :host {
        display: inline-block;
        width: 16px;
        height: 16px;
        color: var(--cosy-icon-color, black);
        cursor: pointer;
      }
      :host(:hover) {
        color: var(--cosy-icon-hover-color, #ccc);
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
      <style>
        :host {
          --cosy-icon-size: ${this.size};
          --cosy-icon-color: ${this.color};
          --cosy-icon-hover-color: ${this.hoverColor};
        }
      </style>
      <slot></slot>
    `;
  }
}
