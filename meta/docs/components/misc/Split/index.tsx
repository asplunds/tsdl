/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";

void jsx;

const Root = styled.div`
  position: relative;
  display: grid;
  gap: 12px;
  grid-template-columns: 50% 0 50%;
  .nextra-code-block {
    width: 100%;
  }
`;

type SplitProps = React.ComponentProps<"div">;

function Split(props: SplitProps) {
  return <Root {...props} />;
}

export default Split;
