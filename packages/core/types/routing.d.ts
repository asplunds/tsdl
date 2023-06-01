export declare enum TsDLNode {
  Leaf = 0,
  Node = 1,
}
export type Branch = {
  $type: TsDLNode.Node;
  $routes: Record<string, Branch | Leaf>;
};
export type InvokableRouter<TArg, TBaseContext> = Branch & {
  $invoke?: (arg: TArg) => TBaseContext;
};
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
