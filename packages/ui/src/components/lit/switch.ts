import { html, css } from "lit";
import { property } from "lit/decorators.js";
import { CosyElement } from "./base";

export class CosySwitch extends CosyElement {
  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: String }) size: "sm" | "md" | "lg" = "md";

  static get styles() {
    return [
      CosyElement.styles,
      css`
        .switch-sm {
          --switch-width: 36px; /* 默认宽度 */
          --switch-height: 18px; /* 默认高度 */
          --switch-radius: 9px; /* 默认圆角 */
        }
        .switch-md {
          --switch-width: 42px; /* 默认宽度 */
          --switch-height: 20px; /* 默认高度 */
          --switch-radius: 10px; /* 默认圆角 */
        }
        .switch-lg {
          --switch-width: 48px; /* 默认宽度 */
          --switch-height: 24px; /* 默认高度 */
          --switch-radius: 12px; /* 默认圆角 */
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
          transform: scale(1.05);
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
      `,
    ];
  }

  private toggleChecked() {
    this.checked = !this.checked;
  }

  render() {
    return html`
      <div class="switch switch-${this.size}" @click="${this.toggleChecked}">
        <div class="switch-knob">
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
