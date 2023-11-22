import { LitElement, html, css } from "lit";

class CosyButton extends LitElement {
  static styles = css`
    button {
      background-color: var(--color-pp);
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
    }
    button:hover {
      background-color: var(--color-pp-2);
    }
  `;

  render() {
    return html` <button @click="${this.handleClick}"><slot></slot></button> `;
  }

  handleClick() {
    console.log("Button clicked 222");
    // 可以在这里添加更多的点击事件处理逻辑
  }
}

customElements.define("cosy-button", CosyButton);
