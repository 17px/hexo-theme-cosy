import { html, css } from "lit";
import { property } from "lit/decorators.js";
import { CosyElement } from "./base";

export class CosySwitch extends CosyElement {
  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: String }) width: string = "48px"; // 默认宽度
  @property({ type: String }) height: string = "24px"; // 默认高度
  @property({ type: String }) radius: string = "15px"; // 默认值为15px

  static styles = css`
    :host {
      --switch-width: 48px; /* 默认宽度 */
      --switch-height: 24px; /* 默认高度 */
      --switch-radius: 15px; /* 默认圆角 */
    }
    .switch {
      width: var(--switch-width);
      height: var(--switch-height);
      border-radius: var(--switch-radius);
      background-color: var(--color-switch-track-bg);
      border: 1px solid var(--color-switch-border);
      position: relative;
      cursor: pointer;
      transition: border 0.3s, background-color 0.3s;
    }
    .switch:hover {
      border-color: var(--color-switch-border-hover);
    }
    .switch-knob {
      position: absolute;
      width: 50%;
      height: 100%;
      background-color: var(--color-switch-bg);
      border-radius: var(--switch-radius);
      transition: background-color 0.3s, border 0.3s, left 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      left: 0;
    }
    :host([checked]) .switch {
      background-color: var(--color-switch-track-bg-checked);
    }
    :host([checked]) .switch-knob {
      left: 50%;
      color: var(--color-switch-font-checked);
      background-color: var(--color-switch-bg-checked);
    }
    .content {
      position: absolute;
      width: 100%;
      height: 100%;
      display: none;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .content ::slotted(*) {
      max-width: 70%;
      max-height: 70%;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    :host(:not([checked])) .content-left,
    :host([checked]) .content-right {
      display: flex;
    }
  `;

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (["width", "height", "radius"].includes(propName)) {
        this.style.setProperty(`--switch-${propName}`, this[propName]);
      }
    });
  }

  private toggleChecked() {
    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent("change", { detail: this.checked }));
  }

  render() {
    return html`
      <div
        class="switch"
        style="border-radius: ${this.radius}; width: ${this
          .width}; height: ${this.height};"
        @click="${this.toggleChecked}"
      >
        <div class="switch-knob" style="border-radius: ${this.radius};">
          <div class="content content-left">
            <slot name="left"></slot>
          </div>
          <div class="content content-right">
            <slot name="right"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

if (!customElements.get("cosy-switch"))
  customElements.define("cosy-switch", CosySwitch);
