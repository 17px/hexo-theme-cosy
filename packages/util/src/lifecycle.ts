/**
 * onMounted - 在文档加载和解析完成后执行回调函数
 * @param callback - 在文档完全加载后要执行的回调函数
 */
export const onMounted = (callback: () => void): void => {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback);
  } else {
    callback();
  }
};
