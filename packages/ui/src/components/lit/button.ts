import { html, css } from "lit";
import { property } from "lit/decorators.js";
import { CosyElement } from "./base";

export class CosyButton extends CosyElement {
  @property({ type: String }) size: "sm" | "md" | "lg" = "md";
  @property({ type: String }) type: "solid" | "dashed" = "solid";

  static styles = css`
    :host {
      --button-type: "solid";
    }
    button {
      transition: all 0.3s ease;
      background-color: var(--color-button-bg);
      border: 1px var(--button-type) var(--color-button-border);
      color: var(--color-button-font);
      text-align: center;
      text-decoration: none;
      border-radius: var(--radius-base, 4px);
      display: inline-flex;
      gap: 6px;
      align-items: center;
      cursor: pointer;
    }
    .size-sm {
      padding: 2px 6px;
      font-size: 12px;
    }
    .size-md {
      padding: 2px 6px;
      font-size: 14px;
    }
    .size-lg {
      padding: 2px 6px;
      font-size: 16px;
    }
    button:hover {
      color: var(--color-button-font-hover);
      background-color: var(--color-button-bg-hover);
      border-color: var(--color-button-border-hover);
    }
    .size-sm ::slotted([slot="prefix"]),
    .size-sm ::slotted([slot="suffix"]) {
      width: 12px;
      height: 12px;
    }

    .size-md ::slotted([slot="prefix"]),
    .size-md ::slotted([slot="suffix"]) {
      width: 14px;
      height: 14px;
    }

    .size-lg ::slotted([slot="prefix"]),
    .size-lg ::slotted([slot="suffix"]) {
      width: 16px;
      height: 16px;
    }

  `;

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (["type"].includes(propName)) {
        this.style.setProperty(`--button-${propName}`, this[propName]);
      }
    });
  }

  render() {
    return html`<button class="size-${this.size}" @click="${this.handleClick}">
      <!-- prefix图标插槽 -->
      <slot name="prefix"></slot>
      <!-- 文本插槽 -->
      <slot name="content"></slot>
      <!-- suffix图标插槽 -->
      <slot name="suffix"></slot>
    </button>`;
  }

  private handleClick() {
    console.log(
      "通常只处理内部的事件，外部js点击，声明 #id，在通过事件委托执行吧"
    );
  }
}

if (!customElements.get("cosy-button"))
  customElements.define("cosy-button", CosyButton);
