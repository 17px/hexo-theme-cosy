export interface NowWeatherData {
  icon: string;
  text: string;
  temp: number;
  obsTime: string;
  windDir: string;
  humidity: string;
  pressure: string;
}

export interface Weather7dItem {
  tempMin: number;
  tempMax: number;
  iconDay: string;
  fxDate: string;
  textDay: string;
}

export interface Weather7dData {
  daily: Weather7dItem[];
}

export class WeatherWidget {
  private root: HTMLElement;
  private now!: HTMLElement;
  private obsTime!: HTMLElement;
  private nowIcon!: HTMLElement;
  private nowWeather!: HTMLElement;
  private nowTemp!: HTMLElement;
  private ul!: HTMLElement;

  constructor(rootSelector: string) {
    this.root = this.getElement(rootSelector);
    this.initializeDOMStructure();
    this.setStyles();
  }

  private getElement(selector: string): HTMLElement {
    const element = document.querySelector(selector) as HTMLElement;
    if (!element) {
      throw new Error(`Element with selector ${selector} not found.`);
    }
    return element;
  }

  private initializeDOMStructure(): void {
    this.now = document.createElement("div");
    this.now.className = "now";

    const leftDiv = document.createElement("div");
    this.obsTime = document.createElement("div");
    this.obsTime.id = "obs-time";
    this.nowTemp = document.createElement("span");
    this.nowTemp.id = "now-temp";

    leftDiv.appendChild(this.obsTime);
    leftDiv.appendChild(this.nowTemp);

    const rightDiv = document.createElement("div");
    this.nowIcon = document.createElement("div");
    this.nowIcon.id = "now-icon";
    this.nowWeather = document.createElement("span");
    this.nowWeather.id = "now-weather";

    rightDiv.appendChild(this.nowIcon);
    rightDiv.appendChild(this.nowWeather);

    this.now.appendChild(leftDiv);
    this.now.appendChild(rightDiv);

    this.ul = document.createElement("ul");
    this.ul.id = "weather-7d";

    this.root.appendChild(this.now);
    this.root.appendChild(this.ul);
  }

  private setStyles(): void {
    this.root.style.opacity = "0";
    this.root.style.position = "absolute";
    this.root.style.top = "10%";
    this.root.style.left = "10%";
    this.root.style.width = "30%";
    this.root.style.display = "flex";
    this.root.style.flexDirection = "column";
    this.root.style.padding = "20px";
    this.root.style.borderRadius = "20px";
    this.root.style.zIndex = "10";
    this.root.style.minWidth = "420px";
    this.root.style.backdropFilter = "blur(30px)";
    this.root.style.background =
      "linear-gradient(180deg,hsla(0,0%,100%,.28),hsla(0,0%,100%,0))";
    this.root.style.boxShadow =
      "inset 0 0.5px 0 1px hsla(0,0%,100%,.23), inset 0 1px 0 0 hsla(0,0%,100%,.66), 0 4px 16px rgba(0,0,0,.12)";

    this.now.style.flex = "1";
    this.now.style.display = "flex";
    this.now.style.justifyContent = "space-between";
    this.now.style.alignItems = "center";

    this.obsTime.style.fontSize = "13px";
    this.nowWeather.style.fontSize = "13px";

    this.nowIcon.style.textAlign = "right";

    this.nowTemp.style.fontSize = "42px";
    this.nowTemp.style.color = "var(--color-font)";

    this.ul.style.display = "flex";
    this.ul.style.margin = "0";
    this.ul.style.padding = "20px 0 0 0";
    this.ul.style.justifyContent = "space-between";
  }

  updateNowWeather(data: NowWeatherData): void {
    const { icon, text, temp, obsTime, windDir, humidity, pressure } = data;

    this.obsTime.innerHTML = `${new Date(obsTime).toLocaleTimeString()}`;
    this.nowIcon.innerHTML = `<img style="width:48px;height:48px" src="/img/qweather-color-icon/${icon}.png" />`;
    this.nowWeather.innerHTML = `P:${pressure} H:${humidity}`;
    this.nowTemp.innerHTML = `${temp}°`;
  }

  update7DayForecast(data: Weather7dData): void {
    const { daily } = data;

    daily.forEach((item: Weather7dItem) => {
      const { tempMin, tempMax, iconDay, fxDate, textDay } = item;
      const today = new Date().getDate() === new Date(fxDate).getDate();
      const today_dot =
        '<span style="margin-top:6px;width:8px;height:8px;border-radius:50%;background: var(--color-primary);"></span>';
      const liContent = `
        <li style="display: flex; flex-direction: column; align-items: center;">
          <span style="color: var(--color-font); font-size: 12px; line-height: 1.5;">${new Date(
            fxDate
          ).getDate()}</span>
          <img src="/img/qweather-color-icon/${iconDay}.png" style="width: 22px; height: 22px;">
          <span style="color: var(--color-font); font-size: 12px; line-height: 1.5;">${tempMin}-${tempMax}°</span>
          ${today ? today_dot : ""}
        </li>
      `;

      this.ul.insertAdjacentHTML("beforeend", liContent);
    });
  }
}
