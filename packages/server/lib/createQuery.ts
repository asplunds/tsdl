import { types } from "@tsdl/core";
import createOutput from "./createOutput";
import createDocumented from "./createDocumented";

/** @internal */
export default function createQuery<TContext, TInput, TInputValidator>(
  $inputValidator: TInputValidator,
  $mw: types.routing.MiddlewareCollection[],
  $inputDoc: types.routing.CommonDoc
) {
  const $arg = {
    ctx: {} as TContext,
    input: {} as TInput,
  };

  const createQuery =
    (name: string | null, description: string | null) =>
    <TReturn>(query: (arg: { ctx: TContext; input: TInput }) => TReturn) => {
      const queryResult: types.routing.Leaf<
        Awaited<TReturn>,
        TInput,
        TInputValidator
      > = {
        $arg,
        $input: {} as TInput,
        $query: query,
        $type: types.routing.TSDLNode.Leaf as const,
        $inputValidator,
        $inputDoc,
        $queryDoc: { name, description },
        $mw,
        $cb: [],
        $return: {} as types.common.ParsedJSON<Awaited<TReturn>>,
      };
      return {
        ...queryResult,
        ...createOutput<
          TReturn,
          TInputValidator,
          TContext,
          TInput,
          Awaited<TReturn>,
          typeof queryResult
        >(queryResult),
      };
    };

  const query: types.builder.Query<TContext, TInput, TInputValidator> =
    Object.assign(
      createQuery(null, null),
      createDocumented(({ name, description }) =>
        createQuery(name, description)
      )
    );

  return {
    query,
  };
}
