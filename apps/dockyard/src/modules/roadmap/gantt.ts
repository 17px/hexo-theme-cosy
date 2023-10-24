import "./gantt.less";

export interface Task {
  name: string;
  start: Date;
  end: Date;
}

export class Gantt {
  selector: string;
  tasks: Task[];
  showLimitedDays: boolean = false;
  isDragging: boolean = false;
  lastX: number = 0;
  container: any;

  constructor(selector: string, tasks: Task[]) {
    this.selector = selector;
    this.tasks = tasks;
    this.render();
  }

  toggleLimitedDays() {
    this.showLimitedDays = !this.showLimitedDays;
    this.render();
  }

  clear() {
    this.container = document.querySelector(this.selector);
    if (this.container) {
      this.container.innerHTML = "";
    }
  }

  handleMouseDown(e: MouseEvent) {
    this.isDragging = true;
    this.lastX = e.clientX;
  }

  handleMouseMove(e: MouseEvent) {
    if (this.isDragging) {
      const dx = this.lastX - e.clientX;
      this.container.scrollBy(dx, 0);
      this.lastX = e.clientX;
    }
  }

  handleMouseUp() {
    this.isDragging = false;
  }

  render() {
    this.clear(); // 清空之前的内容
    const container = document.querySelector(this.selector);
    if (!container) return;

    this.isDragging = false;
    container.className = this.showLimitedDays ? "limited-days" : "all-days";

    const headerEl = document.createElement("div");
    headerEl.classList.add("gantt-header");

    // 创建时间轴 header（这里只是一个简单的示例，具体实现可能需要更多逻辑）
    for (let month = 1; month <= 12; month++) {
      const monthEl = document.createElement("div");
      monthEl.classList.add("gantt-month");
      monthEl.innerText = `2023年${month}月`;

      const days = new Array(30).fill(null).map((_, day) => day + 1); // 假设每个月都有30天
      const daysToShow = this.showLimitedDays
        ? days.filter((_, i) => i % 7 === 0)
        : days;

      const daysEl = document.createElement("div");
      daysEl.classList.add("gantt-days");

      daysToShow.forEach((day) => {
        const dayEl = document.createElement("span");
        dayEl.classList.add("gantt-day");
        dayEl.innerText = `${day}`;
        daysEl.appendChild(dayEl);
      });

      monthEl.appendChild(daysEl);
      headerEl.appendChild(monthEl);
    }
    container.appendChild(headerEl);

    // 添加任务条
    const ganttEl = document.createElement("div");
    ganttEl.classList.add('task-container')
    this.tasks.forEach((task) => {
      const taskEl = document.createElement("div");
      const duration =
        (task.end.getTime() - task.start.getTime()) / (1000 * 60 * 60 * 24);
      taskEl.classList.add("task-bar");
      taskEl.style.width = `${duration * 20}px`;
      taskEl.style.marginLeft = `${
        ((task.start.getTime() - this.tasks[0].start.getTime()) /
          (1000 * 60 * 60 * 24)) *
        20
      }px`;
      taskEl.innerText = task.name;
      ganttEl.appendChild(taskEl);
    });

    // 绑定拖拽事件到 headerEl
    headerEl.addEventListener("mousedown", this.handleMouseDown.bind(this));
    document.addEventListener("mousemove", this.handleMouseMove.bind(this));
    document.addEventListener("mouseup", this.handleMouseUp.bind(this));

    container.appendChild(ganttEl);
  }
}
