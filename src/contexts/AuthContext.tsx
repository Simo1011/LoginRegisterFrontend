import React, { createContext, useContext, useState } from 'react';
import AuthService from '../services/AuthService';  // Use AuthService to handle user state

// Define the type for the User object (which includes username and token)
interface User {
  username: string;
  token: string;
}

// Define the types for the AuthContext
interface AuthContextType {
  currentUser: User | null;  // `currentUser` can be null if the user is not logged in
  login: (username: string, password: string) => Promise<void>;  // Function for logging in
  logout: () => void;  // Function for logging out
  isAuthenticated: () => boolean;  // Function to check if the user is authenticated
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provide the AuthContext to the component tree
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(AuthService.getUser());  // Initialize with current user if exists

  // Function for logging in
  const login = async (username: string, password: string) => {
    await AuthService.login(username, password);  // Call login from AuthService
    setCurrentUser(AuthService.getUser());  // Update current user
  };

  // Function for logging out
  const logout = () => {
    AuthService.logout();  // Call logout from AuthService
    setCurrentUser(null);  // Clear the current user

  };

  // Function to check if the user is authenticated
  const isAuthenticated = () => {
    return AuthService.getUser() !== null;  // Check if the user exists in localStorage
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
