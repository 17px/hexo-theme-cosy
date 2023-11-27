type EventCallback = (event: CustomEvent) => void;

export class EventBus {
  emit(eventType: string, detail?: any, target: EventTarget = document): void {
    const event = new CustomEvent(eventType, {
      detail: detail,
      bubbles: true,
      composed: true,
    });
    target.dispatchEvent(event);
  }

  on(
    eventType: string,
    callback: EventCallback,
    target: EventTarget = document
  ): void {
    target.addEventListener(eventType, callback as EventListener);
  }

  off(
    eventType: string,
    callback: EventCallback,
    target: EventTarget = document
  ): void {
    target.removeEventListener(eventType, callback as EventListener);
  }
}

export const globalEventBus = new EventBus();
