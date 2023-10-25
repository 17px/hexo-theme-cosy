import { Dropdown, DropdownOption } from "@/util/dropdown";
import { SegmentedControl } from "./SegmentedControl";
import { GanttChart } from "./gantt";
import "./index.less";

// 使用Gantt组件
document.addEventListener("DOMContentLoaded", () => {
  const gantt = new GanttChart("#gantt-container", [
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

  // 使用方法
  const onSelectionChange = (selected: string, index: number) => {
    console.log(`Selected: ${selected}, Index: ${index}`);
  };

  new SegmentedControl(
    "segmented-control-container",
    ["All", "Active", "Closed"],
    0,
    onSelectionChange
  );

  const options: DropdownOption[] = [
    {
      value: "2022",
      label: 2022,
    },
    {
      value: "2023",
      label: 2023,
    },
    {
      value: "2024",
      label: 2024,
    },
  ];

  new Dropdown("#year-dropdown", options, {
    onClickItem: (status) => {
      console.log(status);
    },
  });
});
