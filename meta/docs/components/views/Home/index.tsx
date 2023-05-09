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
            Backend as a library
          </h1>
          <div style={{ height: 5 }} />
          <h2
            css={css`
              font-size: 1.5vw;
              font-weight: 500;
            `}
          >
            Connect your backend with your frontend as a library
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
