import { types } from "@tsdl/core";

/** @internal */
export default function createOutput<
  TReturn,
  TInputValidator,
  TContext,
  TInput,
  TOutput,
  TQueryResult extends types.routing.Leaf<TReturn, TInput, TInputValidator>
>($queryResult: TQueryResult, $cb: unknown[] = []) {
  const output: types.builder.Output<
    TReturn,
    TInputValidator,
    TContext,
    TInput,
    TOutput,
    TQueryResult
  > = <TResult>(
    cb: (arg: {
      ctx: TContext;
      input: TInput;
      output: TOutput;
    }) => TResult | Promise<TResult>
  ) => {
    const mergedCb = [...$cb, cb];
    return {
      ...$queryResult,
      ...createOutput<
        TReturn,
        TInputValidator,
        TContext,
        TInput,
        TOutput,
        TQueryResult
      >($queryResult, mergedCb),
      $cb: mergedCb,
    };
  };

  return {
    output,
  };
}
