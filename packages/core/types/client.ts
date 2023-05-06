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
        (input: R["$input"]): Promise<R["$return"]>;
        query: (input: R["$input"]) => Promise<R["$return"]>;
      }
    : never
  : never;
