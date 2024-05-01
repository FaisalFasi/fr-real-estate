import axios from "axios";

const apiRequest = axios.create({
  baseURL: process.env.VITE_API_BASE_URL,
  withCredentials: true,
});

export default apiRequest;

// import axios from "axios";

// const apiRequest = axios.create({
//   baseURL: "http://localhost:8800/api",
//   withCredentials: true,
// });

// export default apiRequest;
