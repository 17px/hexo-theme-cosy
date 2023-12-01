import { html, css } from "lit";
import { property } from "lit/decorators.js";
import { CosyElement } from "./base";

class CosyTooltip extends CosyElement {
  @property({ type: String }) placement:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-left"
    | "bottom-left"
    | "top-right"
    | "bottom-right" = "bottom";
  @property({ type: String, attribute: "max-width" }) maxWidth = "220px";
  @property({ type: Boolean, attribute: "text-wrap" }) textWrap = false;
  @property({ type: String, attribute: "text-wrap-width" })
  textWrapWidth = "220px";
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
          font-size: 13px;
          transition: opacity 0.3s ease, visibility 0.3s;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .tooltip:hover .tooltip-content {
          visibility: visible;
          opacity: 1;
        }
        .top {
          bottom: calc(100% + 6px);
          left: 50%;
          transform: translateX(-50%);
        }
        .top-left {
          left: 0;
          bottom: calc(100% + 6px);
        }
        .top-right {
          right: 0;
          bottom: 115%;
        }
        .bottom {
          top: calc(100% + 6px);
          left: 50%;
          transform: translateX(-50%);
        }
        .bottom-left {
          left: 0;
          top: calc(100% + 6px);
        }
        .bottom-right {
          right: 0;
          top: calc(100% + 6px);
        }
        .left {
          right: calc(100% + 6px);
          top: 50%;
          transform: translateY(-50%);
        }
        .right {
          left: calc(100% + 6px);
          top: 50%;
          transform: translateY(-50%);
        }
      `,
    ];
  }

  render() {
    return html`<div class="tooltip">
      <slot
        name="content"
        class="tooltip-content ${this.placement}"
        style="color:${this.fontColor};max-width: ${this
          .maxWidth};white-space: ${this.textWrap
          ? "wrap"
          : "nowrap"}; line-height: ${this.textWrap ? 1.5 : 1} ; width: ${this
          .textWrap
          ? this.textWrapWidth
          : "inherit"}"
      ></slot
      ><slot></slot>
    </div>`;
  }
}

if (!customElements.get("cosy-tooltip"))
  customElements.define("cosy-tooltip", CosyTooltip);
