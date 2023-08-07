import { CSSProperties } from "react";
import classes from "./Tree.module.scss";
import { types } from "@tsdl/core";
import { Text } from "react-echo";
import { getColor } from "../../utils/getColor";
import { Link } from "react-router-dom";

type TreeProps = { tree: types.tree.Tree; depth: number };

function Tree({ tree, depth }: TreeProps) {
  const color = getColor(depth);
  return (
    <div
      className={classes.tree}
      style={
        {
          "--color": color,
          "--depth": depth,
        } as CSSProperties
      }
    >
      {tree.nodes.map((v) => {
        const title = <Text className={classes.title}>{v.path.at(-1)}</Text>;
        return (
          <div key={v.path.join("/")}>
            {v.leaf ? (
              <Link to={`/query/${v.path.join("-")}`}>{title}</Link>
            ) : (
              title
            )}
            <Tree depth={depth + 1} tree={v} />
          </div>
        );
      })}
    </div>
  );
}

export default Tree;
