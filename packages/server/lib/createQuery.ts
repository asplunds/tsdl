import { types } from "@tsdl/core";
import createOutput from "./createOutput";

/** @internal */
export default function createQuery<TContext, TInput, TInputValidator>(
  $inputValidator: TInputValidator,
  $mw: unknown[]
) {
  const $arg = {
    ctx: {} as TContext,
    input: {} as TInput,
  };
  return {
    query<TReturn>(query: (arg: { ctx: TContext; input: TInput }) => TReturn) {
      const queryResult = {
        $arg,
        $input: {} as TInput,
        $query: query,
        $type: types.routing.TsDLNode.Leaf as const,
        $inputValidator,
        $mw,
        $cb: [],
        $return: {} as Awaited<TReturn>,
      };
      return {
        ...queryResult,
        ...createOutput<TContext, TInput, Awaited<TReturn>, typeof queryResult>(
          queryResult
        ),
      };
    },
  };
}
