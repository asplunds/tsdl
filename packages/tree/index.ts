import { types } from "@tsdl/core";

type Tree = {
  path: string[];
  nodes: Tree[];
  leaf: boolean;
};

export function createTree(router: types.routing.Branch): Tree {
  return generateTree(["root"], router);
}

function generateTree(path: string[], router: types.routing.TsDLTree): Tree {
  const leaf = router.$type === types.routing.TsDLNode.Leaf;

  return {
    path,
    leaf,
    nodes: leaf
      ? []
      : Object.entries(router.$routes).map(([node, route]) =>
          generateTree([...path, node], route)
        ),
  };
}

export function visualizeTree(tree: Tree): string {
  const sections: string[] = [];
  function generateTreeVisualization(tree: Tree, depth: number): void {
    const indent = " ".repeat(depth * 2) + (depth ? "∟" : "");
    sections.push(`${indent}${tree.path[tree.path.length - 1]}`);
    for (const node of tree.nodes) {
      generateTreeVisualization(node, depth + 1);
    }
  }
  generateTreeVisualization(tree, 0);

  return sections.join("\n");
}
