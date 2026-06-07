import { useEffect, useState } from 'react';
import { APP, WEATHER_API } from '@/config';
import { useWeather } from '@/hooks/useWeather';
import type { WeatherUnitType } from '@/components/WeatherProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export const UnitDropdown = () => {
  const { setWeather } = useWeather();
  const [unit, setUnit] = useState<WeatherUnitType>(
    (localStorage.getItem(APP.STORE_KEY.UNIT) as WeatherUnitType) ||
      WEATHER_API.DEFAULTS.UNIT,
  );

  useEffect(() => {
    setWeather({ unit });

    localStorage.setItem(APP.STORE_KEY.UNIT, unit);
  }, [unit, setWeather]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant='secondary'
          size='icon'
          className='text-icon'
        >
          °{unit === 'metric' ? 'C' : 'F'}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align='center'
        className='w-35 bg-card'
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className='text-muted-foreground'>
            <DropdownMenuRadioGroup
              value={unit}
              onValueChange={(value) => setUnit(value as WeatherUnitType)}
            >
              <DropdownMenuRadioItem value='metric'>
                Metric (°C)
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='imperial'>
                Imperial (°F)
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
