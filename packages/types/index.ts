export enum TsDLNode {
  Leaf,
  Node,
}

export type Branch = {
  $type: TsDLNode.Node;
  $routes: Record<string, Branch | Leaf>;
};
export type Leaf = {
  $type: TsDLNode.Leaf;
  $return: unknown;
  $input: unknown;
  $inputValidator: unknown;
  $query: unknown;
  $mw: unknown[];
};

export type TsDLTree = Branch | Leaf;

export type ClientPayload<TInput> = {
  path: string[];
  input: TInput;
};

export type ResponseOptions<T> = {
  code?: number;
  tsDLInternalError?: boolean;
  message?: string;
  payload?: T;
};

export type TsDLResponse<T> = ResponseOptions<T> & {
  ok: boolean;
};

type ZodInput<T> = { parse: (arg: unknown) => T };
type YupInput<T> = { validate: (arg: unknown) => T; __context: unknown };

export type Validator<T> = ZodInput<T> | YupInput<T>;

export type ClientFetcher = <T>(
  url: (path: string) => string
) => Promise<TsDLResponse<T>> | TsDLResponse<T>;
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
