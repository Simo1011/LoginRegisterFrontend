import React, { createContext, useState, useContext, ReactNode } from 'react';
import AuthService from '../services/AuthService';

// Define the AuthContext type
interface AuthContextType {
  username: string | null;
  login: (username: string) => void;
  logout: () => void;
}

// Create the AuthContext with default values
const AuthContext = createContext<AuthContextType>({
  username: null,
  login: () => {},
  logout: () => {},
});

// AuthProvider component to wrap the app
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(AuthService.getCurrentUser()?.username || null);

  const login = (username: string) => {
    setUsername(username);
  };

  const logout = () => {
    AuthService.logout();
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
