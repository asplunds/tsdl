import createInput from "./lib/createInput";
import createRouter from "./lib/createRouter";
import { types } from "@tsdl/core";
import createMiddlewareNoInput from "./lib/createMiddlewareNoInput";
import createQuery from "./lib/createQuery";

/**
 * Create a TSDL instance
 * @param contextCreator A callback that is executed for each request
 * @returns tsdl
 */
export function createTSDL<TArg, TBaseContext = TArg>(
  contextCreator: (arg: TArg) => TBaseContext
): types.builder.TSDLRoot<TArg, TBaseContext> {
  return {
    ...createRouter(contextCreator),
    ...createInput<TBaseContext>(),
    ...createMiddlewareNoInput<TBaseContext, undefined, undefined>(undefined),
    ...createQuery(undefined, [], { name: null, description: null }),
  } satisfies types.builder.TSDLRoot<TArg, TBaseContext>;
}

export type TSDL = types.routing.TSDL;
