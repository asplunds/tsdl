import React from "react";
import classes from "./Input.module.scss";
import cx from "../../cx";

type InputProps = React.ComponentProps<"input">;

function Input({className,readOnly, ...rest}: InputProps) {
  return <input className={cx(className, classes.root, readOnly && classes.readOnly)} {...rest} />;
}

export default Input;
