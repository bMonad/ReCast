import '@/App.css';
import { TopAppBar } from '@/components/TopAppBar';
import { WeatherProvider } from '@/components/WeatherProvider';
import PageHeader from '@/components/PageHeader';

function App() {
  return (
    <WeatherProvider>
      <TopAppBar />

      <main className='py-4'>
        <div className='container'>
          <PageHeader />
        </div>
      </main>
    </WeatherProvider>
  );
}

export default App;
