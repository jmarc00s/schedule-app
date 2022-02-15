import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Router from './core/config/routes/Routes';

import 'react-toastify/dist/ReactToastify.min.css';
import Layout from './components/template/Layout';
import { AuthProvider } from './core/context/AuthContext';

function App() {
  return (
    <main>
      <ToastContainer
        autoClose={2000}
        closeButton={true}
        position={'top-right'}
        pauseOnHover={false}
      />
      <AuthProvider>
        <BrowserRouter>
          <Layout>
            <Router />
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </main>
  );
}

export default App;
