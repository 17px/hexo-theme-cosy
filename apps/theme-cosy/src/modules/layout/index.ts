// 全局引入
import "@cosy/ui";
import "@cosy/ui/dist/index.css";
import { addListener, onMounted } from "@cosy/util";
import "./index.less";
import { useDefaultTheme } from "@/util/theme";

onMounted(() => {
  useDefaultTheme();

  addListener({
    selector: "#button-preference",
    eventType: "click",
    handler: () => {
      location.href = "/cosy-preference";
    },
  });
});
