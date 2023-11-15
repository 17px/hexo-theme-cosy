import "./selection.less";

type SelectionCallback = (result: {
  selectedElements: Node[];
  selectedText: string;
  range: Range;
}) => void;

const listenForSelection = (
  selector: string,
  callback: SelectionCallback
): void => {
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

        callback({ selectedElements, selectedText, range });
      }
    }
  });
};

export const useTextEnhancer = () => {
  listenForSelection(".article-container article", (result) => {
    const { range, selectedText } = result;
    console.log("Selection result:", result);
    document.addEventListener("mouseup", () => {
      const rect = range.getBoundingClientRect();
      createDivAtPosition(rect);
    });
  });
};

const items = [
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M4.098 12H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5.304l-.57.573a2.5 2.5 0 0 1-.568.426H16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h.08a1.483 1.483 0 0 1-.067-.587l.004-.042l.028-.165l.053-.206zm8.076-9.38a2.263 2.263 0 0 1 3.07-.125l.13.12l.126.136a2.276 2.276 0 0 1 0 2.952l-.12.13l-5.963 5.99a1.5 1.5 0 0 1-.547.35l-.157.047l-3.086.76a.5.5 0 0 1-.618-.526l.015-.084l.792-3.07a1.5 1.5 0 0 1 .283-.566l.106-.118l5.969-5.995zm2.494.703a1.263 1.263 0 0 0-1.683-.089l-.103.093L6.914 9.32a.5.5 0 0 0-.1.145l-.03.083l-.583 2.26l2.273-.56a.501.501 0 0 0 .113-.043l.052-.03l.07-.06l5.962-5.988a1.277 1.277 0 0 0-.003-1.805z" fill="currentColor"></path></g></svg>`,
    value: "马克",
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M10.464 2.314a.5.5 0 0 0-.928 0l-3 7.5a.5.5 0 1 0 .928.372l1.073-2.682h2.926l1.073 2.682a.5.5 0 1 0 .928-.372l-3-7.5zM10 3.846l1.063 2.658H8.937L10 3.846zM4.5 12A1.5 1.5 0 0 0 3 13.5v3A1.5 1.5 0 0 0 4.5 18h11a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.5-1.5h-11zM4 13.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-3z" fill="currentColor"></path></g></svg>`,
    value: "颜色",
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M10.461 3.806a.5.5 0 0 0-.921 0l-4 9.5a.5.5 0 1 0 .92.388L8.017 10h3.968l1.555 3.694a.5.5 0 1 0 .922-.388l-4-9.5zM11.563 9H8.438L10 5.288L11.563 9z" fill="currentColor"></path><path d="M2.5 16a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-15z" fill="currentColor"></path></g></svg>`,
    value: "直线",
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M10.142 10.5H6.86L8.5 5.815l1.641 4.685zm.526 1.5l.33.944l1.178-1.177l-2.873-8.198c-.266-.759-1.339-.759-1.605 0L4.042 14.003a.75.75 0 0 0 1.416.496L6.333 12h4.335zm5.14-2.452l-4.829 4.83a2.197 2.197 0 0 0-.578 1.02l-.374 1.498a.916.916 0 0 0-.024.14a4.601 4.601 0 0 1-1.111-.088c-.073-.017-.1-.11-.066-.178c.18-.348.233-1.073-.404-1.33c-.86-.345-1.978.125-2.862.498c-.366.154-.692.29-.944.346c-.387.086-.848-.065-1.216-.249c-.212-.106-.482.082-.36.286c.219.366.614.737 1.326.825c.82.102 1.391-.152 1.975-.41c.4-.178.805-.358 1.3-.428c.086-.012.145.09.112.17c-.152.357-.133.894.316 1.244c.518.405 2.191.511 3.313.183l1.221-.305c.387-.097.74-.296 1.021-.578l4.83-4.83a1.87 1.87 0 0 0-2.645-2.644z" fill="currentColor"></path></g></svg>`,
    value: "波浪线",
  },
];

function createDivAtPosition(rect: DOMRect) {
  document.querySelectorAll(".text-tab").forEach((i) => i.remove());
  const div = document.createElement("div");
  div.classList.add("text-tab");
  const ul = document.createElement("ul");
  items.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.icon}<div>${item.value}</div>`;
    ul.appendChild(li);
  });
  div.append(ul);
  div.style.left = `${window.scrollX + rect.left + rect.width / 2}px`;
  div.style.top = `${window.scrollY + rect.top - 50 - 10}px`;

  document.body.appendChild(div);
}
