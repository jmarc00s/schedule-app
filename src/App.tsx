import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Routes';
import Header from './components/Header';

function App() {
  return (
    <main className="w-screen h-screen">
      <BrowserRouter>
        <Header />
        <section className="max-w-5xl mx-auto pt-5">
          <Router />
        </section>
      </BrowserRouter>
    </main>
  );
}

export default App;
