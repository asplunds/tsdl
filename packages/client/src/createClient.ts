import type { types } from "@tsdl/core";
import { fetcherUrlCallback } from "./lib/fetcherUrlCallback";

/** @internal */
export function createClient<TRouter extends types.routing.Branch>(
  fetcher: types.client.ClientFetcher
) {
  function emulator(path: string[]): object {
    const caller = (input: unknown) => fetcher(fetcherUrlCallback(path, input));

    const handler = {
      get(_target: unknown, prop: string) {
        void _target;

        if (prop === "query") {
          return caller;
        }

        return emulator([...path, prop]);
      },
    };
    return new Proxy(caller, handler);
  }

  return emulator([]) as types.client.InferClient<TRouter>;
}
