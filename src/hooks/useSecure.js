import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
});

const useSecure = () => {
  return axiosInstance;
};

export default useSecure;
