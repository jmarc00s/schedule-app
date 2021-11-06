import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Routes';
import Header from './components/Header';

function App() {
  return (
    <main className="w-screen h-screen bg-gray-200">
      <BrowserRouter>
        <Header />
        <section className="max-w-6xl mx-auto pt-5 px-2 bg-white">
          <Router />
        </section>
      </BrowserRouter>
    </main>
  );
}

export default App;
