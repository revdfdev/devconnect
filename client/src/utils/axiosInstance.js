import axios from "axios";
const baseURL = process.env.REACT_APP.BASE_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 20000,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json"
  }
});

export default axiosInstance;
