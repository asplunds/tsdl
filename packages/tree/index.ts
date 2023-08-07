import { types } from "@tsdl/core";
import chalk from "chalk";

export function createTree(router: types.routing.Branch): types.tree.Tree {
  return generateTree(["TSDL"], router);
}

/** @internal */
function generateTree(
  path: string[],
  router: types.routing.TSDLTree<unknown>
): types.tree.Tree {
  const leaf = router.$type === types.routing.TSDLNode.Leaf;

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

export function visualizeTree(tree: types.tree.Tree): string {
  const sections: string[] = [];
  function generateTreeVisualization(
    tree: types.tree.Tree,
    depth: number
  ): void {
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
