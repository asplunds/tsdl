import React from "react";
import Wrapper from "../../layout/Wrapper";
import Button from "../../ui/Button";
import Link from "next/link";
import { Fragment } from "react";
import { TextProvider } from "react-echo";
import textStyles from "./text.module.css";
import classes from "./Home.module.css";

function Home({ children }: { children: React.ReactNode }) {
  return (
    <TextProvider classNames={textStyles}>
      <Fragment>
        <Wrapper width={1100}>
          <div
            style={{
              position: "relative",
              minHeight: "calc(100vh - 310px)",
            }}
          >
            <div
              style={{
                margin: "180px 0",
                position: "relative",
                flexDirection: "column",
              }}
            >
              <h1 className={classes.title}>TSDL</h1>
              <h2 className={classes.subTitle}>
                Type-safe backend as a library
              </h2>
              <div style={{ height: 30 }} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
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
                style={{
                  borderRadius: "15px",
                  boxShadow: "0 13px 45px -3px #000",
                  margin: "0 auto",
                  width: "min(1000px, calc(100% - 8px))",
                }}
                src="/tsdl.mp4"
              />
            </div>
            {children}
          </div>
        </Wrapper>
        {/* <E2E /> */}
      </Fragment>
    </TextProvider>
  );
}

export default Home;
