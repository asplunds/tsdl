import { CommonDoc } from "./routing";

export type Tree = {
  /** the complete path to the leaf */
  path: string[];
  /** child nodes, will be empty if leaf */
  nodes: Tree[];
  /** if true, this is a query (leaf node) */
  leaf: boolean;
  /** documentation of the input */
  inputDoc?: CommonDoc;
  /** documentation of the query */
  queryDoc?: CommonDoc;
  /** documentation of the middlewares in order */
  mwDoc: CommonDoc[];
};
