import createQuery from "./createQuery";

/** @internal */
export default function createMiddleware<TContext, TInput, TInputValidator>(
  $inputValidator: TInputValidator,
  $mw: unknown[] = []
) {
  function use<TNewContext>(
    mw: (arg: TContext, input: TInput) => TNewContext | Promise<TNewContext>
  ) {
    return {
      ...createMiddleware<Awaited<TNewContext>, TInput, TInputValidator>(
        $inputValidator,
        [...$mw, mw]
      ),
    };
  }

  return {
    use,
    ...createQuery<TContext, TInput, TInputValidator>($inputValidator, $mw),
  };
}
