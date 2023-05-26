import { types } from "@tsdl/core";
import createMiddleware from "./createMiddleware";
import createQuery from "./createQuery";

/** @internal */
export default function createInput<TContext>($mw: unknown[] = []) {
  return {
    input<TInputRaw>(inputValidator: types.validation.Validator<TInputRaw>) {
      type Input = Awaited<TInputRaw>;
      return {
        ...createQuery<TContext, Input, types.validation.Validator<TInputRaw>>(
          inputValidator,
          $mw
        ),
        ...createMiddleware<
          TContext,
          Input,
          types.validation.Validator<TInputRaw>
        >(inputValidator, $mw),
      };
    },
  };
}
