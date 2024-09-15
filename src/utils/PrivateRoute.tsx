import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/AuthService'; // Use AuthService to check authentication

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = AuthService.isAuthenticated();
  console.log('Authenticated:', isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};
export default PrivateRoute;
