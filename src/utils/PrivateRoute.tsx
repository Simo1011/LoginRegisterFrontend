import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/AuthService'; // Use AuthService to check authentication

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  if (!AuthService.isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
