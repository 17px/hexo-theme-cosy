import { property } from "lit/decorators.js";
import { CosyElement } from "./base";
import { html, css } from "lit";

const HTML_TAG = `cosy-card-group`;

export class CosyCardGroup extends CosyElement {
  @property({ type: Number })
  row = 3;

  static get styles() {
    return [
      CosyElement.styles,
      css`
        .card-group {
          display: grid;
          gap: 12px;
        }
      `,
    ];
  }

  handleMouseMove(e) {
    const { clientX: mouseX, clientY: mouseY } = e;
    this.eventBus.emit("card-group:mousemove", { mouseX, mouseY });
  }

  render() {
    return html`<div
      class="card-group"
      style="grid-template-columns: repeat(${this.row}, 1fr)"
      @mousemove="${this.handleMouseMove}"
    >
      <slot></slot>
    </div>`;
  }
}

if (!customElements.get(HTML_TAG))
  customElements.define(HTML_TAG, CosyCardGroup);
