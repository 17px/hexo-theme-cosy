import "./index.less";
import { onMounted, addKeyPress, addListener } from "@cosy/util";

onMounted(() => {
  addListener({
    selector: "#wc-btn",
    eventType: "click",
    handler: () => console.log("click wc-btn"),
  });
  addKeyPress({
    key: "k",
    handler: () => console.log("press cmd+k"),
    preventDefault: true,
  });
});
