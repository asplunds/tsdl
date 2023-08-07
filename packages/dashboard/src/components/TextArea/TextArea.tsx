import React from "react";
import classes from "./TextArea.module.scss";
import cx from "../../cx";

type TextAreaProps = React.ComponentProps<"textarea">;

function TextArea({ className, readOnly, ...rest }: TextAreaProps) {
  return (
    <textarea
      className={cx(className, classes.root, readOnly && classes.readOnly)}
      {...rest}
    />
  );
}

export default TextArea;
