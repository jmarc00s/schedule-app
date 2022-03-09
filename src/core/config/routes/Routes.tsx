import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from 'src/components/template/Layout';
import Login from 'src/pages/Login';

import Home from '../../../pages/Home';
import ScheduleFormPage from '../../../pages/schedule/ScheduleFormPage';
import Schedules from '../../../pages/schedule/Schedules';
import ServiceForm from '../../../pages/services/ServiceForm';
import Services from '../../../pages/services/Services';
import ProtectedRoute from './ProtectedRoute';

const Clients = React.lazy(() => import('../../../pages/client/Clients'));
const ClientForm = React.lazy(() => import('../../../pages/client/ClientForm'));
const User = React.lazy(() => import('src/pages/user'));

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<>...</>}>
                <Clients></Clients>
              </React.Suspense>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/clients/add"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<>...</>}>
                <ClientForm />
              </React.Suspense>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/clients/:id/edit"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<>...</>}>
                <ClientForm />
              </React.Suspense>
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/schedules"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<>...</>}>
                <Schedules />
              </React.Suspense>
            </ProtectedRoute>
          }
        />

        <Route
          path="/schedules/add"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<>...</>}>
                <ScheduleFormPage />
              </React.Suspense>
            </ProtectedRoute>
          }
        />

        <Route
          path="/schedules/:id/edit"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<>...</>}>
                <ScheduleFormPage />
              </React.Suspense>
            </ProtectedRoute>
          }
        />

        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<>...</>}>
                <Services />
              </React.Suspense>
            </ProtectedRoute>
          }
        />

        <Route
          path="/services/add"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<>...</>}>
                <ServiceForm />
              </React.Suspense>
            </ProtectedRoute>
          }
        />

        <Route
          path="/services/:id/edit"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<>...</>}>
                <ServiceForm />
              </React.Suspense>
            </ProtectedRoute>
          }
        />

        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<>...</>}>
                <User />
              </React.Suspense>
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default Router;
