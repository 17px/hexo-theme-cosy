import { html, css } from "lit";
import { property } from "lit/decorators.js";
import { CosyElement } from "./base";

export const HTML_TAG = "cosy-drag-box";

class CosyDragBox extends CosyElement {
  @property({ type: String })
  trigger: "left" | "right" = "right";
  @property({ type: Number, attribute: "min-width" })
  minWidth = 100;
  @property({ type: Number, attribute: "threshold" })
  hideThreshold = 50;

  private dragging = null;
  private startX = 0;
  private startWidth = 0;

  static get styles() {
    return [
      CosyElement.styles,
      css`
        :host {
          display: block;
          position: relative;
          overflow-x: hidden;
        }
        .dragger {
          position: absolute;
          background-color: var(--color-dragger);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .dragger:hover {
          opacity: 1;
        }
        .dragger[dragging] {
          opacity: 1;
        }
        .dragger-left,
        .dragger-right {
          top: 0;
          bottom: 0;
          width: 3px;
          cursor: col-resize;
        }
        .dragger-left {
          left: 0;
        }
        .dragger-right {
          right: 0;
        }
      `,
    ];
  }

  private drag = (e: MouseEvent) => {
    if (!this.dragging) return;
    this.updateDraggerOpacity();
    const dx = e.clientX - this.startX;
    // left -> trigger='right'往左边拖拽
    const newSize =
      this.dragging === "left" ? this.startWidth - dx : this.startWidth + dx;
    if (newSize > this.minWidth) {
      this.style["width"] = `${newSize}px`;
    } else if (newSize < this.hideThreshold) {
      this.invisible = true;
      this.dragging = null;
      this.eventBus.emit(`${HTML_TAG}:${this.uid}`, {
        uid: this.uid,
        invisible: true,
      });
    }
  };

  private stopDrag = () => {
    if (this.dragging) {
      document.removeEventListener("mousemove", this.drag);
      document.removeEventListener("mouseup", this.stopDrag);
      this.dragging = null;
    }
    this.updateDraggerOpacity();
  };

  startDrag = (e: MouseEvent, side: string) => {
    this.dragging = side;
    this.startX = e.clientX;
    this.startWidth = this.offsetWidth;
    document.addEventListener("mousemove", this.drag);
    document.addEventListener("mouseup", this.stopDrag);
    e.preventDefault();
  };

  updateDraggerOpacity() {
    this.shadowRoot
      ?.querySelectorAll(".dragger")
      ?.forEach((dragger: HTMLElement) => {
        !this.dragging
          ? dragger.removeAttribute("style")
          : (dragger.style.opacity = "1");
      });
  }

  renderDragger = () => {
    const side = this.trigger;
    return html`
      <div
        class="dragger dragger-${side}"
        @mousedown="${(e: MouseEvent) => this.startDrag(e, side)}"
      ></div>
    `;
  };

  render() {
    const styles = `min-width: ${this.minWidth}px;border-${this.trigger}:1px solid var(--color-border)`;
    return html`
      <div style="${styles}">
        ${this.renderDragger()}
        <slot></slot>
      </div>
    `;
  }
}

if (!customElements.get(HTML_TAG)) customElements.define(HTML_TAG, CosyDragBox);
