import axios from 'axios';

const api = axios.create({
  baseURL: 'http://kranti.ap-south-1.elasticbeanstalk.com/api', // Your Spring Boot backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});
// Add a request interceptor to attach the token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;
