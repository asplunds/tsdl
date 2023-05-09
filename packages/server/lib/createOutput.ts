/** @internal */
export default function createOutput<
  TContext,
  TInput,
  TOutput,
  TQueryResult extends object
>($queryResult: TQueryResult, $cb: unknown[] = []) {
  function output<TResult>(
    cb: (arg: {
      ctx: TContext;
      input: TInput;
      output: TOutput;
    }) => TResult | Promise<TResult>
  ) {
    const mergedCb = [...$cb, cb];
    return {
      ...$queryResult,
      ...createOutput<TContext, TInput, TOutput, TQueryResult>(
        $queryResult,
        mergedCb
      ),
      $cb: mergedCb,
    };
  }

  return {
    output,
  };
}
