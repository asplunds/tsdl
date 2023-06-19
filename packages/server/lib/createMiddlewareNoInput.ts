import createDocumented from "./createDocumented";
import createInput from "./createInput";
import createQuery from "./createQuery";
import { types } from "@tsdl/core";

/** @internal */
export default function createMiddlewareNoInput<
  TContext,
  TInput,
  TInputValidator
>(
  $inputValidator: TInputValidator,
  $mw: types.routing.MiddlewareCollection[] = []
) {
  const createUser =
    (name: string | null, description: string | null) =>
    <TNewContext>(
      cb: (arg: TContext, input: TInput) => TNewContext | Promise<TNewContext>
    ) => {
      const mw = {
        cb: cb as types.routing.MiddlewareCollection["cb"],
        name,
        description,
      } satisfies types.routing.MiddlewareCollection;
      return createMiddlewareNoInput<
        Awaited<TNewContext>,
        TInput,
        TInputValidator
      >($inputValidator, [...$mw, mw]);
    };

  const use: types.builder.MiddlewareNoInput<
    TContext,
    TInput,
    TInputValidator
  > = Object.assign(
    createUser(null, null),
    createDocumented(({ name, description }) => createUser(name, description))
  );

  return {
    use,
    ...createInput<TContext>($mw),
    ...createQuery<TContext, TInput, TInputValidator>($inputValidator, $mw, {
      name: null,
      description: null,
    }),
  };
}
