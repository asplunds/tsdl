import type { Branch, ClientFetcher, InferClient } from "@tsdl/types";
import { fetcherUrlCallback } from "./lib/fetcherUrlCallback";

/** @internal */
export function createClient<TRouter extends Branch>(fetcher: ClientFetcher) {
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

  return emulator([]) as InferClient<TRouter>;
}
