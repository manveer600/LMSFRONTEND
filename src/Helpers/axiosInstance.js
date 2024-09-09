import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
console.log('base url is this', BASE_URL);

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

export default axiosInstance;
