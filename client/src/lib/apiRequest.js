import axios from "axios";

// Function to retrieve token from cookies
const getTokenFromCookie = () => {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));
  if (tokenCookie) {
    return tokenCookie.split("=")[1]; // Extract the token value
  }
  return null; // Token not found
};

// Create an Axios instance with baseURL and withCredentials set to true
const apiRequest = axios.create({
  baseURL: process.env.VITE_API_BASE_URL,
  withCredentials: true,
});
console.log("apiRequest: ", apiRequest);

// Interceptor to add Authorization header with token from cookie to each request
apiRequest.interceptors.request.use(
  (config) => {
    const token = getTokenFromCookie();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiRequest;

// import axios from "axios";

// const apiRequest = axios.create({
//   baseURL: "http://localhost:8800/api",
//   withCredentials: true,
// });

// export default apiRequest;
