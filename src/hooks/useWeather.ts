import { useContext } from "react"
import { WeatherProviderContext } from "@/components/WeatherProvider"


export const useWeather = () => {
  const context = useContext(WeatherProviderContext);

  if(context === undefined){
    throw new Error('useWeather must be used withing WeatherProvider');
  }

  return context;
}