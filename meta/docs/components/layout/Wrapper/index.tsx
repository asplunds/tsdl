/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";
void jsx;

const Root = styled.div`
  padding: 0 max(env(safe-area-inset-right), 1.5rem);
  margin: 0 auto;
  max-width: 90rem;
  box-sizing: border-box;
`;

type WrapperProps = React.ComponentProps<"div">;

function Wrapper(props: WrapperProps) {
  return <Root {...props} />;
}

export default Wrapper;
