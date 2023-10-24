// import { Gantt } from "./gantt";
// import "./gantt";
import { Gantt, Task } from "./gantt";
import "./index.less";

// 使用Gantt组件
document.addEventListener("DOMContentLoaded", () => {
  // new Gantt("#timeline");

  const tasks: Task[] = [
    {
      name: "任务1",
      start: new Date("2023-01-01"),
      end: new Date("2023-01-05"),
    },
    {
      name: "任务2",
      start: new Date("2023-01-04"),
      end: new Date("2023-01-10"),
    },
    {
      name: "任务3",
      start: new Date("2023-10-03"),
      end: new Date("2023-10-08"),
    },
  ];

  const myGantt = new Gantt("#gantt-chart", tasks);

  document.querySelector("#toggle-days")?.addEventListener("click", () => {
    myGantt.toggleLimitedDays();
  });
});
