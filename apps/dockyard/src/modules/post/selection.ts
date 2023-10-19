type SelectionCallback = (result: {
  selectedElements: Node[];
  selectedText: string;
}) => void;

function listenForSelection(
  selector: string,
  callback: SelectionCallback
): void {
  const container = document.querySelector(selector);

  if (!container) {
    console.error(`Element with selector ${selector} not found.`);
    return;
  }

  document.addEventListener("selectionchange", () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
      const range = selection.getRangeAt(0);
      if (
        container.contains(range.startContainer as Node) &&
        container.contains(range.endContainer as Node)
      ) {
        // 获取选中的文本
        const selectedText = selection.toString();

        // 获取选中的 DOM 元素
        const elements: Node[] = [];
        const iterator = document.createNodeIterator(
          range.commonAncestorContainer,
          NodeFilter.SHOW_ELEMENT
        );

        let currentNode: Node | null;
        while ((currentNode = iterator.nextNode())) {
          if (range.intersectsNode(currentNode)) {
            elements.push(currentNode);
          }
        }

        // 过滤出selector
        const selectedElements = elements.filter((el) => container !== el);

        // 使用回调函数返回结果
        callback({ selectedElements, selectedText });
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  listenForSelection(".article-container article", (result) => {
    console.log("Selection result:", result);
  });
});
