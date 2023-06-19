import { types } from "@tsdl/core";

/**
 * @internal
 * Create a router
 */
export default function createRouter<TArg, TBaseContext>(
  $invoke?: (arg: TArg) => TBaseContext
) {
  const router: types.builder.Router<TArg, TBaseContext> = <
    T extends { [key in keyof T]: types.routing.TsDLTree }
  >(
    routes: T
  ) => {
    return {
      $routes: routes,
      $type: types.routing.TsDLNode.Node as const,
      $invoke,
    };
  };
  return {
    router,
  };
}
