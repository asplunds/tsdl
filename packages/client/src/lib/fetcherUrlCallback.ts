import { createPayload } from "./createPayload";

export function fetcherUrlCallback<TInput>(
  path: string[],
  input: TInput,
  options?: unknown
) {
  const payload = JSON.stringify(createPayload(path, input ?? null));
  return {
    payload,
    url: (urlPath: string) => {
      const [location, queryString] = urlPath.split("?") as [
        string,
        string | undefined
      ];
      const searchParams = (() => {
        try {
          return new URLSearchParams(queryString);
        } catch {
          return new URLSearchParams();
        }
      })();
      searchParams.set("payload", payload);
      const resolvedPath = (location.endsWith("/") ? "" : "/") + path.join("/");
      return `${location}${resolvedPath}?${searchParams}`;
    },
    options,
  };
}
