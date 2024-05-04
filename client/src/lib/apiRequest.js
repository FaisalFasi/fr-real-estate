import axios from "axios";

const apiRequest = axios.create({
  baseURL: process.env.VITE_API_BASE_URL,
  withCredentials: true,
});
axios.defaults.withCredentials = true;

export default apiRequest;

// import axios from "axios";

// const apiRequest = axios.create({
//   baseURL: "httxp://localhost:8800/api",
//   withCredentials: true,
// });

// export default apiRequest;
