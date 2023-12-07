import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import { CosyElement } from "./base";

const HTML_TAG = "cosy-popup";

class CosyPopup extends CosyElement {
  static get styles() {
    return css`
      :host {
        display: block;
        position: fixed;
        padding: 24px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--color-popup-mask-bg); /* 半透明蒙版 */
        backdrop-filter: blur(5px); /* 模糊效果 */
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 19940121;
      }
      .content {
        background: var(--color-popup-bg);
        padding: 20px;
        border-radius: var(--radius-base, 4px);
        box-shadow: rgba(0, 0, 0, 0.2) 0px 16px 70px;
        backdrop-filter: blur(20px) saturate(190%) contrast(70%) brightness(80%);
        border: 0.5px solid var(--color-popup-border);
      }
    `;
  }

  destroy() {
    this.parentNode && this.parentNode.removeChild(this);
  }

  onBackdropClick(e) {
    e.target === this && this.destroy();
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", this.onBackdropClick);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.onBackdropClick);
    super.disconnectedCallback();
  }

  render() {
    return html`
      <div class="content">
        <slot></slot>
      </div>
    `;
  }
}

if (!customElements.get(HTML_TAG)) customElements.define(HTML_TAG, CosyPopup);
