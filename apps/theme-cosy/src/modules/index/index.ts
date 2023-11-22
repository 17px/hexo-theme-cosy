import "./index.less";
// 全局引入
import "@cosy/ui";
import "@cosy/ui/dist/index.css";
import { onMounted } from "@cosy/util";

onMounted(() => {
  document.getElementById("wc-btn")?.addEventListener("click", () => {
    console.log("click");
  });
});
