import { GanttChart } from "./gantt";
import dayjs from "dayjs";
import "./index.less";
import { onMounted, addKeyPress } from "@cosy/util";
import { SegmentedControl } from "./SegmentedControl";
import { CosyDropdown } from "@cosy/ui";

type YearItem = {
  title: string;
  content?: string;
  start: string;
  end: string;
};

const processData = (year: string | number, yearDataList: YearItem[]) =>
  yearDataList.map((i: YearItem) => ({
    ...i,
    start: dayjs(`${year}-${i.start}`).toString(),
    end: dayjs(`${year}-${i.end}`).toString(),
  }));

onMounted(() => {
  const { roadmapYears = null, initYear } = window;
  const todayButton = document.querySelector(
    "#tody-button"
  ) as HTMLButtonElement;
  if (initYear === dayjs().year().toString() && todayButton) {
    todayButton.style.display = "inherit";
  }
  if (roadmapYears) {
    const yearOptions = Object.keys(roadmapYears).map((year) => ({
      value: String(Number(year)),
      label: Number(year),
    }));
    new CosyDropdown("#year-dropdown", yearOptions, {
      onClickItem: (selected) => {
        const { value } = selected;
        document.querySelector("#year-dropdown span")!.textContent = value;
        todayButton.style.display =
          value === dayjs().year().toString() ? "inherit" : "none";
        const yearsData = processData(value, roadmapYears[value]);
        gantt.updateTasks(yearsData, Number(value));
      },
    });
    const yearsData = processData(initYear, roadmapYears[initYear]);
    const gantt = new GanttChart("#gantt-container", yearsData);
    todayButton?.addEventListener("click", () => gantt.centerOnCurrentDay());
    addKeyPress({
      key: "d",
      preventDefault: true,
      handler: () => gantt.centerOnCurrentDay(),
    });
  }
});
