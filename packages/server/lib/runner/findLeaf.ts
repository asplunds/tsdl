import { types } from "@tsdl/core";

/** @internal */
export default function findLeaf(
  path: string[],
  node: types.routing.TsDLTree
): types.routing.Leaf | null {
  if (node.$type === types.routing.TsDLNode.Node) {
    const nextNode = node.$routes[path[0]];
    if (!nextNode) {
      console.log("no-next");
      return null;
    }
    return findLeaf(path.slice(1), nextNode);
  }
  return node;
}
