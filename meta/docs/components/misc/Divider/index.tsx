/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";
import { useConfig } from "nextra-theme-docs";
void jsx;

const Root = styled.div`
  position: relative;
  width: 1px;
`;

type DividerProps = React.ComponentProps<"div">;

function Divider(props: DividerProps) {
  const config = useConfig();
  console.log(config.nextThemes.defaultTheme);
  return (
    <Root
      css={css`
        background-color: rgba(38, 38, 38, 1);
        margin-bottom: 1rem;
      `}
      {...props}
    />
  );
}

export default Divider;
