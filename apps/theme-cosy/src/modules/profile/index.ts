import { addKeyPress, onMounted } from "@cosy/util";
import "./index.less";

onMounted(() => {
  addKeyPress({
    key: "control+h",
    preventDefault: true,
    handler: () => (location.href = "/"),
  });

  addKeyPress({
    key: "control+p",
    preventDefault: true,
    handler: () => (location.href = "/cosy-preference"),
  });
});
