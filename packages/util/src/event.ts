interface HTMLElementEventMap extends GlobalEventHandlersEventMap {}

/**
 * addListener - 为指定的 DOM 元素添加事件监听器
 * @param params 对象参数
 * @param params.selector DOM 元素的选择器字符串
 * @param params.eventType 要监听的事件类型，如 'click'
 * @param params.handler 当事件触发时调用的事件处理函数
 */
export const addListener = ({
  selector,
  eventType,
  handler,
}: {
  selector: string;
  eventType: keyof HTMLElementEventMap;
  handler: (event: Event) => void;
}): void => {
  const element = document.querySelector(selector);
  element?.addEventListener(eventType, handler);
};

/**
 * removeListener - 从指定的 DOM 元素移除事件监听器
 * @param params 对象参数
 * @param params.selector DOM 元素的选择器字符串
 * @param params.eventType 要移除的事件类型，如 'click'
 * @param params.handler 当事件触发时之前添加的事件处理函数
 */
export const removeListener = ({
  selector,
  eventType,
  handler,
}: {
  selector: string;
  eventType: keyof HTMLElementEventMap;
  handler: (event: Event) => void;
}): void => {
  const element = document.querySelector(selector);
  element?.removeEventListener(eventType, handler);
};

/**
 * addListenerOnce - 为指定的 DOM 元素添加一次性事件监听器
 * @param params 对象参数
 * @param params.selector DOM 元素的选择器字符串
 * @param params.eventType 要监听的事件类型，如 'click'
 * @param params.handler 当事件触发时调用的事件处理函数
 */
export const addListenerOnce = ({
  selector,
  eventType,
  handler,
}: {
  selector: string;
  eventType: keyof HTMLElementEventMap;
  handler: (event: Event) => void;
}): void => {
  const element = document.querySelector(selector);
  const onceHandler = (event: Event) => {
    handler(event);
    element?.removeEventListener(eventType, onceHandler);
  };
  element?.addEventListener(eventType, onceHandler);
};

/**
 * addKeyPress - 设置对键盘的监听，并可选择阻止默认行为
 *
 * @param params - key combo, handler, preventDefault 的参数对象
 *   - key: 需要监听的按键、按键control组合(+)链接，windows平台ctrl和mac command键
 *   - handler: 事件处理函数
 *   - preventDefault: 是否阻止默认行为（可选，默认为 false）
 */
export const addKeyPress = ({
  key,
  handler,
  preventDefault = false,
}: {
  key: string;
  handler: (event: KeyboardEvent) => void;
  preventDefault?: boolean;
}): (() => void) => {
  // 将键值字符串分解为单独的键
  const keys = key
    .toLowerCase()
    .split("+")
    .map((k) => k.trim());

  // 检查是否是Mac平台
  const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);

  const keydownHandler = (event: KeyboardEvent) => {
    const isComboMatch = keys.every((k) => {
      // 根据平台自动映射control键
      if (k === "control") {
        return isMac ? event.metaKey : event.ctrlKey;
      }
      // 对于其他键，直接检查event.key
      return event.key.toLowerCase() === k;
    });

    if (isComboMatch) {
      if (preventDefault) event.preventDefault();
      handler(event);
    }
  };

  document.addEventListener("keydown", keydownHandler);
  return () => document.removeEventListener("keydown", keydownHandler);
};
