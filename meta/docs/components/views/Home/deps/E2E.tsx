/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";
import Wrapper from "../../../layout/Wrapper";
import { Text } from "react-echo";

const Root = styled.div`
  position: relative;
`;

type depsProps = object;

function deps(_props: depsProps) {
  return (
    <Wrapper>
      <Root>
        <Text h1 as="h2" style={{

        }}>End to end Type Safety</Text>
      </Root>
    </Wrapper>
  );
}

export default deps;
