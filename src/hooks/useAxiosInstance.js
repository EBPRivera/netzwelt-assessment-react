import axios from "axios";

const useAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL || "http://localhost:8080",
  });

  return axiosInstance;
};

export default useAxiosInstance;
