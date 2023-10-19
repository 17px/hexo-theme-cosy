import { getThemeMode } from "@/util/theme";
import "./index.less";
import { useKatex } from "./katex";
import { useMermaid } from "./mermaid";
import { useValine } from "./valine";
import { restoreScrollHeight, saveScrollHeight } from "@/util";
import "./selection";

const themeCodeLessMap = {
  light: "prism-one-light",
  dark: "prism-one-dark",
};

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
    console.log(href);
    if (href) highlightTOCItem(href);
  }
});

// 页面初始化
document.addEventListener("DOMContentLoaded", function () {
  restoreScrollHeight("main.scrollbar-obtrusive");
  // 页面加载时根据URL哈希高亮TOC项
  const { hash } = window.location;
  if (hash) highlightTOCItem(hash);
  const { mermaid, katex, valine } = window;
  useKatex(katex);
  useMermaid(mermaid);
  useValine(valine);
  // 加载prism样式
  import(`./prism/${themeCodeLessMap[getThemeMode()]}.less`);
  // 监听主题切换
  const toggleTheme = document.getElementById("toggle-theme");
  toggleTheme?.addEventListener("click", () => {
    saveScrollHeight("main.scrollbar-obtrusive");
    window.location.reload();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const articleDom = document.querySelector("main.scrollbar-obtrusive");
  articleDom &&
    articleDom.addEventListener("scroll", () => {
      saveScrollHeight("main.scrollbar-obtrusive");
    });
});
