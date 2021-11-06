import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Clients from '../pages/client/Clients';
import ClientForm from '../pages/client/ClientForm';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="clients" element={<Clients />} />
      <Route path="/clients/add" element={<ClientForm />} />
      <Route path="/clients/:id/edit" element={<ClientForm />} />
    </Routes>
  );
};

export default Router;
