import axios from "axios";

export const openWeatherApi = axios.create({
  baseURL: 'http://api.openweathermap.org',
  params:{
    appid: import.meta.env.VITE_OPENWEATHER_API_KEY
  }
});