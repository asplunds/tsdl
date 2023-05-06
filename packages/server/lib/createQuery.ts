import { types } from "@tsdl/core";

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
      return {
        $arg,
        $input: {} as TInput,
        $query: query,
        $type: types.routing.TsDLNode.Leaf as const,
        $inputValidator,
        $mw,
        $return: {} as Awaited<TReturn>,
      };
    },
  };
}
