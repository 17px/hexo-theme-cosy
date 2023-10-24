import "./calendar.less";

export class Calendar {
  private container: HTMLElement | null;
  private date: Date;
  private today: Date;

  constructor(container: string) {
    this.container = document.querySelector(container);
    this.date = new Date();
    this.today = new Date();
    this.initEventListeners();
    this.render();
  }

  private initEventListeners() {
    this.container?.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      if (target.id === "prev") {
        this.date.setMonth(this.date.getMonth() - 1);
        this.render();
      } else if (target.id === "next") {
        this.date.setMonth(this.date.getMonth() + 1);
        this.render();
      } else if (target.id === "today") {
        this.date = new Date();
        this.render();
      } else if (target.id === "prev-year") {
        this.date.setFullYear(this.date.getFullYear() - 1);
        this.render();
      } else if (target.id === "next-year") {
        this.date.setFullYear(this.date.getFullYear() + 1);
        this.render();
      }
    });
  }

  private render() {
    if (!this.container) return;

    const year = this.date.getFullYear();
    const month = this.date.getMonth();
    const weekdays = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

    let html = `
      <button id="prev">上个月</button>
      <button id="prev-year">上一年</button>
      <button id="today">今天</button>
      <button id="next-year">下一年</button>
      <button id="next">下个月</button>
      <h2>${year}年${month + 1}月</h2>
      <div class="weekdays">
    `;

    for (const day of weekdays) {
      html += `<div class="weekday">${day}</div>`;
    }

    html += '</div><div class="days">';

    const firstDay = new Date(year, month, 1).getDay();
    const lastDateCurrentMonth = new Date(year, month + 1, 0).getDate();
    const lastDateLastMonth = new Date(year, month, 0).getDate();

    const adjustedFirstDay = (firstDay || 7) - 1;

    for (let i = adjustedFirstDay - 1; i >= 0; i--) {
      html += `<div class="day empty">${lastDateLastMonth - i}</div>`;
    }

    for (let i = 1; i <= lastDateCurrentMonth; i++) {
      if (
        i === this.today.getDate() &&
        year === this.today.getFullYear() &&
        month === this.today.getMonth()
      ) {
        html += `<div class="day today">${i}</div>`;
      } else {
        html += `<div class="day">${i}</div>`;
      }
    }

    html += "</div>";

    this.container.innerHTML = html;
  }
}
