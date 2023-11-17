import "./selection.less";
import {
  EffectiveElements,
  calculateHorizontalOffset,
  items,
  effectiveHtmlTags,
} from "./selection.util";

const container = document.querySelector(".article-container article")!;

const tabItemHandler = (
  parentNode: HTMLElement,
  item: { icon: string; value: string }
) => {
  switch (item.value) {
    case "锚点":
      parentNode.querySelectorAll(".flag").forEach((i) => i.remove());
      const span = document.createElement("span");
      span.classList.add("flag");
      span.innerHTML = item.icon;
      parentNode.appendChild(span);
      parentNode.classList.add("flag-paragraph");
      break;
    case "疑问":
      console.log("疑问");
      break;
    case "惊叹":
      console.log("惊叹");
      break;
    default:
      break;
  }
};

/**
 * 渲染textTab
 */
const renderTextTab = (parentNode: HTMLElement, range: Range) => {
  const { startContainer, startOffset } = range;
  parentNode.classList.add("select-wrap");
  const div = document.createElement("div");
  div.classList.add("text-tab");
  const ul = document.createElement("ul");

  items.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.icon}`;
    li.classList.add("tip", "right");
    li.setAttribute("data-tip", item.value);
    li.addEventListener("click", () => tabItemHandler(parentNode, item));
    ul.appendChild(li);
  });

  div.append(ul);
  parentNode.appendChild(div);
  document.removeEventListener("selectionchange", selectionChangeHandler);
};

/**
 * 移除textTab
 */
const removeTextTabs = () =>
  [...document.querySelectorAll(".text-tab")].forEach((tab) => tab.remove());

const getDirectChildOfArticle = (element: Node) => {
  let currentElement = element;
  while (
    currentElement &&
    currentElement.parentElement &&
    currentElement.parentElement.tagName !== "ARTICLE"
  ) {
    currentElement = currentElement.parentElement;
  }
  return currentElement as HTMLElement;
};

/**
 * 选中文本
 */
const selectionChangeHandler = () => {
  const mouseUpHandler = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
      const range = selection.getRangeAt(0);
      const { startContainer: start, endContainer: end } = range;
      // const parentNode = node_start.parentNode as EffectiveElements;
      if (container.contains(start) && container.contains(end)) {
        const paragraph = getDirectChildOfArticle(start);
        if (paragraph && container.contains(paragraph)) {
          removeTextTabs();
          renderTextTab(paragraph, range);
        }
      }
    } else {
      setTimeout(() => removeTextTabs(), 0);
    }
  };

  const selection = window.getSelection();
  selection && selection.rangeCount > 0 && !selection.isCollapsed
    ? document.addEventListener("mouseup", mouseUpHandler)
    : document.removeEventListener("mouseup", mouseUpHandler);
};

export const useTextEnhancer = () => {
  document.addEventListener("selectionchange", selectionChangeHandler);
};
