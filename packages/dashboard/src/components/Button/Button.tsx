import classes from "./Button.module.scss";
import cx from "../../cx";

type ButtonProps = React.ComponentProps<"button">;

function Button({ className, ...rest }: ButtonProps) {
  return <button className={cx(className, classes.button)} {...rest} />;
}

export default Button;
