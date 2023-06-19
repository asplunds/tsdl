import createDocumented from "./createDocumented";
import createQuery from "./createQuery";
import { types } from "@tsdl/core";

/** @internal */
export default function createMiddleware<TContext, TInput, TInputValidator>(
  $inputValidator: TInputValidator,
  $mw: types.routing.MiddlewareCollection[],
  $inputDoc: types.routing.CommonDoc
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
      return createMiddleware<Awaited<TNewContext>, TInput, TInputValidator>(
        $inputValidator,
        [...$mw, mw],
        $inputDoc
      );
    };

  const use: types.builder.Middleware<TContext, TInput, TInputValidator> =
    Object.assign(
      createUser(null, null),
      createDocumented(({ name, description }) => createUser(name, description))
    );

  return {
    use,
    ...createQuery<TContext, TInput, TInputValidator>(
      $inputValidator,
      $mw,
      $inputDoc
    ),
  };
}
