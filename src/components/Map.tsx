import { useEffect, useMemo, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { MAPBOX } from '@/config';
import { useWeather } from '@/hooks/useWeather';
import { useTheme } from '@/components/ThemeProvider';
import type { LngLatLike, Map as MapType } from 'mapbox-gl';
import Marker from './Marker';

export const Map = () => {
  const { theme } = useTheme();
  const { weather } = useWeather();

  const center = useMemo<LngLatLike>(
    () =>
      weather
        ? [weather.location.lon, weather.location.lat]
        : MAPBOX.DEFAULTS.CENTER,
    [weather],
  );

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<MapType | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || !center) return;

    const newMap = new mapboxgl.Map({
      accessToken: import.meta.env.VITE_MAPBOX_TOKEN,
      container: mapContainerRef.current,
      center,
      zoom: MAPBOX.DEFAULTS.ZOOM,
      config: {
        basemap: {
          lightPreset: theme === 'light' ? 'day' : 'night',
        },
      },
    });

    setMap(newMap);

    return () => {
      map?.remove();
    };
  }, [mapContainerRef, center, theme]);

  return (
    <>
      <div
        ref={mapContainerRef}
        className='h-75 bg-card text-card-foreground rounded-xl border overflow-hidden shadow-sm'
      ></div>
      {map && (
        <Marker
          map={map}
          coordinates={center}
        />
      )}
    </>
  );
};
