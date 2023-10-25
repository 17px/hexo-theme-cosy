// import { Gantt } from "./gantt";
// import "./gantt";
import { Gantt } from "./gantt";
import "./index.less";

// 使用Gantt组件
document.addEventListener("DOMContentLoaded", () => {
  // new Gantt("#timeline");

  const myGantt = new Gantt(2023, "#gantt-container", [
    {
      name: "test1",
      start: '"2023-01-01"',
      end: "2023-01-09",
    },
    {
      name: "test2",
      start: "2023-02-01",
      end: "2023-02-23",
    },
    {
      name: "test2",
      start: "2023-10-24",
      end: "2023-11-1",
    },
  ]);
});
