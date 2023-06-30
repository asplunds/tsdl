import type { types } from "@tsdl/core";
import TSDLCaller from "./TSDLCaller";

export function createClient<TRouter extends types.routing.Branch<unknown>>(
  fetcher: types.client.ClientFetcher
) {
  function emulator(path: string[]): object {
    const controller = new AbortController();

    const memoCaller = (input: unknown, options?: unknown) =>
      TSDLCaller(fetcher, input, path, controller.signal, options);

    const handler = {
      get(_target: unknown, prop: string) {
        void _target;

        switch (prop) {
          case "query":
            return memoCaller;
          case "abort":
            return () => void controller.abort();
        }

        return emulator([...path, prop]);
      },
    };
    return new Proxy(memoCaller, handler);
  }

  return emulator([]) as types.client.InferClient<TRouter>;
}
