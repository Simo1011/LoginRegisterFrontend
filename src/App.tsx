import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import TaskList from './components/TaskList';    // Task List Component
import PrivateRoute from './utils/PrivateRoute';
import ContactPage from './components/ContactPage';
import Navbar from './components/Navbar';
import { AuthProvider } from './contexts/AuthContext'; 
import CreateTask from './components/CreateTask'; // Import AuthProvider
import './App.css';  // Import the custom CSS
import UpdateTask from './components/UpdateTask';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contact" element={<ContactPage />} />
      

          {/* Private Routes */}
          <Route path="/tasks" element={<PrivateRoute><TaskList /></PrivateRoute>} />
          <Route path="/tasks/:taskId/edit" element={<PrivateRoute><UpdateTask /></PrivateRoute>} />
          <Route path="/tasks/new" element={<PrivateRoute><CreateTask /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
