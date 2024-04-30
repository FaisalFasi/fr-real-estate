import axios from "axios";

console.log(process.env.VITE_API_BASE_URL);
const apiRequest = axios.create({
  baseURL: process.env.VITE_API_BASE_URL,
  withCredentials: true,
});

export default apiRequest;
// baseURL: "http://localhost:8800/api",
