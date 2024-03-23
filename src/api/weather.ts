import AxiosRequest from "../utils/request";

export interface WeatherProps {
  code: number;
  result: {
    city: {
      Carrier: string;
      City: string;
      Country: string;
      Province: string;
      UserIp: string;
    };
    condition: {
      api: {
        aqi: number;
        aqi_level: number;
        aqi_name: string;
        co: string;
        no2: string;
        o3: string;
        "pm2.5": string;
        pm10: string;
        so2: string;
        update_time: string;
      };
      day_weather: string;
      day_weather_short: string;
      day_wind_direction: string;
      day_wind_power: string;
      max_degree: string;
      min_degree: string;
      night_weather: string;
      night_weather_short: string;
      night_wind_direction: string;
      night_wind_power: string;
    };
  };
  message: string;
}

export const getWeather = async () => {
  return AxiosRequest({
    url: "https://api.oioweb.cn/api/weather/GetWeather",
  });
};
