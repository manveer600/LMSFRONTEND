import axios from "axios";

const BASE_URL = 'https://lmsbackend-aeam732k6-manveer-singhs-projects.vercel.app';

const axiosInstance = axios.create(); 
// console.log(axiosInstance);
// console.log(axiosInstance.defaults);
//axios ki instance bna lo taaki tum axios ki jgh uska instance use kr sko har jgh and this instance hai n number of properties FOR EG:
axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;