import { APP, WEATHER_API } from '@/config';
import { useWeather } from '@/hooks/useWeather';
import type { WeatherUnitType } from '@/components/WeatherProvider';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Navigation, Sunrise, Sunset } from 'lucide-react';

const CurrentWeatherCard = () => {
  const { weather } = useWeather();

  if (!weather) return <Skeleton className='min-h-75 rouned-xl' />;

  const currentWeather = {
    dt: new Date(weather.current.dt * 1000).toLocaleTimeString('en-US', {
      timeStyle: 'short',
    }),
    sunrise: new Date(weather.current.sunrise * 1000).toLocaleTimeString(
      'en-US',
      { hour: '2-digit', minute: '2-digit', hour12: true },
    ),
    sunset: new Date(weather.current.sunset * 1000).toLocaleTimeString(
      'en-US',
      { hour: '2-digit', minute: '2-digit', hour12: true },
    ),
    iconCode: weather.current.weather[0].icon,
    description: weather.current.weather[0].description,
    temp: weather.current.temp.toFixed(),
    feelsLike: weather.current.feels_like.toFixed(),
    windSpeed: weather.current.wind_speed.toFixed(),
    windDeg: weather.current.wind_deg,
    humidity: weather.current.humidity,
    visibility: (weather.current.visibility / 1000).toFixed(),
    pressure: weather.current.pressure,
    dewPoint: weather.current.dew_point.toFixed(),
    uvi: weather.current.uvi.toFixed(),
  };

  const weatherUnit =
    (localStorage.getItem(APP.STORE_KEY.UNIT) as WeatherUnitType) ||
    WEATHER_API.DEFAULTS.UNIT;

  return (
    <Card className='@container min-h-75'>
      <CardHeader>
        <CardTitle>Current Weather</CardTitle>
        <CardDescription>{currentWeather.dt}</CardDescription>
      </CardHeader>

      <CardContent className='grow'>
        <div className='flex flex-wrap items-center gap-x-6'>
          <figure>
            <img
              src={`https://openweathermap.org/img/wn/${currentWeather.iconCode}@4x.png`}
              alt={currentWeather.description}
              width={70}
              height={70}
              className='object-contain'
            />
          </figure>

          <p className='text-5xl font-medium flex items-start sm:text-7xl'>
            {currentWeather.temp}

            <span className='text-3xl'>{APP.UNIT.TEMP[weatherUnit]}</span>
          </p>

          <div>
            <p className='font-medium capitalize'>
              {currentWeather.description}
            </p>

            <div className='text-sm flex items-center gap-2'>
              <span className='text-muted-foreground'>Feels like</span>
              <span>
                {currentWeather.feelsLike}
                {APP.UNIT.TEMP[weatherUnit]}
              </span>
            </div>
          </div>

          <div className='flex flex-col @sm:flex-row flex-wrap gap-y-2 gap-x-2 @lg:gap-x-6 ml-4'>
            <div className='flex'>
              <Sunrise
                size={16}
                className='self-center mr-1.5 text-chart-2'
              />
              <div>
                <p className='font-medium capitalize'>Sunrise</p>
                <span>{currentWeather.sunrise}</span>
              </div>
            </div>
            <div className='flex'>
              <Sunset
                size={16}
                className='self-center mr-1.5 text-chart-2'
              />
              <div>
                <p className='font-medium capitalize'>Sunset</p>
                <span>{currentWeather.sunset}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className='flex-wrap gap-x-8 gap-y-2 @lg:justify-between'>
        <div>
          <p className='text-sm text-muted-foreground'>Wind</p>
          <div className='flex items-center gap-1'>
            <p>
              {currentWeather.windSpeed} {APP.UNIT.WIND[weatherUnit]}
            </p>

            <Navigation
              size={14}
              className='text-icon'
              style={{ rotate: `${currentWeather.windDeg}deg` }}
            />
          </div>
        </div>

        <div>
          <p className='text-sm text-muted-foreground'>Humidity</p>
          <div className='flex items-center gap-1'>
            <p>{currentWeather.humidity} %</p>
          </div>
        </div>

        <div>
          <p className='text-sm text-muted-foreground'>Visibility</p>
          <div className='flex items-center gap-1'>
            <p>{currentWeather.visibility} Km</p>
          </div>
        </div>

        <div>
          <p className='text-sm text-muted-foreground'>Pressure</p>
          <div className='flex items-center gap-1'>
            <p>{currentWeather.pressure} hPa</p>
          </div>
        </div>

        <div>
          <p className='text-sm text-muted-foreground'>Dew Point</p>
          <div className='flex items-center gap-1'>
            <p>{currentWeather.dewPoint} °</p>
          </div>
        </div>

        <div>
          <p className='text-sm text-muted-foreground'>UVI</p>
          <div className='flex items-center gap-1'>
            <p>{currentWeather.uvi}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CurrentWeatherCard;
