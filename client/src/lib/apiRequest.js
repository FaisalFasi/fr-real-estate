import axios from "axios";

const apiRequest = axios.create({
  baseURL: process.env.VITE_API_BASE_URL,
  withCredentials: true,
});

apiRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiRequest;
// baseURL: "http://localhost:8800/api",
