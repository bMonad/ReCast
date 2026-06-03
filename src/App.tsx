import '@/App.css';
import { TopAppBar } from '@/components/TopAppBar';
import { WeatherProvider } from './components/WeatherProvider';

function App() {
  return (
    <WeatherProvider>
      <TopAppBar />
    </WeatherProvider>
  );
}

export default App;
