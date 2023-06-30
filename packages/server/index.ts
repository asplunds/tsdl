import createInput from "./lib/createInput";
import createRouter from "./lib/createRouter";
import { types } from "@tsdl/core";
import createMiddlewareNoInput from "./lib/createMiddlewareNoInput";
import createQuery from "./lib/createQuery";

/**
 * Create a TSDL instance
 * @returns tsdl
 */
export function createTSDL<
  TBaseContext = undefined
>(): types.builder.TSDLRoot<TBaseContext> {
  return {
    $bc: {} as TBaseContext,
    ...createRouter(),
    ...createInput<TBaseContext>(),
    ...createMiddlewareNoInput<TBaseContext, undefined, undefined>(undefined),
    ...createQuery(undefined, [], { name: null, description: null }),
  } satisfies types.builder.TSDLRoot<TBaseContext>;
}

export type TSDL = types.routing.TSDL;
