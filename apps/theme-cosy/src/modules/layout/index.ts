// 全局引入
import "@cosy/ui";
import "@cosy/ui/dist/index.css";
import { addListener, onMounted } from "@cosy/util";
import "./index.less";
import { useDefaultTheme } from "@/util/theme";
import { CosyElement } from "@cosy/ui";
import { themeIntroduction } from "./theme.intro";

onMounted(() => {
  useDefaultTheme();

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
});
