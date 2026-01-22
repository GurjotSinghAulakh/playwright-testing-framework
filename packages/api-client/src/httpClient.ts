import type { APIRequestContext, APIRequestOptions } from "@playwright/test";

type RequestOptions = Omit<APIRequestOptions, "data">;

type HttpResponse<T> = {
  status: number;
  data: T;
};

export const createHttpClient = (apiRequest: APIRequestContext) => {
  return {
    get: async <T>(url: string, options?: RequestOptions): Promise<HttpResponse<T>> => {
      const response = await apiRequest.get(url, options);
      const data = (await response.json()) as T;

      return { status: response.status(), data };
    },
    post: async <T>(
      url: string,
      data?: unknown,
      options?: RequestOptions
    ): Promise<HttpResponse<T>> => {
      const response = await apiRequest.post(url, { ...options, data });
      const payload = (await response.json()) as T;

      return { status: response.status(), data: payload };
    }
  };
};
