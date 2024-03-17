import axios from 'axios';

const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

// Add a request interceptor
apiInstance.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiInstance;
