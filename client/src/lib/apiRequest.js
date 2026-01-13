import axios from "axios";

const apiRequest = axios.create({
  baseURL: process.env.VITE_API_BASE_URL || "http://localhost:8800/api",
  withCredentials: true,
});

// Add request interceptor for debugging
apiRequest.interceptors.request.use(
  (config) => {
    console.log("API Request:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
apiRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", {
      message: error.message,
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

export default apiRequest;
