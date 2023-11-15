import { EventBus } from "./event";

type CDNResource = {
  type: "css" | "js";
  url: string;
  id?: string;
};

export const eventBus = new EventBus();

/**
 * use js load remote resource
 */
export const loadFromCDN = (resources: CDNResource[]): Promise<void[]> => {
  return Promise.all(
    resources.map((resource) => {
      return new Promise<void>((resolve, reject) => {
        if (resource.type === "css") {
          const link = document.createElement("link");
          link.href = resource.url;
          link.rel = "stylesheet";
          link.onload = () => resolve();
          link.onerror = () =>
            reject(new Error(`Failed to load CSS from ${resource.url}`));
          document.head.appendChild(link);
        } else if (resource.type === "js") {
          const script = document.createElement("script");
          script.src = resource.url;
          if (resource.id) script.id = resource.id;
          script.onload = () => resolve();
          script.onerror = () =>
            reject(new Error(`Failed to load JS from ${resource.url}`));
          document.body.appendChild(script);
        } else {
          reject(new Error("Invalid resource type specified."));
        }
      });
    })
  );
};

/**
 * render katex in selector
 * @param {string} selector katex公式的容器selector
 */
export const renderMathInElement = (selector: string): void => {
  const inlineMathPattern = /\$\$(.+?)\$\$/g;
  const displayMathPattern = /\\\[(.+?)\\\]/g;

  // 辅助函数：替换文本节点中的内容
  function replaceTextWithKatex(
    node: ChildNode,
    regex: RegExp,
    displayMode: boolean
  ) {
    let match: RegExpExecArray | null;
    const ranges: Range[] = [];

    while ((match = regex.exec(node.nodeValue!)) !== null) {
      const range = document.createRange();
      range.setStart(node, match.index);
      range.setEnd(node, match.index + match[0].length);
      ranges.push(range);
    }

    for (const range of ranges) {
      const formula = range.toString().replace(/^\$\$|\$\$$|\\\[|\\\]$/g, "");
      const span = document.createElement("span");
      span.innerHTML = window.katex.renderToString(formula, {
        throwOnError: false,
        displayMode: displayMode,
      });
      range.deleteContents();
      range.insertNode(span);
    }
  }

  // 遍历选择器下的每一个文本节点
  const containerElements = document.querySelectorAll(selector);
  containerElements.forEach((container) => {
    const walk = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      null
    );
    let node: Text | null;
    while ((node = walk.nextNode() as Text | null)) {
      replaceTextWithKatex(node, inlineMathPattern, false);
      replaceTextWithKatex(node, displayMathPattern, true);
    }
  });
};

/**
 * Fetch data from a given URL.
 *
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<any>} - A promise that resolves to the fetched data.
 */
export const fetchData = (url: string) => {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok (Status: ${response.status})`
        );
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Fetch error:", error.message);
      throw error; // Re-throw to let the caller handle the error.
    });
};

export const saveScrollHeight = (selector: string) => {
  const element = document.querySelector<HTMLElement>(selector);
  if (element) {
    const scrolledHeight = element.scrollTop;
    localStorage.setItem("scrolledHeight", String(scrolledHeight));
  } else {
    console.warn("Element not found for selector:", selector);
  }
};

export const restoreScrollHeight = (selector: string) => {
  const element = document.querySelector<HTMLElement>(selector);
  if (element) {
    const recordedHeight = localStorage.getItem("scrolledHeight");
    if (recordedHeight) {
      element.scrollTop = Number(recordedHeight);
    }
  } else {
    console.warn("Element not found for selector:", selector);
  }
};

export const copyToClipboard = (text: string) => {
  // 创建一个 textarea 元素
  const textarea = document.createElement("textarea");
  // 设置其值为当前 URL
  textarea.value = text;
  // 将它添加到文档中（注意：这里并没有将它显示出来）
  document.body.appendChild(textarea);
  // 选择 textarea 的内容
  textarea.select();
  // 执行复制操作
  document.execCommand("copy");
  // 从文档中移除 textarea
  document.body.removeChild(textarea);
};
