import createInput from "./lib/createInput";
import createRouter from "./lib/createRouter";
import createMiddleware from "./lib/createMiddleware";

/**
 * Create a TSDL instance
 * @param contextCreator A callback that is executed for each request
 * @returns tsdl
 */
export function createTsdl<TBaseContext, TArg>(
  contextCreator: (arg: TArg) => TBaseContext
) {
  return {
    ...createRouter(contextCreator),
    ...createInput<TBaseContext>(),
    ...createMiddleware<TBaseContext, undefined, undefined>(undefined),
  };
}
