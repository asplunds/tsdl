import { types } from "@tsdl/core";

type Tree = {
  path: string[];
  nodes: Tree[];
  leaf: boolean;
  inputDoc?: types.routing.CommonDoc;
  queryDoc?: types.routing.CommonDoc;
  mwDoc: types.routing.CommonDoc[];
};

export function createTree(router: types.routing.Branch): Tree {
  return generateTree(["root"], router);
}

/** @internal */
function generateTree(path: string[], router: types.routing.TsDLTree): Tree {
  const leaf = router.$type === types.routing.TsDLNode.Leaf;

  return {
    mwDoc: leaf
      ? router.$mw.map(({ name, description }) => ({ name, description }))
      : [],
    path,
    leaf,
    inputDoc: leaf ? router.$inputDoc : undefined,
    queryDoc: leaf ? router.$queryDoc : undefined,
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
    const using = tree.mwDoc.map((v) => v.name).filter((v) => v != null);
    sections.push(
      `${indent}${tree.path[tree.path.length - 1]}${
        tree.inputDoc?.name ? ` "${tree.inputDoc.name}"` : ""
      }${using.length ? ` using ${using.map((v) => `"${v}"`).join(", ")}` : ""}`
    );
    for (const node of tree.nodes) {
      generateTreeVisualization(node, depth + 1);
    }
  }
  generateTreeVisualization(tree, 0);

  return sections.join("\n");
}
