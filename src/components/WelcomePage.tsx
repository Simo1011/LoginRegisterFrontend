import React, { useState, useEffect } from 'react';  // Import React and necessary hooks
import AuthService from '../services/AuthService';   // Import AuthService to fetch user information

const WelcomePage: React.FC = () => {
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setUsername(user.username);
    }
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <h1>Welcome, {username}!</h1>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage; // Ensure that WelcomePage is exported as a default export
