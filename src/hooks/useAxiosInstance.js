import axios from "axios";

const useAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: "https://netzwelt-devtest.azurewebsites.net/",
  });

  return axiosInstance;
};

export default useAxiosInstance;
