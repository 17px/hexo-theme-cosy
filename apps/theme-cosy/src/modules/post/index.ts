import "./index.less";
import { useKatex } from "./katex";
import { useMermaid } from "./mermaid";
import { useValine } from "./valine";
import { loadFromCDN, restoreScrollHeight, saveScrollHeight } from "@/util";
import { useCodeHelper } from "./code.helper";

import {
  onMounted,
  addListener,
  globalEventBus,
  addKeyPress,
} from "@cosy/util";
import { CosyElement } from "@cosy/ui";
import { TOC_INVISIBLE_KEY } from "../constant";
import { getCurrentTheme } from "../layout/default.setting";

/**
 * 高亮TOC项
 */
const highlightTOCItem = (hash: string) => {
  const tocLinks = document.querySelectorAll(".toc a");
  tocLinks.forEach((link) => link.classList.remove("active"));
  const activeLink = document.querySelector('.toc a[href="' + hash + '"]');
  if (activeLink) activeLink.classList.add("active");
};

/**
 * 点击tocItem
 */
document.addEventListener("click", function (event) {
  const target = event.target as Element;
  const triggerElement = target.closest(".toc-link");
  if (triggerElement) {
    const href = triggerElement.getAttribute("href");
    if (href) highlightTOCItem(href);
  }
});

const loadPrismThemeStyle = () => {
  const link = document.createElement("link");
  link.setAttribute("id", "prism-theme");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = `/lib/prism/one-${getCurrentTheme()}.css`;
  document.head.append(link);
};

onMounted(() => {
  restoreScrollHeight("main.cosy-scrollbar");

  // 页面加载时根据URL哈希高亮TOC项
  window.location.hash && highlightTOCItem(window.location.hash);

  // 文章启动插件判断
  const { mermaid, katex, valine } = window;
  useKatex({ ...katex, enable: window.page.use.indexOf("katex") > -1 });
  useMermaid({ ...mermaid, enable: window.page.use.indexOf("mermaid") > -1 });
  useValine({ ...valine, enable: window.page.use.indexOf("valine") > -1 });
  useCodeHelper();
  // useTextEnhancer();

  // 加载prism样式
  loadPrismThemeStyle();

  const tocDragBox = document.querySelector("#toc-drag-box") as CosyElement;

  if (tocDragBox) {
    localStorage.getItem(TOC_INVISIBLE_KEY) === "true"
      ? tocDragBox.setAttribute("invisible", "")
      : tocDragBox.removeAttribute("invisible");

    globalEventBus.on("cosy-drag-box:toc-box", () => {
      localStorage.setItem(TOC_INVISIBLE_KEY, "true");
      tocDragBox.invisible = true;
    });

    addListener({
      selector: "#toc-show-button",
      eventType: "click",
      handler: () => {
        localStorage.setItem(TOC_INVISIBLE_KEY, "" + !tocDragBox.invisible);
        tocDragBox.invisible = !tocDragBox.invisible;
      },
    });

    addKeyPress({
      key: "]",
      preventDefault: true,
      handler: () => {
        localStorage.setItem(TOC_INVISIBLE_KEY, "" + !tocDragBox.invisible);
        tocDragBox.invisible = !tocDragBox.invisible;
      },
    });
  }

  addListener({
    selector: "main.cosy-scrollbar",
    eventType: "scroll",
    handler: () => saveScrollHeight("main.cosy-scrollbar"),
  });
});
