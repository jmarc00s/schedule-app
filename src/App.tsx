import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Router from './core/config/routes/Routes';

import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  return (
    <main>
      <ToastContainer
        autoClose={2000}
        closeButton={true}
        position={'top-right'}
        pauseOnHover={false}
      />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </main>
  );
}

export default App;
