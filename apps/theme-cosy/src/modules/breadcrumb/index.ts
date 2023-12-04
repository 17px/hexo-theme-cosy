import {
  onMounted,
  addListener,
  globalEventBus,
  addKeyPress,
} from "@cosy/util";
import "./index.less";
import { CosyElement } from "@cosy/ui";

onMounted(() => {
  const asideDragBox = document.querySelector("#aside-drag-box") as CosyElement;
  const button = document.querySelector("#left-aside-button") as CosyElement;

  if (asideDragBox) {
    globalEventBus.on("cosy-drag-box:left-aside", (e) => {
      const { invisible } = e.detail;
      button.invisible = !invisible;
      addListener({
        selector: "#left-aside-button",
        eventType: "click",
        handler: () => {
          asideDragBox.invisible = false;
          button.invisible = true;
        },
      });
    });

    addListener({
      selector: "#left-aside-button",
      eventType: "click",
      handler: () => {
        asideDragBox.invisible = false;
        button.invisible = true;
      },
    });

    addKeyPress({
      key: "[",
      preventDefault: true,
      handler: () => {
        asideDragBox.invisible = !asideDragBox.invisible;
        button.invisible = !button.invisible;
      },
    });
  }
});
