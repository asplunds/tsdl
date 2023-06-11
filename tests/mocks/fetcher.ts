import { runnerEntrypoint } from "../../packages/server/lib/runner/runnerEntrypoint";
import { createHTTPResponse } from "../../packages/server/lib/runner/createHTTPResponse";
import { ClientFetcher } from "../../packages/core/types/client";
import { Branch } from "../../packages/core/types/routing";
import { TSDLError } from "../../packages/core";

export const createFetcher = (router: Branch) => {
  const fetcher: ClientFetcher = ({ payload }) => {
    const fetcher = async () => {
      try {
        const result = await runnerEntrypoint(router, {}, payload);

        return JSON.parse(JSON.stringify(createHTTPResponse(null, result)));
      } catch (e) {
        if (e instanceof TSDLError) {
          return createHTTPResponse(e.package(), null);
        }
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return fetcher() as any;
  };

  return fetcher;
};
