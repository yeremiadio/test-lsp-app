import axios from "axios";
import { deleteCookie, getCookie } from "./customCookie";

export default function apiClient() {

  const apiClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });

  apiClient.interceptors.request.use(function (config) {
    const token = getCookie('token');
    config.headers!.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });

  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        deleteCookie('token')
        return Promise.reject();
      }

      return Promise.reject(error);
    }
  );

  return apiClient;
}
