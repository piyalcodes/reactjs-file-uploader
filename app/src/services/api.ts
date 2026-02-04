import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const apiClient: AxiosInstance = axios.create({
  baseURL: baseUrl,
});

export const api = {

  post: <T = unknown>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    return apiClient.post(url, data, config).then((response) => response.data);
  },

  sse: (path: string, onMessage: (data: unknown) => void): EventSource => {
    const url = new URL(path, baseUrl).toString();

    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        onMessage(parsed);
      } catch (err) {
        console.error("SSE parse error:", err);
      }
    };

    eventSource.onerror = (err) => {
      console.error("SSE error:", err);
    };

    return eventSource;
  },
};
