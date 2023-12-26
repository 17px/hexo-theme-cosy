/**
 * 设置css :root 变量
 * @param {string} key
 * @param {string} value
 */
export const setRootVar = (key: string, value: string) =>
  document.documentElement.style.setProperty(key, value);
