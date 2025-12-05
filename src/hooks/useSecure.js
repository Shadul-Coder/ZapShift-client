import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_server,
});

const useSecure = () => {
  const { user, signOutuser } = useAuth();
  useEffect(() => {
    const reqInterceptor = axiosInstance.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
      return config;
    });
    const resInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const errorCode = error.status;
        if (errorCode === 401 || errorCode === 403) {
          signOutuser().then().catch();
        }
      }
    );
    return () => {
      axiosInstance.interceptors.request.eject(reqInterceptor);
      axiosInstance.interceptors.response.eject(resInterceptor);
    };
  }, [user, signOutuser]);

  return axiosInstance;
};

export default useSecure;
