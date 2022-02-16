import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Router from './core/config/routes/Routes';

import 'react-toastify/dist/ReactToastify.min.css';
import { AuthProvider } from './core/context/AuthContext';

function App() {
  return (
    <main className="w-screen h-screen">
      <ToastContainer
        autoClose={2000}
        closeButton={true}
        position={'top-right'}
        pauseOnHover={false}
      />
      <BrowserRouter>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </BrowserRouter>
    </main>
  );
}

export default App;
