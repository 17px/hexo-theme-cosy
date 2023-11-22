interface HTMLElementEventMap extends GlobalEventHandlersEventMap {
  // 可以根据需要添加更多自定义事件类型
}

/**
 * addListener - 为指定的 DOM 元素添加事件监听器
 *
 * @param selector - DOM 元素的选择器字符串
 * @param eventType - 要监听的事件类型，如 'click'
 * @param handler - 事件处理函数
 */
export const addListener = (
  selector: string,
  eventType: keyof HTMLElementEventMap,
  handler: (event: Event) => void
): void => {
  const element = document.querySelector(selector);
  element?.addEventListener(eventType, handler);
};

/**
 * removeListener - 从指定的 DOM 元素移除事件监听器
 *
 * @param selector - DOM 元素的选择器字符串
 * @param eventType - 要移除的事件类型，如 'click'
 * @param handler - 事件处理函数
 */
export const removeListener = (
  selector: string,
  eventType: keyof HTMLElementEventMap,
  handler: (event: Event) => void
): void => {
  const element = document.querySelector(selector);
  element?.removeEventListener(eventType, handler);
};

/**
 * addListenerOnce - 为指定的 DOM 元素添加一次性事件监听器
 *
 * @param selector - DOM 元素的选择器字符串
 * @param eventType - 要监听的事件类型，如 'click'
 * @param handler - 事件处理函数
 */
export const addListenerOnce = (
  selector: string,
  eventType: keyof HTMLElementEventMap,
  handler: (event: Event) => void
): void => {
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
 * @param combo - 需要监听的按键组合，如 'Ctrl+C' 或 'Cmd+A'
 * @param handler - 事件处理函数
 * @param preventDefault - 是否阻止默认行为（可选，默认为 false）
 */
export const addKeyCombo = (
  combo: string,
  handler: (event: KeyboardEvent) => void,
  preventDefault: boolean = false
): (() => void) => {
  const keyCombination = combo
    .split("+")
    .map((key) => key.trim().toLowerCase());

  const keydownHandler = (event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    const isCmd = event.metaKey;
    const isCtrl = event.ctrlKey;
    const isShift = event.shiftKey;
    const isAlt = event.altKey;

    if (
      keyCombination.includes(key) &&
      ((keyCombination.includes("cmd") && isCmd) ||
        (!keyCombination.includes("cmd") && !isCmd)) &&
      ((keyCombination.includes("ctrl") && isCtrl) ||
        (!keyCombination.includes("ctrl") && !isCtrl)) &&
      ((keyCombination.includes("shift") && isShift) ||
        (!keyCombination.includes("shift") && !isShift)) &&
      ((keyCombination.includes("alt") && isAlt) ||
        (!keyCombination.includes("alt") && !isAlt))
    ) {
      if (preventDefault) {
        event.preventDefault();
      }
      handler(event);
    }
  };

  document.addEventListener("keydown", keydownHandler);

  // 返回一个函数，用于移除监听器
  return () => {
    document.removeEventListener("keydown", keydownHandler);
  };
};
