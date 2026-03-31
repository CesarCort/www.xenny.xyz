import {
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
  QueryKey,
} from "@tanstack/react-query";
import { apiClient, ApiError, ApiRequestOptions } from "./apiClient";

export interface UseApiQueryOptions<TData>
  extends Omit<
    UseQueryOptions<TData, ApiError, TData, QueryKey>,
    "queryKey" | "queryFn"
  > {
  queryKey: QueryKey;
  path: string;
  request?: ApiRequestOptions;
}

export const useApiQuery = <TData>(
  options: UseApiQueryOptions<TData>
): UseQueryResult<TData, ApiError> =>
  useQuery({
    ...options,
    queryKey: options.queryKey,
    queryFn: () => apiClient.get<TData>(options.path, options.request),
  });

export interface UseApiMutationOptions<TData, TVariables>
  extends Omit<
    UseMutationOptions<TData, ApiError, TVariables>,
    "mutationFn"
  > {
  path: string | ((variables: TVariables) => string);
  method?: ApiRequestOptions["method"];
  getRequestOptions?: (variables: TVariables) => ApiRequestOptions;
}

export const useApiMutation = <TData, TVariables = void>(
  options: UseApiMutationOptions<TData, TVariables>
): UseMutationResult<TData, ApiError, TVariables> =>
  useMutation({
    ...options,
    mutationFn: async (variables: TVariables) => {
      const path =
        typeof options.path === "function"
          ? options.path(variables)
          : options.path;
      const requestOptions =
        options.getRequestOptions?.(variables) ?? { body: variables };
      const method =
        options.method ?? requestOptions.method ?? "POST";

      return apiClient<TData>(path, {
        ...requestOptions,
        method,
      });
    },
  });

export type { ApiError, ApiRequestOptions } from "./apiClient";

