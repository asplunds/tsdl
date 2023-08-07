import React from "react";
import classes from "./Split.module.css";

type SplitProps = React.ComponentProps<"div">;

function Split(props: SplitProps) {
  return <div className={classes.root} {...props} />;
}

export default Split;
