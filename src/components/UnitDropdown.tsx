import { WEATHER_API } from '@/config';
import { useState } from 'react';
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
  const [unit, setUnit] = useState<string>(WEATHER_API.DEFAULTS.UNIT);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
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
              onValueChange={(value) => setUnit(value)}
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
