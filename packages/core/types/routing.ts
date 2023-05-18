export enum TsDLNode {
  Leaf,
  Node,
}

export type Branch = {
  $type: TsDLNode.Node;
  $routes: Record<string, Branch | Leaf>;
};

export type InvokableRouter<TArg, TBaseContext> = Branch & {
  $invoke?: (arg: TArg) => TBaseContext;
};

// Why are most types here unknown?
// It's because this type is just a skeleton to be extended
// and also populated with the inferred generic types.
export type Leaf = {
  $type: TsDLNode.Leaf;
  $return: unknown;
  $input: unknown;
  $inputValidator: unknown;
  $query: unknown;
  $mw: unknown[];
  $cb: unknown[];
};

export type TsDLTree = Branch | Leaf;

export type TSDL = {
  query: unknown;
  input: unknown;
  use: unknown;
};
