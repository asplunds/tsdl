import { expect, test } from "vitest";
import { createTree } from "../packages/tree";
import { router } from "./mocks/router";

test("Tree to be generated", () => {
  const tree = createTree(router);
  expect(tree).toBeDefined();

  const input = tree.nodes.find((v) => v.path[1] === "documented")?.inputDoc;
  const query = tree.nodes.find((v) => v.path[1] === "documented")?.queryDoc;
  const mw = tree.nodes.find((v) => v.path[1] === "documented")?.mwDoc;
  expect(input?.name).toBe("Name");
  expect(input?.description).toBe("Desc");
  expect(query?.name).toBe("Name");
  expect(query?.description).toBe("Desc");
  expect(mw).toStrictEqual([
    {
      name: "Name",
      description: "Desc",
    },
    {
      name: "Name2",
      description: "Desc2",
    },
    {
      name: "Name3",
      description: "Desc3",
    },
  ]);
});
