import { types } from "@tsdl/core";
import createMiddleware from "./createMiddleware";
import createQuery from "./createQuery";
import createDocumented from "./createDocumented";

/** @internal */
export default function createInput<TContext>(
  $mw: types.routing.MiddlewareCollection[] = []
) {
  const createInput =
    (name: string | null, description: string | null) =>
    <TInputRaw>(inputValidator: types.validation.Validator<TInputRaw>) => {
      type Input = Awaited<TInputRaw>;
      return {
        ...createQuery<TContext, Input, types.validation.Validator<TInputRaw>>(
          inputValidator,
          $mw,
          { name, description }
        ),
        ...createMiddleware<
          TContext,
          Input,
          types.validation.Validator<TInputRaw>
        >(inputValidator, $mw, { name, description }),
      };
    };

  const input: types.builder.Input<TContext> = Object.assign(
    createInput(null, null),
    createDocumented(({ name, description }) => createInput(name, description))
  );

  return {
    input,
  };
}
