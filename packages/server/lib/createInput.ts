import { Validator } from "@tsdl/types";
import createMiddleware from "./createMiddleware";
import createQuery from "./createQuery";

/** @internal */
export default function createInput<TContext>() {
  return {
    input<TInputRaw>(inputValidator: Validator<TInputRaw>) {
      type Input = Awaited<TInputRaw>;
      return {
        ...createQuery<TContext, Input, Validator<TInputRaw>>(
          inputValidator,
          []
        ),
        ...createMiddleware<TContext, Input, Validator<TInputRaw>>(
          inputValidator
        ),
      };
    },
  };
}
