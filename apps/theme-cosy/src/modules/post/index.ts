import { getThemeMode } from "@/util/theme";
import "./index.less";
import { useKatex } from "./katex";
import { useMermaid } from "./mermaid";
import { useValine } from "./valine";
import { restoreScrollHeight, saveScrollHeight } from "@/util";
import { useTextEnhancer } from "./selection";
import { useCodeHelper } from "./code.helper";
import { useSplitPanel } from "@/util/split.panel";
import {
  onMounted,
  addListener,
  globalEventBus,
  addKeyPress,
} from "@cosy/util";
import { CosyElement } from "@cosy/ui";
import { TOC_INVISIBLE_KEY } from "../constant";


// 如果 key 不存在，返回 null，视为 visible
const isTocInvisible = () => localStorage.getItem(TOC_INVISIBLE_KEY) === "true";

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

// useSplitPanel();

const loadPrismThemeStyle = () => {
  const link = document.createElement("link");
  link.setAttribute("id", "prism-theme");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = `/lib/prism/one-${getThemeMode()}.css`;
  document.head.append(link);
};

onMounted(() => {
  restoreScrollHeight("main.cosy-scrollbar");

  // 页面加载时根据URL哈希高亮TOC项
  window.location.hash && highlightTOCItem(window.location.hash);

  // 文章启动插件判断
  const { mermaid, katex, valine } = window;
  // useKatex({ ...katex, enable: window.page.use.indexOf("katex") > -1 });
  // useMermaid({ ...mermaid, enable: window.page.use.indexOf("mermaid") > -1 });
  // useValine({ ...valine, enable: window.page.use.indexOf("valine") > -1 });
  useCodeHelper();
  // useTextEnhancer();

  // 加载prism样式
  loadPrismThemeStyle();

  // 监听主题切换
  // const toggleTheme = document.getElementById("toggle-theme");
  // toggleTheme?.addEventListener("click", () => {
  //   const prismLink = document.querySelector("#prism-theme");
  //   prismLink
  //     ? prismLink.setAttribute("href", `/lib/prism/one-${getThemeMode()}.css`)
  //     : loadPrismThemeStyle();
  // });

  const tocDragBox = document.querySelector("#toc-drag-box") as CosyElement;
  const button = document.querySelector("#toc-show-button") as CosyElement;

  if (tocDragBox) {
    if (isTocInvisible()) {
      tocDragBox.invisible = true;
      button.invisible = false;
    }

    globalEventBus.on(
      "cosy-drag-box:toc-box",
      (e: { detail: { invisible: any } }) => {
        const { invisible } = e.detail;
        button.invisible = !invisible;
        addListener({
          selector: "#toc-show-button",
          eventType: "click",
          handler: () => {
            tocDragBox.invisible = false;
            button.invisible = true;
          },
        });
      }
    );

    addListener({
      selector: "#toc-show-button",
      eventType: "click",
      handler: () => {
        tocDragBox.invisible = false;
        button.invisible = true;
      },
    });

    addKeyPress({
      key: "]",
      preventDefault: true,
      handler: () => {
        localStorage.setItem(TOC_INVISIBLE_KEY, String(!tocDragBox.invisible));
        tocDragBox.invisible = !tocDragBox.invisible;
        button.invisible = !button.invisible;
      },
    });
  }

  addListener({
    selector: "main.cosy-scrollbar",
    eventType: "scroll",
    handler: () => saveScrollHeight("main.cosy-scrollbar"),
  });
});
