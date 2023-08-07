/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";
void jsx;

const Root = styled.div`
  position: relative;
  width: 1px;
`;

type DividerProps = React.ComponentProps<"div">;

function Divider(props: DividerProps) {
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
