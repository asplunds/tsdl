import {
  InvalidateOptions,
  InvalidateQueryFilters,
  QueryClient,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import TSDLCaller from "@tsdl/client/src/TSDLCaller";
import { TSDLError, types } from "@tsdl/core";

type ReactQueryOptions<TQueryFnData, TError, TReturn> = Omit<
  UseQueryOptions<TQueryFnData, TError, TReturn, string[]>,
  "queryKey" | "queryFn" | "initialData"
> & {
  initialData?: (() => TReturn | null | undefined) | TReturn | null | undefined;
};

export type InferReactQueryClient<
  T extends types.routing.Branch | types.routing.Leaf
> = T extends infer R
  ? R extends types.routing.Branch
    ? {
        [Key in keyof R["$routes"]]: InferReactQueryClient<R["$routes"][Key]>;
      } & {
        invalidate: () => void;
      }
    : R extends types.routing.Leaf
    ? {
        (
          ...args: R["$input"] extends undefined
            ? [undefined?, unknown?]
            : [R["$input"], unknown?]
        ): Promise<R["$return"]>;
        useQuery: R["$input"] extends undefined
          ? <TQueryFnData, TError = TSDLError>(
              options?: ReactQueryOptions<
                TQueryFnData,
                TError,
                Awaited<R["$return"]>
              >
            ) => UseQueryResult<R["$return"]>
          : <TQueryFnData, TError = TSDLError>(
              input: R["$input"],
              options?: ReactQueryOptions<
                TQueryFnData,
                TError,
                Awaited<R["$return"]>
              >
            ) => UseQueryResult<R["$return"]>;
        useMutation: <TError = TSDLError>(
          options?: Omit<
            UseMutationOptions<R["$return"], TError, R["$input"]>,
            "mutationFn"
          >
        ) => UseMutationResult<R["$return"], TError, R["$input"]>;
        invalidate: (
          filters?: Omit<
            InvalidateQueryFilters<unknown> | undefined,
            "queryKey"
          >,
          options?: InvalidateOptions | undefined
        ) => Promise<void>;
        infer: Awaited<R["$return"]>;
      }
    : never
  : never;

export function createReactQueryClient<TRouter extends types.routing.Branch>(
  fetcher: types.client.ClientFetcher,
  client: QueryClient
) {
  function emulator(path: string[]): object {
    const memoCaller = (input: unknown, options?: unknown) =>
      TSDLCaller(fetcher, input, path, options);

    const handler = {
      get(_target: unknown, prop: string) {
        void _target;

        switch (prop) {
          case "useQuery": {
            return (
              input?: unknown,
              options?: ReactQueryOptions<unknown, unknown, unknown>
            ) => {
              try {
                return useQuery(
                  path,
                  async () =>
                    await memoCaller(
                      input === undefined && options === undefined
                        ? undefined
                        : input
                    ),
                  input !== undefined && options === undefined
                    ? (input as ReactQueryOptions<unknown, unknown, unknown>)
                    : options
                );
              } catch {
                // catches Next.js/ssr hydration issues... annoyng
                return {};
              }
            };
          }
          case "useMutation": {
            return (
              options?: Omit<UseMutationOptions<unknown>, "mutationFn">
            ) => {
              try {
                return useMutation(memoCaller, options);
              } catch {
                return {};
              }
            };
          }
          case "invalidate": {
            return (
              filters?: Omit<
                InvalidateQueryFilters<unknown> | undefined,
                "queryKey"
              >,
              options?: InvalidateOptions | undefined
            ) => {
              return client.invalidateQueries(
                {
                  ...filters,
                  queryKey: path,
                },
                options
              );
            };
          }
        }

        return emulator([...path, prop]);
      },
    };
    return new Proxy(memoCaller, handler);
  }

  return emulator([]) as InferReactQueryClient<TRouter>;
}
