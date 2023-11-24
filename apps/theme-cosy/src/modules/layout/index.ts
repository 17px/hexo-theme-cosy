// 全局引入
import "@cosy/ui";
import "@cosy/ui/dist/index.css";
import { useDefaultTheme } from "@/util/theme";
import "./index.less";
const sideVisibleSVG =
  '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"></rect><path d="M9 4v16"></path></g></svg>';
const sideInvisibleSVG =
  '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"></rect><path d="M9 4v16"></path><path d="M15 10l-2 2l2 2"></path></g></svg>';

document.addEventListener("DOMContentLoaded", function () {
  useDefaultTheme();

  const button = document.querySelector(".side-navigation");
  const app = document.querySelector("#app");
  const main = document.querySelector("#app >main");
  if (button && app) {
    button.addEventListener("click", () => {
      if (app.className.includes("equip")) {
        app.classList.remove("equip");
        button.setAttribute("data-tip", window.i18n["tip-expand"]);
        button.innerHTML = sideVisibleSVG;
      } else {
        app.classList.add("equip");
        button.setAttribute("data-tip", window.i18n["tip-collapse"]);
        button.innerHTML = sideInvisibleSVG;
      }
    });
  }
  if (main && app && button) {
    main.addEventListener("click", () => {
      if (app.className.includes("equip")) {
        app.classList.remove("equip");
        button.setAttribute("data-tip", window.i18n["tip-expand"]);
        button.innerHTML = sideVisibleSVG;
      }
    });
  }
});
