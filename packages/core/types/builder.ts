import { Leaf, TSDLNode, TSDLTree } from "./routing";
import { Validator } from "./validation";

export type Output<
  TReturn,
  TInputValidator,
  TContext,
  TInput,
  TOutput,
  TQueryResult extends Leaf<TReturn, TInput, TInputValidator>
> = (
  cb: (arg: { ctx: TContext; input: TInput; output: TOutput }) => unknown
) => {
  output: Output<
    TReturn,
    TInputValidator,
    TContext,
    TInput,
    TOutput,
    TQueryResult
  >;
} & Leaf<TReturn, TInput, TInputValidator>;

type QueryCB<TContext, TInput, TInputValidator> = {
  <TReturn>(query: (arg: { ctx: TContext; input: TInput }) => TReturn): {
    output: Output<
      TReturn,
      TInputValidator,
      TContext,
      TInput,
      TReturn,
      Leaf<TReturn, TInput, TInputValidator>
    >;
  } & Leaf<TReturn, TInput, TInputValidator>;
};
export type Query<TContext, TInput, TInputValidator> = QueryCB<
  TContext,
  TInput,
  TInputValidator
> & {
  doc(
    name: string,
    description?: string
  ): QueryCB<TContext, TInput, TInputValidator>;
  doc(name: {
    name: string;
    description?: string;
  }): QueryCB<TContext, TInput, TInputValidator>;
  doc(...args: unknown[]): QueryCB<TContext, TInput, TInputValidator>;
};

type InputCb<TContext> = {
  <TInputRaw>(inputValidator: Validator<TInputRaw>): {
    query: Query<TContext, Awaited<TInputRaw>, Validator<TInputRaw>>;
    use: Middleware<TContext, Awaited<TInputRaw>, Validator<TInputRaw>>;
  };
};
export type Input<TContext> = InputCb<TContext> & {
  doc(name: string, description?: string): InputCb<TContext>;
  doc(name: { name: string; description?: string }): InputCb<TContext>;
  doc(...args: unknown[]): InputCb<TContext>;
};

export type Router<TBaseContext> = <T extends { [key in keyof T]: TSDLTree<TBaseContext> }>(
  routes: T
) => {
  $bc: TBaseContext;
  $routes: T;
  $type: TSDLNode.Node;
};

type MiddlewareCbNoInput<TContext, TInput, TInputValidator> = {
  <TNewContext>(
    mw: (arg: TContext, input: TInput) => TNewContext | Promise<TNewContext>
  ): {
    query: Query<TNewContext, TInput, TInputValidator>;
    input: Input<TNewContext>;
    use: MiddlewareCbNoInput<TNewContext, TInput, TInputValidator>;
  };
};
type MiddlewareCb<TContext, TInput, TInputValidator> = {
  <TNewContext>(
    mw: (arg: TContext, input: TInput) => TNewContext | Promise<TNewContext>
  ): {
    query: Query<TNewContext, TInput, TInputValidator>;
    use: Middleware<TNewContext, TInput, TInputValidator>;
  };
};
export type MiddlewareNoInput<TContext, TInput, TInputValidator> =
  MiddlewareCbNoInput<TContext, TInput, TInputValidator> & {
    doc(
      name: string,
      description?: string
    ): MiddlewareCbNoInput<TContext, TInput, TInputValidator>;
    doc(name: {
      name: string;
      description?: string;
    }): MiddlewareCbNoInput<TContext, TInput, TInputValidator>;
    doc(
      ...args: unknown[]
    ): MiddlewareCbNoInput<TContext, TInput, TInputValidator>;
  };

export type Middleware<TContext, TInput, TInputValidator> = MiddlewareCb<
  TContext,
  TInput,
  TInputValidator
> & {
  doc(
    name: string,
    description?: string
  ): MiddlewareCb<TContext, TInput, TInputValidator>;
  doc(name: {
    name: string;
    description?: string;
  }): MiddlewareCb<TContext, TInput, TInputValidator>;
  doc(...args: unknown[]): MiddlewareCb<TContext, TInput, TInputValidator>;
};

export type TSDLRoot<TBaseContext> = {
  $bc: TBaseContext,
  router: Router<TBaseContext>;
  input: Input<TBaseContext>;
  query: Query<TBaseContext, undefined, undefined>;
  use: MiddlewareNoInput<TBaseContext, undefined, undefined>;
};
