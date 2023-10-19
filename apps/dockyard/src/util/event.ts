export class EventBus {
  private listeners: { [event: string]: Function[] } = {};

  // 订阅事件
  on(eventName: string, callback: Function): void {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(callback);
  }

  // 取消订阅
  off(eventName: string, callback: Function): void {
    const callbacks = this.listeners[eventName];
    if (callbacks) {
      this.listeners[eventName] = callbacks.filter((cb) => cb !== callback);
    }
  }

  // 发布事件
  emit(eventName: string, ...args: any[]): void {
    const callbacks = this.listeners[eventName];
    if (callbacks && callbacks.length) {
      callbacks.forEach((callback) => {
        callback(...args);
      });
    }
  }
}