import { html, css } from "lit";
import { property } from "lit/decorators.js";
import { CosyElement } from "./base";

class CosyTooltip extends CosyElement {
  @property({ type: String }) placement = "bottom";
  @property({ type: Number, attribute: "max-width" }) maxWidth = 520;
  @property({ type: String, attribute: "font-color" }) fontColor =
    "var(--color-font-1)";

  static get styles() {
    return [
      CosyElement.styles,
      css`
        .tooltip {
          position: relative;
          display: flex;
          user-select: none;
        }
        .tooltip-content {
          display: inline-block;
          visibility: hidden;
          opacity: 0;
          background-color: var(--color-tooltip-bg);
          border: 1px solid var(--color-tooltip-border);
          backdrop-filter: var(--color-frost-bg);
          padding: 4px 8px;
          border-radius: var(--radius-base, 4px);
          position: absolute;
          z-index: 1;
          font-size: 12px;
          transition: opacity 0.3s ease, visibility 0.3s;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .tooltip:hover .tooltip-content {
          visibility: visible;
          opacity: 1;
        }
        .top {
          bottom: 110%;
          left: 50%;
          transform: translateX(-50%);
        }
        .bottom {
          top: 110%;
          left: 50%;
          transform: translateX(-50%);
        }
        .left {
          right: 110%;
          top: 50%;
          transform: translateY(-50%);
        }
        .right {
          left: 110%;
          top: 50%;
          transform: translateY(-50%);
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="tooltip">
        <slot
          name="content"
          class="tooltip-content ${this.placement}"
          style="color:${this.fontColor};max-width:${this.maxWidth}px"
        ></slot>
        <slot></slot>
      </div>
    `;
  }
}

if (!customElements.get("cosy-tooltip"))
  customElements.define("cosy-tooltip", CosyTooltip);
