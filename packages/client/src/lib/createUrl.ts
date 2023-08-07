export function createUrl(path: string[], payload: string) {
  return (urlPath: string) => {
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
  };
}
