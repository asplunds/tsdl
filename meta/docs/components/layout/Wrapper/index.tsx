/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";
void jsx;

const Root = styled.div`
  padding: 0 max(env(safe-area-inset-right), 1.5rem);
  margin: 0 auto;
  box-sizing: border-box;
`;

type WrapperProps = { width?: string | number } & React.ComponentProps<"div">;

function Wrapper({ width, ...props }: WrapperProps) {
  return (
    <Root
      css={css`
        max-width: ${(typeof width === "number" ? `${width}px` : width) ??
        "90rem"};
      `}
      {...props}
    />
  );
}

export default Wrapper;
