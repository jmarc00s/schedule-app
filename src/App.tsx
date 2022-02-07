import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Routes';

function App() {
  return (
    <main>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </main>
  );
}

export default App;
