// 全局引入
import "@cosy/ui";
import "@cosy/ui/dist/index.css";
import {
  addKeyPress,
  addListener,
  globalEventBus,
  onMounted,
} from "@cosy/util";
import "./index.less";
import { CosyElement } from "@cosy/ui";
import { themeIntroduction } from "./theme.intro";
import { useDefaultSetting } from "./default.setting";
import { ASIDE_INVISIBLE_KEY } from "../constant";

onMounted(() => {
  useDefaultSetting();

  addListener({
    selector: "#button-preference",
    eventType: "click",
    handler: () => {
      location.href = "/cosy-preference";
    },
  });

  addListener({
    selector: "#button-about-cosy-theme",
    eventType: "click",
    handler: () => {
      const popup = document.createElement("cosy-popup") as CosyElement;
      const slotContent = themeIntroduction;
      popup.innerHTML = slotContent;
      document.body.append(popup);
    },
  });

  const asideBox = document.querySelector("#aside-box") as HTMLElement;

  if (asideBox) {
    localStorage.getItem(ASIDE_INVISIBLE_KEY) === "true"
      ? asideBox.setAttribute("thumb-mode", "")
      : asideBox.removeAttribute("thumb-mode");

    addListener({
      selector: "#left-aside-button",
      eventType: "click",
      handler: () => {
        asideBox.hasAttribute("thumb-mode")
          ? asideBox.removeAttribute("thumb-mode")
          : asideBox.setAttribute("thumb-mode", "");
        localStorage.setItem(
          ASIDE_INVISIBLE_KEY,
          "" + asideBox.hasAttribute("thumb-mode")
        );
      },
    });

    addKeyPress({
      key: "[",
      preventDefault: true,
      handler: () => {
        asideBox.hasAttribute("thumb-mode")
          ? asideBox.removeAttribute("thumb-mode")
          : asideBox.setAttribute("thumb-mode", "");
        localStorage.setItem(
          ASIDE_INVISIBLE_KEY,
          "" + asideBox.hasAttribute("thumb-mode")
        );
      },
    });
  }
});
