import type { types } from "@tsdl/core";
import TSDLCaller from "./TSDLCaller";

export function createClient<TRouter extends types.routing.Branch>(
  fetcher: types.client.ClientFetcher
) {
  function emulator(path: string[]): object {
    const memoCaller = (input: unknown) => TSDLCaller(fetcher, input, path);

    const handler = {
      get(_target: unknown, prop: string) {
        void _target;

        if (prop === "query") {
          return memoCaller;
        }

        return emulator([...path, prop]);
      },
    };
    return new Proxy(memoCaller, handler);
  }

  return emulator([]) as types.client.InferClient<TRouter>;
}
