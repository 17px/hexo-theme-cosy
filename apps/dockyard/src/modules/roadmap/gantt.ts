import "./gantt.less";

export interface Task {
  name: string;
  start: Date;
  end: Date;
}

export class Gantt {
  year: number;
  container: HTMLElement;
  tasks: Task[];
  isDragging: boolean = false;
  lastX: number = 0;

  constructor(year: number, containerSelector: string, tasks: Task[]) {
    this.year = year;
    this.tasks = tasks;
    this.container = document.querySelector(containerSelector) as HTMLElement;
    if (!this.container) {
      throw new Error(`Container with selector ${containerSelector} not found`);
    }
    this.render();
  }

  private getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  private handleMouseDown = (e: MouseEvent) => {
    this.isDragging = true;
    this.lastX = e.clientX;
  };

  private handleMouseMove = (e: MouseEvent) => {
    if (this.isDragging) {
      const dx = e.clientX - this.lastX;
      this.container.scrollBy(-dx, 0);
      this.lastX = e.clientX;
    }
  };

  private handleMouseUp = () => {
    this.isDragging = false;
  };

  private render(): void {
    this.container.innerHTML = ""; // 清空已有内容

    // 创建时间轴的主容器
    const timelineContainer = document.createElement("div");
    timelineContainer.className = "timeline-container";

    // 绑定拖拽事件
    this.container.addEventListener("mousedown", this.handleMouseDown);
    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseup", this.handleMouseUp);

    // 创建月份行
    const monthsRow = document.createElement("div");
    monthsRow.className = "months-row";

    // 创建天数行
    const daysRow = document.createElement("div");
    daysRow.className = "days-row";

    let currentLeft = 0;
    const dayWidth = 30; // 每天的宽度，单位像素

    for (let month = 0; month < 12; month++) {
      // 月份显示
      const monthDiv = document.createElement("div");
      monthDiv.className = "month";
      monthDiv.textContent = `${this.year}年${month + 1}月`;
      monthDiv.style.left = `${currentLeft}px`;
      monthsRow.appendChild(monthDiv);

      // 天数显示
      const daysInMonth = this.getDaysInMonth(this.year, month);
      for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement("div");
        dayDiv.className = "day";
        dayDiv.textContent = `${day}`;
        dayDiv.style.position = "absolute";
        dayDiv.style.left = `${currentLeft}px`;
        daysRow.appendChild(dayDiv);

        currentLeft += dayWidth;
      }
    }

    // 将月份和天数行添加到主容器
    timelineContainer.appendChild(monthsRow);
    timelineContainer.appendChild(daysRow);

    // 将主容器添加到页面
    this.container.appendChild(timelineContainer);

    // 创建任务容器
    const taskContainer = document.createElement("div");
    taskContainer.className = "task-container";

    this.tasks.forEach((task, index) => {
      const taskEl = document.createElement("div");
      taskEl.className = "task-bar";
      taskEl.style.position = "absolute";

      const startDate = task.start;
      const endDate = task.end;
      const startDayOfYear =
        (startDate.getTime() - new Date(this.year, 0, 1).getTime()) /
        (1000 * 60 * 60 * 24);
      const endDayOfYear =
        (endDate.getTime() - new Date(this.year, 0, 1).getTime()) /
        (1000 * 60 * 60 * 24);

      taskEl.style.left = `${startDayOfYear * 30}px`;
      taskEl.style.height = "30px";
      taskEl.style.lineHeight = "30px";
      taskEl.style.top = index * 30 + "px";
      taskEl.style.width = `${(endDayOfYear - startDayOfYear) * 30}px`;
      taskEl.textContent = task.name;

      taskContainer.appendChild(taskEl);
    });

    // 将任务容器添加到主容器
    this.container.appendChild(taskContainer);
  }
}
