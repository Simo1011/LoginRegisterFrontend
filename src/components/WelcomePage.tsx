import React from 'react';
import AuthService from '../services/AuthService';  // Use AuthService to get user data

const WelcomePage: React.FC = () => {
  const user = AuthService.getUser();  // Get the user from AuthService

  return (
    <div className="container mt-4">
      <h1>Welcome {user ? user.username : 'Guest'}!</h1>  {/* Display username if user is logged in */}
    </div>
  );
};

export default WelcomePage;
