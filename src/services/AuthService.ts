interface User {
    username: string;
    token: string;
  }
  
  const AuthService = {
    login: async (username: string, password: string): Promise<void> => {
      try {
        const response = await fetch('http://localhost:8080/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('user', JSON.stringify(data)); // Store user data in localStorage
        } else {
          throw new Error(data.message || 'Login failed');
        }
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message || 'Network error');
        } else {
          throw new Error('An unknown error occurred');
        }
      }
    },
  
    logout: () => {
      localStorage.removeItem('user');
    },
  
    getCurrentUser: (): User | null => {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    },
  
    isAuthenticated: (): boolean => {
      return !!localStorage.getItem('user');
    },
  };
  
  export default AuthService;
  