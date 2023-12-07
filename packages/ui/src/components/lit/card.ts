import { html, css } from "lit";
import { property } from "lit/decorators.js";
import { CosyElement } from "./base";

const HTML_TAG = `cosy-card`;

export class CosyCard extends CosyElement {
  static get styles() {
    return [
      CosyElement.styles,
      css`
        .card {
          background-color: var(--color-border);
          border-radius: 10px;
          cursor: pointer;
          display: inline-flex;
          flex-direction: column;
          position: relative;
          color: var(--color-font);
        }

        .card::before,
        .card::after {
          border-radius: inherit;
          content: "";
          height: 100%;
          left: 0px;
          opacity: 0;
          position: absolute;
          top: 0px;
          transition: opacity 500ms;
          width: 100%;
          background: radial-gradient(
            800px circle at var(--mouse-x) var(--mouse-y),
            var(--color-radial-before),
            transparent 40%
          );
          z-index: 3;
        }

        .card::after {
          background: radial-gradient(
            800px circle at var(--mouse-x) var(--mouse-y),
            var(--color-radial-after),
            transparent 40%
          );
          opacity: 1;
          z-index: 1;
        }

        .mask {
          position: absolute;
          background-color: var(--color-bg-2);
          border-radius: inherit;
          inset: 1px;
          z-index: 2;
        }

        .content {
          z-index: 4;
        }
      `,
    ];
  }

  handleCardMouseMove(e) {
    const { mouseX, mouseY } = e.detail;
    const rect = this.getBoundingClientRect();
    const x = mouseX - rect.left;
    const y = mouseY - rect.top;
    this.style.setProperty("--mouse-x", `${x}px`);
    this.style.setProperty("--mouse-y", `${y}px`);
  }

  connectedCallback() {
    super.connectedCallback();
    this.eventBus.on("card-group:mousemove", (e) =>
      this.handleCardMouseMove(e)
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.eventBus.off("card-group:mousemove", this.handleCardMouseMove);
  }

  render() {
    return html`<a class="card">
      <div class="mask"></div>
      <div class="content"><slot></slot></div>
    </a>`;
  }
}

if (!customElements.get(HTML_TAG)) customElements.define(HTML_TAG, CosyCard);
