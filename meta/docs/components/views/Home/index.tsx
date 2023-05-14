/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";
import Wrapper from "../../layout/Wrapper";
import Button from "../../ui/Button";
import Link from "next/link";
import Features from "../../misc/Features";
void jsx;

const Root = styled.div`
  position: relative;
  min-height: calc(100vh - 310px);
`;

const Hero = styled.div`
  margin: 180px 0;
  position: relative;
  flex-direction: column;
`;

function Home({ children }: { children: React.ReactNode }) {
  return (
    <Wrapper width={1100}>
      <Root>
        <Hero>
          <h1
            css={css`
              font-size: 6vw;
              font-weight: 700;
              text-align: center;
            `}
          >
            TSDL
          </h1>
          <h2
            css={css`
              font-size: 1.7vw;
              margin-top: -0.4vw;
              font-weight: 500;
              text-align: center;
            `}
          >
            Type-safe backend as a library
          </h2>
          <div style={{ height: 30 }} />
          <div
            css={css`
              display: flex;
              justify-content: center;
            `}
          >
            <Link href="/docs/getting-started/introduction">
              <Button>Get Started</Button>
            </Link>
          </div>
          <div style={{ height: 170 }} />
          <Features />
        </Hero>
        {children}
      </Root>
    </Wrapper>
  );
}

export default Home;
