import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import WelcomePage from './components/WelcomePage';
import PrivateRoute from './utils/PrivateRoute';
import ContactPage  from './components/ContactPage'// Contact page component
import Navbar from './components/Navbar';  // Import Navbar component

const App: React.FC = () => {
  return (
    <Router>
      <Navbar /> {/* Add the Navbar here to display it on all pages */}
      <Routes>
        {/* Redirect / to /login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login Page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Welcome Page protected by PrivateRoute */}
        <Route path="/welcome" element={<PrivateRoute><WelcomePage /></PrivateRoute>} />

        {/* Contact Us Page */}
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
};

export default App;
