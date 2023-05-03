import { Leaf, TsDLNode, TsDLTree } from "@tsdl/types";

/** @internal */
export default function findLeaf(path: string[], node: TsDLTree): Leaf | null {
  if (node.$type === TsDLNode.Node) {
    const nextNode = node.$routes[path[0]];
    if (!nextNode) {
      console.log("no-next");
      return null;
    }
    return findLeaf(path.slice(1), nextNode);
  }
  return node;
}
