import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import WelcomePage from './components/WelcomePage';
import PrivateRoute from './utils/PrivateRoute';
import ContactPage from './components/ContactPage';
import Navbar from './components/Navbar';
import { AuthProvider } from './contexts/AuthContext' // Import AuthProvider

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/welcome" element={<PrivateRoute><WelcomePage /></PrivateRoute>} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
