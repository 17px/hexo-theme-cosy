// 全局引入
import "@cosy/ui";
import "@cosy/ui/dist/index.css";
import { onMounted } from "@cosy/util";
import "./index.less";
import { useDefaultTheme } from "@/util/theme";

onMounted(() => {
  useDefaultTheme();
});
