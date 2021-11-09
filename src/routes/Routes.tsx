import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';

const Clients = React.lazy(() => import('../pages/client/Clients'));
const ClientForm = React.lazy(() => import('../pages/client/ClientForm'));

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="clients"
        element={
          <React.Suspense fallback={<>...</>}>
            <Clients></Clients>
          </React.Suspense>
        }
      ></Route>
      <Route
        path="/clients/add"
        element={
          <React.Suspense fallback={<>...</>}>
            <ClientForm />
          </React.Suspense>
        }
      ></Route>
      <Route
        path="/clients/:id/edit"
        element={
          <React.Suspense fallback={<>...</>}>
            <ClientForm />
          </React.Suspense>
        }
      ></Route>
    </Routes>
  );
};

export default Router;
