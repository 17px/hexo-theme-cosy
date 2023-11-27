import { LitElement } from "lit";
import { property } from "lit/decorators.js";
import { globalEventBus, EventBus } from "@cosy/util";

export class CosyElement extends LitElement {
  @property({ type: String }) uid;
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
