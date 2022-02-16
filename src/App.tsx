import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Router from './core/config/routes/Routes';

import 'react-toastify/dist/ReactToastify.min.css';
import Layout from './components/template/Layout';
import { AuthProvider } from './core/context/AuthContext';
import useAuth from './core/hooks/useAuth';

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <main className="w-screen h-screen">
      <ToastContainer
        autoClose={2000}
        closeButton={true}
        position={'top-right'}
        pauseOnHover={false}
      />
      <AuthProvider>
        <BrowserRouter>
          {isAuthenticated ? (
            <Layout>
              <Router />
            </Layout>
          ) : (
            <Router />
          )}
        </BrowserRouter>
      </AuthProvider>
    </main>
  );
}

export default App;
