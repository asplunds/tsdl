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
import { emptyReactQuery } from "./lib/emptyReactQuery";

type ReactQueryOptions<TQueryFnData, TError, TReturn> = Omit<
  UseQueryOptions<TQueryFnData, TError, TReturn, string[]>,
  "queryKey" | "queryFn" | "initialData"
> & {
  initialData?: (() => TReturn | null | undefined) | TReturn | null | undefined;
};

export type InferReactQueryClient<
  T extends types.routing.Branch<unknown> | types.routing.Leaf
> = T extends infer R
  ? R extends types.routing.Branch<unknown>
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
            ) => UseQueryResult<Awaited<R["$return"]>>
          : <TQueryFnData, TError = TSDLError>(
              input: R["$input"],
              options?: ReactQueryOptions<
                TQueryFnData,
                TError,
                Awaited<R["$return"]>
              >
            ) => UseQueryResult<Awaited<R["$return"]>>;
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
        abort(): void;
      }
    : never
  : never;

export function createReactQueryClient<
  TRouter extends types.routing.Branch<unknown>,
  TQueryClient extends {
    invalidateQueries: QueryClient["invalidateQueries"];
  } = QueryClient
>(fetcher: types.client.ClientFetcher, client: TQueryClient) {
  const controller = new AbortController();
  function emulator(path: string[]): object {
    const memoCaller = (input: unknown, options?: unknown) =>
      TSDLCaller(fetcher, input, path, controller.signal, options);

    const handler = {
      get(_target: unknown, prop: string) {
        void _target;

        switch (prop) {
          case "useQuery": {
            return (
              input?: unknown,
              options?: ReactQueryOptions<unknown, unknown, unknown>
            ) => {
              const arg =
                input !== undefined && options === undefined
                  ? (input as ReactQueryOptions<unknown, unknown, unknown>)
                  : options;
              try {
                return useQuery(
                  path,
                  async () => await memoCaller(input, options),
                  arg
                );
              } catch {
                // catches Next.js/ssr hydration issues... annoying
                return emptyReactQuery(arg?.initialData);
              }
            };
          }
          case "abort": {
            return () => void controller.abort();
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
              // prevent react query version issues...
              return client?.invalidateQueries(
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
