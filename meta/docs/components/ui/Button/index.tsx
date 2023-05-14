/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";
import { useTheme } from "nextra-theme-docs";
import { useMemo } from "react";
import useMounted from "../../../hooks/useMounted";
void jsx;

const Root = styled.button`
  position: relative;
  padding: 8px 12px;
  border-radius: 0.4em;
  font-size: inherit;
  font-family: inherit;
  border: 1px solid rgba(38, 38, 38, 1);
  margin: 0;
  appearance: none;
  transition: box-shadow .2s ease-out;
  &:hover {
    box-shadow: 0 0 15px #7b7b7b;
  }
  &:active {
    transform: scale(0.98);
  }
`;

type ButtonProps = React.ComponentProps<"button">;

function Button(props: ButtonProps) {
  const theme = useTheme();
  const isMounted = useMounted();
  const styles = useMemo(
    () =>
      isMounted
        ? css`
            background-color: ${theme.resolvedTheme === "dark"
              ? "#ffffff"
              : "#000"};
            color: ${theme.resolvedTheme === "dark" ? "#000" : "#fff"};
          `
        : "",
    [isMounted, theme.resolvedTheme]
  );
  return <Root css={styles} {...props} />;
}

export default Button;
