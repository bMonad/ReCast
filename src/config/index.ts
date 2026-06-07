/**
 * Types
 */
// import type { LngLatLike } from 'mapbox-gl';

export const WEATHER_API = {
  DEFAULTS: {
    LAT: 28.6448,
    LON: 77.2167,
    UNIT: 'metric',
    LANG: 'en',
    SEARCH_RESULT_LIMIT: 5,
  },
} as const;

export const MAPBOX = {
  DEFAULTS: {
    // CENTER: [WEATHER_API.DEFAULTS.LON, WEATHER_API.DEFAULTS.LAT] as LngLatLike,
    ZOOM: 12.5,
  },
} as const;

export const APP = {
  STORE_KEY: {
    LAT: 'recast-lat',
    LON: 'recast-lon',
    UNIT: 'recast-unit',
  },
  UNIT: {
    TEMP: {
      metric: '°C',
      imperial: '°F',
    },
    WIND: {
      metric: 'm/s',
      imperial: 'mph',
    },
  },
} as const;