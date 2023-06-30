export enum TSDLNode {
  Leaf,
  Node,
}

export type Branch<TBaseContext = unknown> = {
  $bc: TBaseContext;
  $type: TSDLNode.Node;
  $routes: Record<string, Branch<TBaseContext> | Leaf>;
};

export type MiddlewareCollection = CommonDoc & {
  cb: (arg: unknown, input: unknown) => unknown;
};

export type CommonDoc = {
  name: string | null;
  description: string | null;
};

// Why are most types here unknown?
// It's because this type is just a skeleton to be extended
// and also populated with the inferred generic types.
export type Leaf<
  TReturn = unknown,
  TInput = unknown,
  TInputValidator = unknown
> = {
  $arg: unknown;
  $type: TSDLNode.Leaf;
  $return: TReturn;
  $input: TInput;
  $inputValidator: TInputValidator;
  $query: unknown;
  $mw: MiddlewareCollection[];
  $cb: unknown[];
  $inputDoc: CommonDoc;
  $queryDoc: CommonDoc;
};

export type TSDLTree<TBaseContext> = Branch<TBaseContext> | Leaf;

export type TSDL = {
  query: unknown;
  input: unknown;
  use: unknown;
};
