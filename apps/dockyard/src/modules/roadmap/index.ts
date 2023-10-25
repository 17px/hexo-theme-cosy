import { Dropdown, DropdownOption } from "@/util/dropdown";
import { SegmentedControl } from "./SegmentedControl";
import { GanttChart } from "./gantt";
import dayjs from "dayjs";
import "./index.less";

type YearItem = {
  name: string;
  start: string;
  end: string;
};

const processData = (year: string | number, yearDataList: YearItem[]) =>
  yearDataList.map((i: YearItem) => ({
    ...i,
    start: dayjs(`${year}-${i.start}`).toString(),
    end: dayjs(`${year}-${i.end}`).toString(),
  }));

// 使用Gantt组件
document.addEventListener("DOMContentLoaded", () => {
  const { roadmapYears = null, initYear } = window;
  if (roadmapYears) {
    const yearOptions = Object.keys(roadmapYears).map((year) => ({
      value: String(Number(year)),
      label: Number(year),
    }));

    new Dropdown("#year-dropdown", yearOptions, {
      onClickItem: (year) => {
        document.querySelector("#year-dropdown")!.textContent = year;
        const yearsData = processData(year, roadmapYears[year]);
        gantt.updateTasks(yearsData, Number(year));
      },
    });

    const yearsData = processData(initYear, roadmapYears[initYear]);
    const gantt = new GanttChart("#gantt-container", yearsData);
  }

  // const onSelectionChange = (selected: string, index: number) => {
  //   console.log(`Selected: ${selected}, Index: ${index}`);
  // };

  // new SegmentedControl(
  //   "segmented-control-container",
  //   ["All", "Active", "Closed"],
  //   0,
  //   onSelectionChange
  // );
});
