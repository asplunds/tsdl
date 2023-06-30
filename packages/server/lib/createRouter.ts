import { types } from "@tsdl/core";

/**
 * @internal
 * Create a router
 */
export default function createRouter<TBaseContext>() {
  const router: types.builder.Router<TBaseContext> = <
    T extends { [key in keyof T]: types.routing.TSDLTree<TBaseContext> }
  >(
    routes: T
  ) => {
    return {
      $bc: {} as TBaseContext,
      $routes: routes,
      $type: types.routing.TSDLNode.Node as const,
    } satisfies types.routing.Branch<TBaseContext>;
  };
  return {
    router,
  };
}
