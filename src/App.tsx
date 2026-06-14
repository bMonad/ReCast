import '@/App.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { TopAppBar } from '@/components/TopAppBar';
import { WeatherProvider } from '@/components/WeatherProvider';
import PageHeader from '@/components/PageHeader';
import CurrentWeatherCard from '@/components/CurrentWeatherCard';
import { Map } from '@/components/Map';

function App() {
  return (
    <WeatherProvider>
      <TopAppBar />

      <main className='py-4'>
        <div className='container'>
          <PageHeader />

          <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
            <CurrentWeatherCard />
            <Map />
          </div>
        </div>
      </main>
    </WeatherProvider>
  );
}

export default App;
