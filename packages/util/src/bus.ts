type CustomEventListener = (...args: any[]) => void;

class EventBus {
  private listeners: { [event: string]: CustomEventListener[] };

  constructor() {
    this.listeners = {};
  }

  on(event: string, listener: CustomEventListener): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  once(event: string, listener: CustomEventListener): void {
    const onceWrapper: CustomEventListener = (...args) => {
      listener(...args);
      this.off(event, onceWrapper);
    };
    this.on(event, onceWrapper);
  }

  off(event: string, listener: CustomEventListener): void {
    if (!this.listeners[event]) {
      return;
    }
    const index = this.listeners[event].indexOf(listener);
    if (index !== -1) {
      this.listeners[event].splice(index, 1);
    }
  }

  emit(event: string, ...args: any[]): void {
    const listeners = this.listeners[event];
    if (listeners && listeners.length) {
      listeners.forEach((listener) => {
        listener(...args);
      });
    }
  }
}

// 使用示例
export const eventBus = new EventBus();

// const listener = (...data: any[]) => console.log(`Received:`, ...data);
// eventBus.on("my-event", listener);

// eventBus.emit("my-event", "Hello World", "Additional Data"); // 触发事件

// eventBus.off("my-event", listener); // 移除监听器
