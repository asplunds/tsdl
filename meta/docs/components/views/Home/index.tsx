/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";
import Wrapper from "../../layout/Wrapper";
import Button from "../../ui/Button";
import Link from "next/link";
/* import E2E from "./deps/E2E"; */
import { Fragment } from "react";
import { TextProvider } from "react-echo";
import textStyles from "./text.module.css";

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
    <TextProvider classNames={textStyles}>
      <Fragment>
        <Wrapper width={1100}>
          <Root>
            <Hero>
              <h1
                css={css`
                  font-size: 6vw;
                  font-weight: 700;
                  text-align: center;
                  @media screen and (max-width: 800px) {
                    font-size: max(15vw, 60px);
                  }
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
                  @media screen and (max-width: 800px) {
                    font-size: max(1.7vw, 24px);
                  }
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
              <div style={{ height: 60 }} />
              <video
                muted
                loop
                autoPlay
                playsInline
                css={css`
                  border-radius: 15px;
                  box-shadow: 0 13px 45px -3px #000;
                  margin: 0 auto;
                  width: min(1000px, calc(100% - 8px));
                `}
                src="/tsdl.mp4"
              />
            </Hero>
            {children}
          </Root>
        </Wrapper>
        {/* <E2E /> */}
      </Fragment>
    </TextProvider>
  );
}

export default Home;
