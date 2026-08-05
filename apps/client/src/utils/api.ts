type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

let refreshPromise: Promise<boolean> | null = null;

const refreshSession = () => {
  if (!refreshPromise) {
    refreshPromise = fetch('/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    })
      .then((response) => response.ok)
      .catch(() => false)
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

const readResponse = async <TResponse>(response: Response) => {
  if (response.status === 204) return undefined;

  const contentType = response.headers.get('content-type');
  if (!contentType?.includes('application/json')) return undefined;

  return (await response.json()) as TResponse;
};

export const apiRequest = async <TResponse, TBody = unknown>(
  method: Method,
  url: string,
  data?: TBody,
  signal?: AbortSignal,
  retryAuth = true
): Promise<TResponse | undefined> => {
  try {
    const hasBody = data !== undefined && method !== 'GET';
    const response = await fetch(url, {
      method,
      signal,
      credentials: 'include',
      headers: hasBody ? { 'Content-Type': 'application/json' } : undefined,
      body: hasBody ? JSON.stringify(data) : undefined,
    });

    if (
      response.status === 401 &&
      retryAuth &&
      url !== '/auth/refresh' &&
      (await refreshSession())
    ) {
      return apiRequest(method, url, data, signal, false);
    }

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return readResponse<TResponse>(response);
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return undefined;
    }

    console.error('API request failed', error);
    throw error;
  }
};

export const apiGet = async <T>(url: string, signal?: AbortSignal) =>
  apiRequest<T>('GET', url, undefined, signal);

export const apiPost = async <TResponse, TBody = unknown>(
  url: string,
  data?: TBody
) => apiRequest<TResponse, TBody>('POST', url, data);

export const apiPut = async <TResponse, TBody>(url: string, data: TBody) =>
  apiRequest<TResponse, TBody>('PUT', url, data);

export const apiDelete = async (url: string, signal?: AbortSignal) =>
  apiRequest<void>('DELETE', url, undefined, signal);
