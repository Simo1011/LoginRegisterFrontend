import React from 'react';                      // Import React
import { Navigate } from 'react-router-dom';    // Import Navigate from react-router-dom
import AuthService from '../services/AuthService'; // Import AuthService to check authentication

interface PrivateRouteProps {
  children: JSX.Element; // Type for the children prop
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  if (!AuthService.isAuthenticated()) {
    return <Navigate to="/login" />; // Redirect to login if the user is not authenticated
  }

  return children; // Render child components if authenticated
};

export default PrivateRoute; // Export the PrivateRoute component as default
