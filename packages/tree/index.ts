import { types } from "@tsdl/core";
import chalk from "chalk";

type Tree = {
  /** the complete path to the leaf */
  path: string[];
  /** child nodes, will be empty if leaf */
  nodes: Tree[];
  /** if true, this is a query (leaf node) */
  leaf: boolean;
  /** documentation of the input */
  inputDoc?: types.routing.CommonDoc;
  /** documentation of the query */
  queryDoc?: types.routing.CommonDoc;
  /** documentation of the middlewares in order */
  mwDoc: types.routing.CommonDoc[];
};

export function createTree(router: types.routing.Branch): Tree {
  return generateTree(["TSDL"], router);
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

const colors = [
  chalk.yellow,
  chalk.hex("#f7cd04"),
  chalk.green,
  chalk.cyan,
  chalk.hex("#b21ae8"),
  chalk.hex("#fc85fb"),
  chalk.red,
];

export function visualizeTree(tree: Tree): string {
  const sections: string[] = [];
  function generateTreeVisualization(tree: Tree, depth: number): void {
    const indent = " ".repeat(depth * 2) + (depth ? "∟" : "");
    const node = tree.path[tree.path.length - 1];

    const parts = [
      `${indent}${
        (tree.leaf ? chalk.black(" λ ") : "") +
        colors[depth % colors.length](node)
      }${tree.queryDoc?.name ? chalk.blue(` "${tree.queryDoc?.name}"`) : ""}`,
      tree.inputDoc?.name ? chalk.black(`input "${tree.inputDoc.name}"`) : null,
      tree.mwDoc.length
        ? chalk.black(
            `using ${tree.mwDoc
              .map((v) => v.name)
              .filter((v) => v != null)
              .map((v) => `"${v}"`)
              .join(", ")}`
          )
        : null,
    ].filter((v) => v != null);
    sections.push(parts.join(chalk.black(" • ")));
    for (const node of tree.nodes) {
      generateTreeVisualization(node, depth + 1);
    }
  }
  generateTreeVisualization(tree, 0);

  return sections.join("\n");
}
