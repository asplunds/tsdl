import React from "react";
import classes from "./Pre.module.scss";
import cx from "../../cx";

type PreProps = React.ComponentProps<"pre">;

function Pre({ className, ...rest }: PreProps) {
  return <pre className={cx(className, classes.root)} {...rest} />;
}

export default Pre;
