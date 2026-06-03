import { useCallback, useEffect, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Kbd, KbdGroup } from '@/components/ui/kbd';
import { MapPin, MapPinned, MapPinSearch, Search } from 'lucide-react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from '@/components/ui/item';
import { useWeather } from '@/hooks/useWeather';
import { openWeatherApi } from '@/api';
import { APP, WEATHER_API } from '@/config';
import { type Geocoding } from '@/types';

export const SearchDialog = () => {
  const { setWeather } = useWeather();
  const [search, setSearch] = useState<string>('');
  const [results, setResults] = useState<Geocoding[]>();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const geocoding = useCallback(async (search: string) => {
    if (!search) return;

    const response = await openWeatherApi.get('/geo/1.0/direct', {
      params: {
        q: search,
        limit: WEATHER_API.DEFAULTS.SEARCH_RESULT_LIMIT,
      },
    });

    return response.data as Geocoding[];
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setDialogOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!search) return;

    (async () => {
      const geoData = await geocoding(search);
      if (geoData) setResults(geoData);
      console.log(geoData);
    })();
  }, [search, geocoding]);

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={setDialogOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          className='me-auto max-lg:size-9 lg:bg-secondary dark:lg:bg-secondary/50'
          onClick={() => setDialogOpen((prev) => !prev)}
        >
          <Search className='lg:text-muted-foreground text-icon' />
          <div className='flex justify-between w-62.5 max-lg:hidden'>
            Search Weather...
            <KbdGroup>
              <Kbd>Ctrl</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent
        className='p-0 bg-card gap-0'
        showCloseButton={false}
      >
        <DialogHeader className='sr-only'>
          <DialogTitle>
            <MapPinSearch className='inline me-2' />
            Search Location
          </DialogTitle>
          <DialogDescription>
            Enter a city name to get weather information
          </DialogDescription>
        </DialogHeader>
        <InputGroup className='ring-0! border-t-0! border-x-0! border-b border-border! rounded-b-none bg-transparent! h-8!'>
          <InputGroupInput
            placeholder='Search Location...'
            value={search}
            onInput={(e) => setSearch(e.currentTarget.value)}
          />

          <InputGroupAddon>
            <Search className='text-icon' />
          </InputGroupAddon>
        </InputGroup>

        <ItemGroup className='min-h-40 p-2'>
          {!results?.length && (
            <div className='flex justify-center align-center my-auto py-4'>
              <MapPinSearch className='inline me-2 text-icon' />
              <p className='text-sm pt-0.5'>Enter City Name</p>
            </div>
          )}
          {results?.map(({ name, lat, lon, state, country }) => (
            <ItemActions>
              <DialogClose
                asChild
                className='w-full!'
              >
                <Item
                  key={name + lat + lon}
                  size='sm'
                  className='relative p-2 hover:bg-card'
                  onClick={() => {
                    setWeather({ lat, lon });
                    sessionStorage.setItem(APP.STORE_KEY.LAT, lat.toString());
                    sessionStorage.setItem(APP.STORE_KEY.LON, lon.toString());
                  }}
                >
                  <ItemContent>
                    <ItemTitle>{name}</ItemTitle>
                    <ItemDescription>
                      {state ? state + ', ' : ''}
                      {country}
                    </ItemDescription>
                  </ItemContent>

                  <Button
                    variant='ghost'
                    size='icon'
                    className='after:absolute after:inset-0'
                  >
                    <MapPinned className='text-icon' />
                  </Button>
                </Item>
              </DialogClose>
            </ItemActions>
          ))}
        </ItemGroup>
      </DialogContent>
    </Dialog>
  );
};
