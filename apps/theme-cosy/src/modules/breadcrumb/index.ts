import { onMounted, addListener, globalEventBus } from "@cosy/util";
import "./index.less";
import { CosyElement } from "@cosy/ui";

onMounted(() => {
  globalEventBus.on("cosy-drag-box:left-aside", (e) => {
    const { invisible } = e.detail;
    const buttonSelector = `#left-aside-show-button`;
    const dragBoxSelector = "#aside-drag-box";
    const showButton = document.querySelector(buttonSelector) as CosyElement;
    showButton.invisible = !invisible;
    addListener({
      selector: buttonSelector,
      eventType: "click",
      handler: () => {
        const dragBox = document.querySelector(dragBoxSelector) as CosyElement;
        dragBox.invisible = false;
        showButton.invisible = true;
      },
    });
  });
});
