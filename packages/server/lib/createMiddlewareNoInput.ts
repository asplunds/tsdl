import createInput from "./createInput";
import createQuery from "./createQuery";

/** @internal */
export default function createMiddlewareNoInput<
  TContext,
  TInput,
  TInputValidator
>($inputValidator: TInputValidator, $mw: unknown[] = []) {
  function use<TNewContext>(
    mw: (arg: TContext, input: TInput) => TNewContext | Promise<TNewContext>
  ) {
    return {
      ...createMiddlewareNoInput<Awaited<TNewContext>, TInput, TInputValidator>(
        $inputValidator,
        [...$mw, mw]
      ),
    };
  }

  return {
    use,
    ...createInput<TContext>($mw),
    ...createQuery<TContext, TInput, TInputValidator>($inputValidator, $mw),
  };
}
