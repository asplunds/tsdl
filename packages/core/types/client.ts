import { HTTPResponse } from "./common";
import { Branch, Leaf } from "./routing";

export type ClientPayload<TInput> = {
  path: string[];
  input: TInput;
};

export type ClientFetcher = <T>(
  url: (path: string) => string
) => Promise<HTTPResponse<T>> | HTTPResponse<T>;

export type InferClient<T extends Branch | Leaf> = T extends infer R
  ? R extends Branch
    ? { [Key in keyof R["$routes"]]: InferClient<R["$routes"][Key]> }
    : R extends Leaf
    ? {
        (
          ...args: R["$input"] extends undefined ? [undefined?] : [R["$input"]]
        ): Promise<Awaited<R["$return"]>>;
        query: (
          ...args: R["$input"] extends undefined ? [undefined?] : [R["$input"]]
        ) => Promise<Awaited<R["$return"]>>;
      }
    : never
  : never;
