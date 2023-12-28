import { fetchData } from "@/util";
import { Weather7dItem, WeatherWidget } from "./WeatherWidget";
interface weatherConfig {
  enable: string;
  cityCode: string;
  appKey: string;
}

export const useWeather = (config: weatherConfig) => {
  const { enable, cityCode, appKey } = config;
  if (enable === "true") {
    const day7later = `https://devapi.qweather.com/v7/weather/7d?location=${cityCode}&key=${appKey}`;
    const now = `https://devapi.qweather.com/v7/weather/now?location=${cityCode}&key=${appKey}`;

    Promise.all([fetchData(now), fetchData(day7later)]).then(
      ([nowData, day7laterData]) => {
        if (nowData?.code === "200" && day7laterData?.code === "200") {
          const weatherWidget = new WeatherWidget(".weather");

          const { icon, text, temp, obsTime, windDir, humidity, pressure } =
            nowData.now;
          weatherWidget.updateNowWeather({
            icon,
            text,
            temp,
            obsTime,
            windDir,
            humidity,
            pressure,
          });

          const dailyData = day7laterData.daily.map((item: Weather7dItem) => ({
            tempMin: item.tempMin,
            tempMax: item.tempMax,
            iconDay: item.iconDay,
            fxDate: item.fxDate,
            textDay: item.textDay,
            textNight: item.textNight,
          }));
          weatherWidget.update7DayForecast({ daily: dailyData });
        }
      }
    );
  }
};
