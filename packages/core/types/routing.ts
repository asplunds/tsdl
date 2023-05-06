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

export type TSDL = {
  query: unknown;
  input: unknown;
  use: unknown;
};
