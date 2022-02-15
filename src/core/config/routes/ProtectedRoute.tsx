import React from 'react';
import { Route, useNavigate } from 'react-router-dom';
import useAuth from 'src/core/hooks/useAuth';

interface ProtectedRouteProps {
  path: string;
  children: any;
}

const ProtectedRoute = ({ path, children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  console.log(isAuthenticated);

  if (!isAuthenticated) {
    return <Route path={path}> {children} </Route>;
  } else {
    navigate('/login');
  }

  return null;
};

export default ProtectedRoute;
