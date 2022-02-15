import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from 'src/pages/Login';

import Home from '../../../pages/Home';
import ScheduleForm from '../../../pages/schedule/ScheduleForm';
import Schedules from '../../../pages/schedule/Schedules';
import ServiceForm from '../../../pages/services/ServiceForm';
import Services from '../../../pages/services/Services';
import ProtectedRoute from './ProtectedRoute';

const Clients = React.lazy(() => import('../../../pages/client/Clients'));
const ClientForm = React.lazy(() => import('../../../pages/client/ClientForm'));

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
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
        path="/schedules/add"
        element={
          <React.Suspense fallback={<>...</>}>
            <ScheduleForm />
          </React.Suspense>
        }
      />

      <Route
        path="/schedules/:id/edit"
        element={
          <React.Suspense fallback={<>...</>}>
            <ScheduleForm />
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
