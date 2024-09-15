import axios from 'axios';
import AuthService from './AuthService';  // Import AuthService to get the token

const API_URL = 'http://localhost:8080/api/tasks';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Add an interceptor to attach the token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = AuthService.getToken();  // Get the token from AuthService
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  // Attach the token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Fetch all tasks with the attached token
// Fetch all tasks with the attached token
export const getAllTasks = async () => {
    try {
      const response = await axiosInstance.get('');
      return response.data;  // Return the data if the request is successful
    } catch (error: unknown) {  // Use 'unknown' type for error
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        console.error('Axios error:', error.response?.status, error.response?.data);
        throw new Error('Error fetching tasks: ' + (error.response?.data?.message || 'Unknown error'));
      } else if (error instanceof Error) {
        // Handle generic errors
        console.error('Error message:', error.message);
        throw new Error('Error fetching tasks: ' + error.message);
      } else {
        // Handle unexpected errors
        console.error('Unexpected error:', error);
        throw new Error('Unexpected error occurred while fetching tasks');
      }
    }
  };

// Create a new task
export const createTask = async (taskData: { title: string; description: string; dueDate: string; completed: boolean }) => {
    try {
      const response = await axiosInstance.post('', taskData);  // Send POST request to create task
      return response.data;
    } catch (error) {
      throw new Error('Error creating task');
    }
  };

// Update an existing task
export const updateTask = async (taskId: number, taskData: { title: string; description: string; dueDate: string; completed: boolean }) => {
  return await axiosInstance.put(`/${taskId}`, taskData);
};

// Delete a task
export const deleteTask = async (taskId: number) => {
  return await axiosInstance.delete(`/${taskId}`);
};
