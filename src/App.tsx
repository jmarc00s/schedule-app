import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Router from './core/config/routes/Routes';

import 'react-toastify/dist/ReactToastify.min.css';
import { AuthProvider } from './core/context/AuthContext';
import { SchedulesProvider } from './core/context/SchedulesContext';

function App() {
  return (
    <main className="flex flex-auto flex-col w-full min-w-0 h-screen">
      <ToastContainer
        autoClose={2000}
        closeButton={true}
        position={'top-right'}
        pauseOnHover={false}
      />
      <BrowserRouter>
        <AuthProvider>
          <SchedulesProvider>
            <Router />
          </SchedulesProvider>
        </AuthProvider>
      </BrowserRouter>
    </main>
  );
}

export default App;
