import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import WelcomePage from './components/WelcomePage';
import PrivateRoute from './utils/PrivateRoute';

// Define a simple Home Page component
const HomePage: React.FC = () => {
  return (
    <div className="container mt-5">
      <h1>Welcome to the Home Page</h1>
      <p>This is the homepage of the application. Use the navigation to login.</p>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Define a route for the home page ("/") */}
        <Route path="/" element={<HomePage />} />
        
        {/* Define a route for the login page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Define a private route for the welcome page */}
        <Route path="/welcome" element={<PrivateRoute><WelcomePage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
