import { useAuthStore } from "@/modules/auth/store/useAuthStore";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiRequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined>;
  auth?: boolean;
  retryOnUnauthorized?: boolean;
}

interface RequestConfig extends ApiRequestOptions {
  method: HttpMethod;
}

const ensureAbsoluteUrl = (path: string) => {
  if (/^https?:\/\//i.test(path)) {
    return new URL(path);
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const base = API_BASE_URL?.trim()
    ? API_BASE_URL.replace(/\/$/, "")
    : window.location.origin;
  return new URL(normalizedPath, base);
};

const buildUrl = (path: string, params?: ApiRequestOptions["params"]) => {
  const url = ensureAbsoluteUrl(path);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      url.searchParams.append(key, String(value));
    });
  }
  return url.toString();
};

const isJsonBody = (body: unknown) =>
  body !== undefined &&
  !(body instanceof FormData) &&
  typeof body !== "string" &&
  !(body instanceof Blob);

const serializeBody = (body: unknown): BodyInit | null | undefined => {
  if (body === undefined) return undefined;
  if (
    body instanceof FormData ||
    body instanceof Blob ||
    typeof body === "string" ||
    body instanceof URLSearchParams
  ) {
    return body as BodyInit;
  }
  return JSON.stringify(body);
};

const parseResponseBody = async (response: Response) => {
  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers?.get?.("Content-Type") ?? null;

  if (!contentType) {
    try {
      return await response.json();
    } catch {
      try {
        return await response.text();
      } catch {
        return null;
      }
    }
  }

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
};

const createHeaders = (options: RequestConfig) => {
  const headers = new Headers(options.headers ?? {});
  if (isJsonBody(options.body) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  return headers;
};

const executeRequest = async <T>(
  path: string,
  options: RequestConfig
): Promise<T> => {
  const {
    body,
    params,
    auth = true,
    credentials = "include",
    ...rest
  } = options;

  const { logout } = useAuthStore.getState();
  const headers = createHeaders(options);
  const requestInit: RequestInit = {
    ...rest,
    credentials,
    headers,
    body: serializeBody(body),
  };

  const response = await fetch(buildUrl(path, params), requestInit);

  if (response.status === 401 && auth !== false) {
    logout();
    throw new ApiError("Sesión expirada", 401);
  }

  if (!response.ok) {
    const errorPayload = await parseResponseBody(response);
    const message =
      (errorPayload as { message?: string })?.message ??
      response.statusText ??
      "Error desconocido";
    throw new ApiError(message, response.status, errorPayload);
  }

  return (await parseResponseBody(response)) as T;
};

const request = async <T>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> => {
  const config: RequestConfig = {
    ...options,
    method: (options.method || "GET") as HttpMethod,
  };

  return executeRequest<T>(path, config);
};

const createMethod =
  (method: HttpMethod) =>
    <T>(path: string, options: ApiRequestOptions = {}) =>
      request<T>(path, { ...options, method });

export const apiClient = Object.assign(request, {
  get: createMethod("GET"),
  post: createMethod("POST"),
  put: createMethod("PUT"),
  patch: createMethod("PATCH"),
  delete: createMethod("DELETE"),
});
