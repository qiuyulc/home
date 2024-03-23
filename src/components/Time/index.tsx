import { ComponentProps, useEffect, useMemo, useState } from "react";
import styles from "./index.module.less";
import { getDate, getTime } from "../../utils/time";
import { getWeather, WeatherProps } from "../../api/index";

export const TimeCom = ({ className }: ComponentProps<"div">) => {
  const [timeState, setTimeState] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherProps["result"]>();
  useEffect(() => {
    const time = setTimeout(() => {
      setTimeState(getTime());
    }, 1000);

    return () => {
      clearTimeout(time);
    };
  }, [timeState]);

  useEffect(() => {
    getWeather().then((res: WeatherProps) => {
      if (res.code === 200) {
        const { result } = res;
        setWeather(result);
      }
    });
  }, []);

  const weatherText = useMemo(() => {
    if (weather) {
      return `${weather.city.City}市 ${weather.condition.day_weather_short} ${weather.condition.day_wind_direction} ${weather.condition.day_wind_power}级`;
    }
  }, [weather]);

  return (
    <div className={`${styles.time_com} ${className} background_b`}>
      <div className={styles.time}>{getDate()}</div>
      <div className={styles.date}>{timeState}</div>
      <div className={styles.weather}>{weatherText}</div>
    </div>
  );
};
