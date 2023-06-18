import { types } from "@tsdl/core";
import chalk from "chalk";

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

const colors = [
  chalk.yellow,
  chalk.hex("#f7cd04"),
  chalk.green,
  chalk.cyan,
  chalk.blue,
  chalk.hex("#b21ae8"),
  chalk.hex("#fc85fb"),
  chalk.red,
];

export function visualizeTree(tree: Tree): string {
  const sections: string[] = [];
  function generateTreeVisualization(tree: Tree, depth: number): void {
    const indent = " ".repeat(depth * 2) + (depth ? "∟" : "");
    const using = tree.mwDoc.map((v) => v.name).filter((v) => v != null);
    const node = tree.path[tree.path.length - 1];
    const coloredNode =
      (tree.leaf ? chalk.black(" λ ") : "") +
      colors[depth % colors.length](node);
    sections.push(
      `${indent}${coloredNode}${
        tree.inputDoc?.name ? chalk.gray(` input "${tree.inputDoc.name}"`) : ""
      }${
        using.length
          ? chalk.gray(` using ${using.map((v) => `"${v}"`).join(", ")}`)
          : ""
      }`
    );
    for (const node of tree.nodes) {
      generateTreeVisualization(node, depth + 1);
    }
  }
  generateTreeVisualization(tree, 0);

  return sections.join("\n");
}
