import { fetcherUrlCallback } from "./lib/fetcherUrlCallback";
import { TSDLError, types } from "@tsdl/core";

export default async function TSDLCaller(
  fetcher: types.client.ClientFetcher,
  input: unknown,
  path: string[],
  options?: unknown
) {
  const request = await fetcher(fetcherUrlCallback(path, input, options));

  if (request.error != null) {
    throw TSDLError.fromPackage(request.error);
  }

  return request?.payload ?? null;
}
