import { createPayload } from "./createPayload";

export function fetcherUrlCallback<TInput>(
  path: string[],
  input: TInput,
  options?: unknown
) {
  return {
    url: (urlPath: string) => {
      const payload = createPayload(path, input ?? null);
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
      searchParams.set("payload", JSON.stringify(payload));
      const resolvedPath = (location.endsWith("/") ? "" : "/") + path.join("/");
      return `${location}${resolvedPath}?${searchParams}`;
    },
    options,
  };
}
