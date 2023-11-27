import { html, css } from "lit";
import { property } from "lit/decorators.js";
import { CosyElement } from "./base";

export const HTML_TAG = "cosy-drag-box";

class CosyDragBox extends CosyElement {
  @property({ type: Boolean }) dragLeft = false;
  @property({ type: Boolean }) dragRight = false;
  @property({ type: Number }) minWidth = 100;
  @property({ type: Number }) hideThreshold = 50;

  private dragging = null;
  private startX = 0;
  private startWidth = 0;

  static get styles() {
    return css`
      :host {
        display: block;
        position: relative;
        border-right: 1px solid var(--color-border);
      }
      .dragger {
        position: absolute;
        background-color: var(--color-dragger);
        opacity: 0; /* 初始为隐藏状态 */
        transition: opacity 0.2s;
      }
      .dragger:hover {
        opacity: 1; /* 鼠标悬停时显示 */
      }
      .dragger-left,
      .dragger-right {
        top: 0;
        bottom: 0;
        width: 2px;
        cursor: col-resize;
      }
      .dragger-left {
        left: -1px;
      }
      .dragger-right {
        right: -1px;
      }
    `;
  }

  private drag = (e: MouseEvent) => {
    const { clientX } = e;
    if (!this.dragging) return;
    const dx = clientX - this.startX;
    const newSize =
      this.dragging === "left" ? this.startWidth - dx : this.startWidth + dx;
    if (newSize > this.minWidth) {
      this.style["width"] = `${newSize}px`;
      this.style["transform"] = "scale(1)";
    } else if (newSize < this.minWidth - this.hideThreshold) {
      this.style["transform"] = "scale(0)";
      this.style["width"] = "0";
    }
  };

  private stopDrag = () => {
    this.eventBus.emit(`${HTML_TAG}:${this.uid}`, {
      uid: this.uid,
      inVisible: this.style.width === "0px",
    });
    if (this.dragging) {
      document.removeEventListener("mousemove", this.drag);
      document.removeEventListener("mouseup", this.stopDrag);
      this.dragging = null;
    }
  };

  connectedCallback() {
    super.connectedCallback();
    // 添加事件监听器
    this.eventBus.on("cosy-drag-box:left-aside-show", () => {
      this.style["width"] = `${this.minWidth}px`;
      this.style["transform"] = "scale(1)";
    });
  }

  startDrag = (e: MouseEvent, side: string) => {
    this.dragging = side;
    this.startX = e.clientX;
    this.startWidth = this.offsetWidth;
    document.addEventListener("mousemove", this.drag);
    document.addEventListener("mouseup", this.stopDrag);

    e.preventDefault();
  };

  renderDragger = () => {
    const side = this.dragRight ? "right" : "left";
    return html`
      <div
        class="dragger dragger-${side}"
        @mousedown="${(e: MouseEvent) => this.startDrag(e, side)}"
      ></div>
    `;
  };

  render() {
    return html`
      <div style="min-width: ${this.minWidth}px">
        ${this.renderDragger()}
        <slot></slot>
      </div>
    `;
  }
}

if (!customElements.get(HTML_TAG)) customElements.define(HTML_TAG, CosyDragBox);
