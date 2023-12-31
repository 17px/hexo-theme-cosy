import { html, css } from "lit";
import { property } from "lit/decorators.js";
import { CosyElement } from "./base";

export class CosySearch extends CosyElement {
  @property({ type: String }) placeholder: string = "搜索";
  @property({ type: Boolean, attribute: "icon-only" })
  iconOnly: boolean = false;

  static get styles() {
    return [
      CosyElement.styles,
      css`
        form {
          display: flex;
          align-items: center;
          padding: 0 6px;
          height: 32px;
          border-radius: var(--radius-base, 4px);
          background: var(--color-search-bg);
          border: 1px solid var(--color-search-border);
          transition: all 0.3s;
          cursor: pointer;
        }
        .icon-only {
          display: inline-flex;
          justify-content: center;
          padding: 6px;
          height: auto;
        }
        .icon-only span {
          display: none;
        }
        .icon-only slot {
          display: none;
        }
        form:hover {
          border-color: var(--color-search-border-hover);
        }
        svg {
          transition: all 0.3s;
          color: var(--color-search-font);
          width: 16px;
          height: 16px;
        }
        span {
          flex: 1;
          padding: 0 6px;
          font-size: 13px;
          color: var(--color-search-font);
        }
      `,
    ];
  }

  private handleClick() {
    console.log("search clicked");
  }

  render() {
    return html`<form
      @click="${this.handleClick}"
      class="${this.iconOnly ? "icon-only" : ""}"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 20 20"
      >
        <g fill="none">
          <path
            d="M8.5 3a5.5 5.5 0 0 1 4.227 9.02l4.127 4.126a.5.5 0 0 1-.638.765l-.07-.057l-4.126-4.127A5.5 5.5 0 1 1 8.5 3zm0 1a4.5 4.5 0 1 0 0 9a4.5 4.5 0 0 0 0-9z"
            fill="currentColor"
          ></path>
        </g>
      </svg>
      <span>${this.placeholder}</span>
      <slot name="short-key"></slot>
    </form>`;
  }
}

if (!customElements.get("cosy-search"))
  customElements.define("cosy-search", CosySearch);
