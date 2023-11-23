interface HTMLElementEventMap extends GlobalEventHandlersEventMap {
  // 可以根据需要添加更多自定义事件类型
}

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
 * addKeyCombo - 设置对特定键盘组合的监听，并可选择阻止默认行为
 *
 * @param params - 包含 combo, handler, preventDefault 的参数对象
 *   - combo: 需要监听的按键组合，如 'Ctrl+C' 或 'Cmd+A'
 *   - handler: 事件处理函数
 *   - preventDefault: 是否阻止默认行为（可选，默认为 false）
 */
export const addKeyCombo = ({
  combo,
  handler,
  preventDefault = false,
}: {
  combo: string;
  handler: (event: KeyboardEvent) => void;
  preventDefault?: boolean;
}): (() => void) => {
  const keyCombination = combo
    .split("+")
    .map((key) => key.trim().toLowerCase());

  const keydownHandler = (event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    const keyState = {
      cmd: event.metaKey,
      ctrl: event.ctrlKey,
      shift: event.shiftKey,
      alt: event.altKey,
    };

    const isComboMatch = keyCombination.every((comboKey) =>
      keyState[comboKey] !== undefined ? keyState[comboKey] : comboKey === key
    );

    if (isComboMatch) {
      if (preventDefault) event.preventDefault();
      handler(event);
    }
  };

  document.addEventListener("keydown", keydownHandler);

  return () => document.removeEventListener("keydown", keydownHandler);
};
