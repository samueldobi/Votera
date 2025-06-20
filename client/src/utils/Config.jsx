import axios from 'axios';

// Your backend URL
  const apiUrl = import.meta.env.VITE_API_URL;

// Create a configured axios instance
const apiClient = axios.create({
  baseURL: apiUrl,
  withCredentials: true
});

// Add interceptor to this instance
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Export the configured instance
export default apiClient;
export { apiUrl as apiUrl };