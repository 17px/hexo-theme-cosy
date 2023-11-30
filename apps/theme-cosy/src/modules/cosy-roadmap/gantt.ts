import { Popover } from "@/util/popover";
import "./gantt.less";
import dayjs from "dayjs";
import { CosyElement } from "@cosy/ui";

export interface GanttTask {
  title: string;
  content?: string;
  start: string;
  end: string;
}

const mapNumberToMonth = (monthNumber: number): string => {
  const monthMap: { [key: number]: string } = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };
  return monthMap[monthNumber];
};

export class GanttChart {
  currentYear: number;
  chartContainer: HTMLElement;
  taskList: GanttTask[];
  isUserDragging: boolean = false;
  lastMouseX: number = 0;
  currentDayWidth: number = 30;

  constructor(
    containerSelector: string,
    tasks: GanttTask[],
    currentYear = dayjs().year()
  ) {
    this.currentYear = currentYear;
    this.taskList = tasks;
    this.chartContainer = document.querySelector(
      containerSelector
    ) as HTMLElement;

    if (!this.chartContainer) {
      throw new Error(`Container with selector ${containerSelector} not found`);
    }

    this.renderChart();
    this.handleMouseWheelInView();
    this.centerOnCurrentDay();
    this.updateDayWidthOnScroll();
  }

  private getDaysOfMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  private handleMouseDown = (e: MouseEvent) => {
    this.isUserDragging = true;
    this.lastMouseX = e.clientX;
  };

  private handleMouseMove = (e: MouseEvent) => {
    if (this.isUserDragging) {
      const dx = e.clientX - this.lastMouseX;
      this.chartContainer.scrollBy(-dx, 0);
      this.lastMouseX = e.clientX;
    }
  };

  private handleMouseUp = () => {
    this.isUserDragging = false;
  };

  private renderChart(): void {
    this.chartContainer.innerHTML = "";

    const timelineDiv = document.createElement("div");
    timelineDiv.className = "timeline-container";

    const taskDiv = document.createElement("div");
    taskDiv.className = "task-container";

    // 绑定拖拽事件
    this.chartContainer.addEventListener("mousedown", this.handleMouseDown);
    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseup", this.handleMouseUp);

    // 创建月份行
    const monthsRow = document.createElement("div");
    monthsRow.className = "months-row";

    // 创建天数行
    const daysRow = document.createElement("div");
    daysRow.className = "days-row";

    let currentLeft = 0;

    for (let month = 0; month < 12; month++) {
      // 月份显示
      const monthDiv = document.createElement("div");
      monthDiv.className = "month";
      monthDiv.textContent = `${window.i18n[mapNumberToMonth(month + 1)]}`;
      monthDiv.style.left = `${currentLeft}px`;
      monthsRow.appendChild(monthDiv);

      // 天数显示
      const daysInMonth = this.getDaysOfMonth(this.currentYear, month);

      // 创建竖线，第一条不创建
      if (currentLeft > 0) {
        const verticalLine = document.createElement("div");
        verticalLine.style.position = "absolute";
        verticalLine.style.height = "100%"; // 你可以根据需要调整高度
        verticalLine.style.width = "0"; // 设置宽度为0，因为我们将使用border来显示线
        verticalLine.style.borderLeft = "1px dashed var(--color-border)"; // 使用虚线
        verticalLine.style.left = `${currentLeft}px`; // 与 .month 的 left 值相同

        // 将月份分割竖线添加到 taskContainer 中
        taskDiv.appendChild(verticalLine);
      }

      for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement("div");
        dayDiv.className = "day";
        const ymd = `${this.currentYear}-${month + 1}-${day}`;
        dayDiv.setAttribute("data-ymd", dayjs(ymd).format("YYYY-MM-DD"));
        dayDiv.textContent = `${day}`;
        dayDiv.style.position = "absolute";
        dayDiv.style.left = `${currentLeft}px`;
        daysRow.appendChild(dayDiv);
        currentLeft += this.currentDayWidth;
      }
    }

    this.taskList.forEach((task, index) => {
      const taskEl = document.createElement("div");

      const now = dayjs();
      const start = dayjs(task.start);
      const end = dayjs(task.end).add(1, "day");
      const status = end.isBefore(now)
        ? "expired"
        : start.isBefore(now) && end.isAfter(now)
        ? "doing"
        : "todo";
      taskEl.classList.add("task-bar", "ellipsis", status);
      taskEl.setAttribute("data-start", dayjs(task.start).format("YYYY-MM-DD"));
      taskEl.setAttribute("data-end", dayjs(task.end).format("YYYY-MM-DD"));
      taskEl.style.position = "absolute";
      taskEl.style.height = "30px";
      taskEl.style.lineHeight = "30px";
      taskEl.style.top = index * 34 + "px";
      taskEl.textContent = task.title;
      taskDiv.appendChild(taskEl);

      taskEl.addEventListener("click", () => {
        const popup = document.createElement("cosy-popup") as CosyElement;
        const title = `${dayjs(task.start).format("DD/MM/YYYY")} - ${dayjs(
          task.end
        ).format("DD/MM/YYYY")}`;
        const slotContent = `
          <div style="max-width: 860px;line-height: 1.5">
            <p style="margin: 0px 0px 8px; font-size: 12px; color: var(--color-font-2);">${title}</p>
            <p style="margin: 0px; font-size: 13px">${task.content ?? task.title}</p>
          </div>
        `;
        popup.innerHTML = slotContent;
        document.body.append(popup);
      });
    });

    // 将月份和天数行添加到主容器
    timelineDiv.appendChild(monthsRow);
    timelineDiv.appendChild(daysRow);
    this.chartContainer.appendChild(timelineDiv);
    this.chartContainer.appendChild(taskDiv);

    this.renderTodayVerticalLine();
    this.updateTaskBars();
  }

  /**
   * 当天聚焦到屏幕中心
   */
  centerOnCurrentDay() {
    // 获取当前日期
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    // 如果当前年份是这个 Gantt 图的年份
    if (this.currentYear === currentYear) {
      // 计算当前日期距离年初的天数
      let daysFromStartOfYear = 0;
      for (let i = 0; i < currentMonth; i++) {
        daysFromStartOfYear += this.getDaysOfMonth(currentYear, i);
      }
      daysFromStartOfYear += currentDay;

      // 计算这些天数对应的像素值
      const currentLeftPosition = daysFromStartOfYear * this.currentDayWidth;

      // 计算要滚动的像素量以便将当前日期居中
      const halfContainerWidth = this.chartContainer.offsetWidth / 2;
      const scrollToPosition = currentLeftPosition - halfContainerWidth;

      // 执行滚动
      this.chartContainer.scrollLeft = scrollToPosition;
    }
  }

  /**
   * 根据滚动方向更新dayWidth
   */
  handleMouseWheelInView(): void {
    this.chartContainer.addEventListener("wheel", (e: WheelEvent) => {
      // 屏幕缩小，导致了文字变形，给定一个最小的天数间隔
      if (e.deltaY > 0 && this.currentDayWidth < 5) return;
      this.currentDayWidth *= e.deltaY > 0 ? 0.9 : 1.1;
      this.renderChart();
      // this.todayFocusCenter();
      this.updateDayWidthOnScroll();
      this.updateTaskBars();
    });
  }

  /**
   * 更新days-row
   */
  updateDayWidthOnScroll(): void {
    const dayElements = [
      ...this.chartContainer.querySelectorAll(".day"),
    ] as HTMLElement[];

    if (this.currentDayWidth < 25) {
      dayElements.forEach((day, index) => {
        // 每隔7天显示一次
        if (index % 8 === 0) {
          day.style.display = "block";
        } else {
          day.style.display = "none";
        }
      });
    } else {
      // 如果 this.dayWidth 大于或等于 25，显示所有日期
      dayElements.forEach((day) => {
        day.style.display = "block";
      });
    }

    // 由于.day的可见性发生了变化，因此需要更新任务条
    this.updateTaskBars();
  }

  /**
   * 更新task的位置
   */
  updateTaskBars(): void {
    const taskBars = [
      ...this.chartContainer.querySelectorAll(".task-bar"),
    ] as HTMLElement[];

    taskBars.forEach((taskBar) => {
      const start = taskBar.getAttribute("data-start")!;
      const end = taskBar.getAttribute("data-end")!;

      // 找到对应的 .day 元素的 left 值
      const startDay = this.chartContainer.querySelector(
        `.day[data-ymd="${start}"]`
      ) as HTMLDivElement;
      const endDay = this.chartContainer.querySelector(
        `.day[data-ymd="${dayjs(end).add(1, "day").format("YYYY-MM-DD")}"]`
      ) as HTMLDListElement;

      if (startDay && endDay) {
        const leftOffset = parseInt(startDay.style.left, 10);
        const width = parseInt(endDay.style.left, 10) - leftOffset;

        taskBar.style.left = `${leftOffset}px`;
        taskBar.style.width = `${width}px`;
      }
    });
  }

  /**
   * 当天的竖线
   */
  private renderTodayVerticalLine(): void {
    const today = dayjs().format("YYYY-MM-DD");
    // 从DOM中找到今天的.day元素
    const todayElement = this.chartContainer.querySelector(
      `.day[data-ymd="${today}"]`
    ) as HTMLElement;
    if (!todayElement) return;
    todayElement.classList.add("today");
    // 获取其left值，考虑当天日期.day的宽度
    const currentLeft =
      +todayElement.style.left.replace("px", "") + todayElement.offsetWidth / 2;
    // 创建今天的竖线
    const todayVerticalLine = document.createElement("div");
    todayVerticalLine.className = "today-vertical-line";
    todayVerticalLine.style.position = "absolute";
    todayVerticalLine.style.height = "100%";
    todayVerticalLine.style.width = "0";
    todayVerticalLine.style.borderLeft = "2px dashed var(--color-primary)"; // 可以根据需要更改样式
    todayVerticalLine.style.left = `${currentLeft}px`;
    // 获取 task-container
    const taskDiv = this.chartContainer.querySelector(
      ".task-container"
    ) as HTMLElement;

    // 将竖线添加到task-container中
    taskDiv.appendChild(todayVerticalLine);
  }

  /**
   * 实例外部切换数据源重新渲染人物
   */
  public updateTasks(newTasks: GanttTask[], currentYear: number): void {
    this.currentDayWidth = 30;
    this.currentYear = currentYear;
    this.taskList = newTasks;
    this.renderChart(); // 重新渲染图表
  }
}
