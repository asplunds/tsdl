/** @jsxRuntime classic */
import React from "react";
import { useTheme } from "nextra-theme-docs";
import { useMemo } from "react";
import useMounted from "../../../hooks/useMounted";
import classes from "./Button.module.css";

type ButtonProps = React.ComponentProps<"button">;

function Button(props: ButtonProps) {
  const theme = useTheme();
  const isMounted = useMounted();
  const styles = useMemo(
    () =>
      isMounted
        ? {
            backgroundColor: `${
              theme.resolvedTheme === "dark" ? "#ffffff" : "#000"
            }`,
            color: `${theme.resolvedTheme === "dark" ? "#000" : "#fff"}`,
          }
        : {},
    [isMounted, theme.resolvedTheme]
  );
  return <button className={classes.root} style={styles} {...props} />;
}

export default Button;
