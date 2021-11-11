import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Schedules from '../pages/schedule/Schedules';
import ServiceForm from '../pages/services/ServiceForm';
import Services from '../pages/services/Services';

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

      <Route
        path="/schedules"
        element={
          <React.Suspense fallback={<>...</>}>
            <Schedules />
          </React.Suspense>
        }
      />

      <Route
        path="/services"
        element={
          <React.Suspense fallback={<>...</>}>
            <Services />
          </React.Suspense>
        }
      />

      <Route
        path="/services/add"
        element={
          <React.Suspense fallback={<>...</>}>
            <ServiceForm />
          </React.Suspense>
        }
      />

      <Route
        path="/services/:id/edit"
        element={
          <React.Suspense fallback={<>...</>}>
            <ServiceForm />
          </React.Suspense>
        }
      />
    </Routes>
  );
};

export default Router;
