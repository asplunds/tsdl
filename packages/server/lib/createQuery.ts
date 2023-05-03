import { TsDLNode } from "../../types";

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
    // use typeof to infer a better intellisense type
    query<TReturn>(query: (arg: { ctx: TContext; input: TInput }) => TReturn) {
      return {
        $arg,
        $input: {} as TInput,
        $query: query,
        $type: TsDLNode.Leaf as const,
        $inputValidator,
        $mw,
        $return: {} as Awaited<TReturn>,
      };
    },
  };
}
