import { LitElement, css, html, CSSResultGroup } from "lit";
import { property } from "lit/decorators.js";
import { globalEventBus, EventBus } from "@cosy/util";

export class CosyElement extends LitElement {
  @property({ type: String }) uid;
  @property({ type: Boolean }) disabled;
  @property({ type: Boolean, reflect: true }) invisible = false;

  static styles = css`
    :host([invisible]) {
      display: none;
    }
    :host([disabled]) {
      pointer-events: none;
      opacity: 0.6;
    }
  ` as CSSResultGroup;
  eventBus: EventBus;
  constructor() {
    super();
    this.uid = this.generateUniqueId();
    this.eventBus = globalEventBus;
  }

  generateUniqueId() {
    return `unique-${Math.random().toString(36).slice(2, 11)}`;
  }
}
