import { createPayload } from "./createPayload";
import { createUrl } from "./createUrl";

export function fetcherUrlCallback<TInput>(
  path: string[],
  input: TInput,
  signal: AbortSignal,
  options?: unknown
) {
  const payload = JSON.stringify(createPayload(path, input ?? null));
  return {
    payload,
    signal,
    url: createUrl(path, payload),
    options,
  };
}
