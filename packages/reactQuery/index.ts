import {
  QueryClient,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { fetcherUrlCallback } from "@tsdl/client/src/lib/fetcherUrlCallback";
import { Branch, ClientFetcher, Leaf } from "@tsdl/types";

type ReactQueryOptions<TQueryFnData, TError, TReturn> = Omit<
  UseQueryOptions<TQueryFnData, TError, TReturn, string[]>,
  "queryKey" | "queryFn" | "initialData"
> & { initialData?: () => undefined };

export type InferReactQueryClient<T extends Branch | Leaf> = T extends infer R
  ? R extends Branch
    ? { [Key in keyof R["$routes"]]: InferReactQueryClient<R["$routes"][Key]> }
    : R extends Leaf
    ? {
        (input: R["$input"]): Promise<R["$return"]>;
        useQuery: R["$input"] extends undefined
          ? <TQueryFnData, TError>(
              options?: ReactQueryOptions<
                TQueryFnData,
                TError,
                Awaited<R["$return"]>
              >
            ) => UseQueryResult<R["$return"]>
          : <TQueryFnData, TError>(
              input: R["$input"],
              options?: ReactQueryOptions<
                TQueryFnData,
                TError,
                Awaited<R["$return"]>
              >
            ) => UseQueryResult<R["$return"]>;
        useMutation: (
          options?: Omit<
            UseMutationOptions<R["$return"], unknown, R["$input"]>,
            "mutationFn"
          >
        ) => UseMutationResult<R["$return"], unknown, R["$input"]>;
        invalidate: () => void;
      }
    : never
  : never;

export function createReactQueryClient<TRouter extends Branch>(
  fetcher: ClientFetcher,
  client: QueryClient
) {
  function emulator(path: string[]): object {
    const caller = async (input: unknown) => {
      const request = await fetcher(fetcherUrlCallback(path, input));

      if (request.code != null && request.code > 399) {
        throw new Error(request.message);
      }

      return request?.payload ?? null;
    };

    const handler = {
      get(_target: unknown, prop: string) {
        void _target;

        switch (prop) {
          case "useQuery": {
            return (
              input?: unknown,
              options?: ReactQueryOptions<unknown, unknown, unknown>
            ) => {
              return useQuery(
                path,
                async () =>
                  await caller(
                    input === undefined && options === undefined
                      ? undefined
                      : input
                  ),
                input !== undefined && options === undefined
                  ? (input as ReactQueryOptions<unknown, unknown, unknown>)
                  : options
              );
            };
          }
          case "useMutation": {
            return (
              options?: Omit<UseMutationOptions<unknown>, "mutationFn">
            ) => {
              return useMutation(caller, options);
            };
          }
          case "invalidate": {
            return () => {
              client.invalidateQueries({
                queryKey: path,
              });
            };
          }
        }

        return emulator([...path, prop]);
      },
    };
    return new Proxy(caller, handler);
  }

  return emulator([]) as InferReactQueryClient<TRouter>;
}
