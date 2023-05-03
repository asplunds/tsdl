/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";
import Wrapper from "../../layout/Wrapper";
import Button from "../../ui/Button";
import Link from "next/link";
void jsx;

const Root = styled.div`
  position: relative;
  min-height: calc(100vh - 310px);
`;

const Hero = styled.div`
  margin: 80px 0;
  position: relative;
  flex-direction: column;
`;

const Underlined = styled.span`
  text-decoration: underline;
  text-underline-offset: 13px;
`;

function Home({ children }: { children: React.ReactNode }) {
  return (
    <Wrapper>
      <Root>
        <Hero>
          <h1
            css={css`
              font-size: 4vw;
              font-weight: 700;
            `}
          >
            Make your <Underlined>backend</Underlined> a{" "}
            <Underlined>library</Underlined>
          </h1>
          <div style={{ height: 5 }} />
          <h2
            css={css`
              font-size: 1.5vw;
              font-weight: 500;
            `}
          >
            Stop hassling with REST and GraphQL. Level up your app with TSDL
          </h2>
          <div style={{ height: 30 }} />
          <Link href="/docs/getting-started/introduction">
            <Button>Get Started</Button>
          </Link>
        </Hero>
        {children}
      </Root>
    </Wrapper>
  );
}

export default Home;
