import { useState } from 'react';
import { APP } from '@/config';
import { getUserLocation } from '@/lib/utils';
import { useWeather } from '@/hooks/useWeather';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { LocateFixed } from 'lucide-react';

const PageHeader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { weather, setWeather } = useWeather();

  const onLocateHandler = async () => {
    setIsLoading(true);

    try {
      const { lat, lon } = await getUserLocation();

      await setWeather({ lat, lon });

      localStorage.setItem(APP.STORE_KEY.LAT, lat.toString());
      localStorage.setItem(APP.STORE_KEY.LON, lon.toString());
    } catch (err) {
      alert(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!weather) return <Skeleton className='w-40 h-4 mt-2 mb-6' />;

  return (
    <div className='flex items-center gap-4 mb-4'>
      <h2>
        {weather.location.name},{' '}
        {weather.location.state ? weather.location.state + ', ' : ''}{' '}
        {weather.location.country}
      </h2>

      <Button variant='outline' size='icon-sm' onClick={onLocateHandler}>
        {isLoading ? <Spinner /> : <LocateFixed className='text-icon' />}
      </Button>
    </div>
  );
};

export default PageHeader;
