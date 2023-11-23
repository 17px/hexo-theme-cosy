import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("cosy-button")
export class CosyButton extends LitElement {
  static styles = css`
    button {
      transition: all 0.3s ease;
      background-color: var(--color-button-bg);
      border: 1px solid var(--color-button-border);
      color: var(--color-button-font);
      padding: 8px 14px;
      text-align: center;
      text-decoration: none;
      border-radius: var(--radius-base, 4px);
      display: inline-flex;
      align-items: center;
      font-size: 14px;
      cursor: pointer;
    }
    button:hover {
      background-color: var(--color-button-bg-hover);
    }
    button ::slotted([slot="prefix"]) {
      margin-right: 4px;
      width: 16px;
      height: 16px;
      color: var(--color-button-font);
    }
    button ::slotted([slot="suffix"]) {
      margin-left: 4px;
      width: 16px;
      height: 16px;
      color: var(--color-button-font);
    }
  `;

  render() {
    return html`<button @click="${this.handleClick}">
      <!-- prefix图标插槽 -->
      <slot name="prefix"></slot>
      <!-- 文本插槽 -->
      <slot></slot>
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
