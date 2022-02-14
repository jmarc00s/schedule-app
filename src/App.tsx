import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Router from './core/config/routes/Routes';

import 'react-toastify/dist/ReactToastify.min.css';
import Layout from './components/template/Layout';

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
        <Layout>
          <Router />
        </Layout>
      </BrowserRouter>
    </main>
  );
}

export default App;
