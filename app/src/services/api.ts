import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

const baseUrl = "http://localhost:3010/";

const apiClient: AxiosInstance = axios.create({
  baseURL: baseUrl,
});

export const api = {
  get: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.get(url, config).then((response) => response.data);
  },

  post: <T = unknown>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    return apiClient.post(url, data, config).then((response) => response.data);
  },

  put: <T = unknown>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    return apiClient.put(url, data, config).then((response) => response.data);
  },

  delete: <T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    return apiClient.delete(url, config).then((response) => response.data);
  },
};
