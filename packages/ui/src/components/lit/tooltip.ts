import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";

class CosyTooltip extends LitElement {
  @property({ type: String }) placement = "bottom"; // 默认位置为底部

  static get styles() {
    return css`
      .tooltip {
        position: relative;
        display: inline-block;
        user-select: none;
      }
      .tooltip-content {
        visibility: hidden;
        opacity: 0;
        background-color: var(--color-tooltip-bg);
        border: 1px solid var(--color-tooltip-border);
        backdrop-filter: var(--color-frost-bg);
        text-align: center;
        padding: 4px 8px;
        border-radius: var(--radius-base, 4px);
        position: absolute;
        z-index: 1;
        font-size: 12px;
        transition: opacity 0.3s ease, visibility 0.3s;
        min-width: 40px; /* 可选的最小宽度 */
        max-width: 200px; /* 可选的最大宽度 */
        white-space: nowrap; /* 防止文本换行 */
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
    `;
  }

  render() {
    return html`
      <div class="tooltip">
        <slot></slot>
        <!-- 默认插槽用于触发元素 -->
        <span class="tooltip-content ${this.placement}">
          <slot name="content"></slot>
        </span>
      </div>
    `;
  }
}

if (!customElements.get("cosy-tooltip"))
  customElements.define("cosy-tooltip", CosyTooltip);
