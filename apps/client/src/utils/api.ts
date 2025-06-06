import axios, { type AxiosRequestConfig } from 'axios';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const axiosRequest = async <TResponse, TBody = unknown>(
  method: Method,
  url: string,
  data?: TBody,
  signal?: AbortSignal,
  externalConfig?: AxiosRequestConfig
): Promise<TResponse | undefined> => {
  const config: AxiosRequestConfig = {
    ...externalConfig,
    signal,
  };

  try {
    const response =
      method === 'GET'
        ? await axios.get<TResponse>(url, config)
        : method === 'POST'
          ? await axios.post<TResponse>(url, data, config)
          : method === 'PUT'
            ? await axios.put<TResponse>(url, data, config)
            : await axios.delete<TResponse>(url, config);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ERR_CANCELED') {
        console.warn('Request canceled');
        return undefined;
      }
      console.error(
        `Axios error: ${error.response?.status || 'Unknown'} - ${error.message}`
      );
    } else {
      console.error('Unexpected error occurred', error);
    }
    throw error;
  }
};

// Convenience helpers
export const axiosGet = async <T>(url: string, signal?: AbortSignal) =>
  axiosRequest<T>('GET', url, undefined, signal);

export const axiosPost = async <TResponse, TBody>(url: string, data: TBody) =>
  axiosRequest<TResponse, TBody>('POST', url, data);

export const axiosPut = async <TResponse, TBody>(url: string, data: TBody) =>
  axiosRequest<TResponse, TBody>('PUT', url, data);

export const axiosDelete = async (url: string, signal?: AbortSignal) =>
  axiosRequest<void>('DELETE', url, undefined, signal);
