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
import { useDefaultSetting } from "./default.setting";
import { ASIDE_INVISIBLE_KEY } from "../constant";

onMounted(() => {
  useDefaultSetting();

  /**
   * 偏好设置
   */
  addListener({
    selector: "#button-preference",
    eventType: "click",
    handler: () => {
      location.href = "/cosy-preference";
    },
  });

  /**
   * 左侧菜单栏折叠
   */
  const asideBox = document.querySelector("#aside-box") as HTMLElement;
  const search = document.querySelector("#post-search");

  if (asideBox) {
    // 不折叠左侧
    if (localStorage.getItem(ASIDE_INVISIBLE_KEY) === String(true)) {
      asideBox.removeAttribute("thumb-mode");
      if (search) search.removeAttribute("icon-only");
    } else {
      asideBox.setAttribute("thumb-mode", "");
      if (search) search.setAttribute("icon-only", "");
    }

    const toggleHandler = () => {
      if (asideBox.hasAttribute("thumb-mode")) {
        asideBox.removeAttribute("thumb-mode");
        localStorage.setItem(ASIDE_INVISIBLE_KEY, String(true));
        if (search) search.removeAttribute("icon-only");
      } else {
        asideBox.setAttribute("thumb-mode", "");
        localStorage.setItem(ASIDE_INVISIBLE_KEY, String(false));
        if (search) search.setAttribute("icon-only", "");
      }
    };

    addListener({
      selector: "#left-aside-button",
      eventType: "click",
      handler: () => toggleHandler(),
    });

    addKeyPress({
      key: "[",
      preventDefault: true,
      handler: () => toggleHandler(),
    });
  }
});
