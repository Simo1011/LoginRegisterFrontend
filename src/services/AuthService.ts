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
        // Assuming the backend only returns the token, store it
        const user = { username, token: data.token };  // Use the passed username here
        localStorage.setItem('user', JSON.stringify(user));  // Store the token and username
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

  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).token : null;
  },

  logout: () => {
    localStorage.removeItem('user');  // Remove the user from localStorage on logout
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('user');  // Check if the user exists in localStorage
  }
};

export default AuthService;
