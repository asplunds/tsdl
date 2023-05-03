import { TsDLNode, TsDLTree } from "@tsdl/types";

/**
 * @internal
 * Create a router
 */
export default function createRouter<TArg, TBaseContext>(
  $invoke?: (arg: TArg) => TBaseContext
) {
  /**
   * A router is used house a collection of routes.
   * The middleware it "uses" is applied for all child routes.
   */
  return {
    router<T extends { [key in keyof T]: TsDLTree }>(routes: T) {
      return {
        $routes: routes,
        $type: TsDLNode.Node as const,
        $invoke,
      };
    },
  };
}
