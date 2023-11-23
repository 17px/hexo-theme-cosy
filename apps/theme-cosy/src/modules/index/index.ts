import "./index.less";
// 全局引入
import "@cosy/ui";
import "@cosy/ui/dist/index.css";
import { onMounted, addKeyCombo, addListener } from "@cosy/util";

onMounted(() => {
  addListener({
    selector: "#wc-btn",
    eventType: "click",
    handler: () => console.log("click wc-btn"),
  });
  addKeyCombo({
    combo: "cmd+k",
    handler: () => console.log("press cmd+k"),
    preventDefault: true,
  });
});
