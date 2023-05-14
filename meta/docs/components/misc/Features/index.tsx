/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  faBoltLightning,
  faBuilding,
  faCheck,
  faCubes,
  faLock,
  faPaperPlane,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../ui/Button";
import ReactLogo from "./react.svg";
import Image from "next/image";
import useScrollPosition from "../../hooks/useScrollPosition";
import Link from "next/link";

const Root = styled.div`
  display: grid;
  grid-auto-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "one one one one one two two two two"
    "three three three three four four four four four"
    "five five five five five five five five five";
  gap: 1.5em;
  font-size: 16px;
`;

type FeaturesProps = object;

const absolute = css`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
`;

const FeatureContent = styled.div`
  position: relative;
  z-index: 2;
  height: 100%;
`;

const FeatureGradient = styled.div`
  background-image: radial-gradient(
    circle,
    rgba(179, 233, 255, 0.08) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  background-repeat: no-repeat;
  left: 500px;
  background-attachment: fixed;
`;

const SubFeatures = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px 0;
`;

const SubFeature = styled.div`
  padding: 0;
  border-radius: 0.7em;
  box-sizing: border-box;
  p {
    height: 100%;
    display: flex;
    gap: 12px;
    font-size: 1.3rem;
    font-weight: 600;
    align-items: center;
  }
  svg {
    width: 1.3rem;
    height: 1.3rem;
    display: inline-block;
  }
`;

const centered = css`
  display: flex;
  justify-content: center;
`;

function Features(_props: FeaturesProps) {
  return (
    <Root>
      <Feature i={0} area="one" injection={<FeatureGradient css={absolute} />}>
        <h2>End-to-end harmony</h2>
        <SubFeatures>
          <SubFeature>
            <p>
              <FontAwesomeIcon icon={faRocket} />
              Framework agnostic
            </p>
          </SubFeature>
          <SubFeature>
            <p>
              <FontAwesomeIcon icon={faLock} />
              100% Type-safe
            </p>
          </SubFeature>
          <SubFeature>
            <p>
              <FontAwesomeIcon icon={faPaperPlane} />
              Implicit input parsing
            </p>
          </SubFeature>
          <SubFeature>
            <p>
              <FontAwesomeIcon icon={faBoltLightning} />
              Powerful middleware
            </p>
          </SubFeature>
          <SubFeature>
            <p>
              <FontAwesomeIcon icon={faCubes} />
              Native integrations
            </p>
          </SubFeature>
          <SubFeature>
            <p>
              <FontAwesomeIcon icon={faBuilding} />
              Enterprise ready
            </p>
          </SubFeature>
        </SubFeatures>
      </Feature>
      <Feature area="two" i={2}>
        <h2>Using React?</h2>
        <p>
          TSDL is framework independent but we built native wrappers for the
          most popular libraries.
        </p>
        <div
          css={css`
            display: flex;
            gap: 12px;
            margin-top: 24px;
          `}
        >
          <Button>React Query</Button>
          <Button>SWR</Button>
          <Image
            css={css`
              position: absolute;
              right: 0;
              z-index: -1;
              transform: translateX(40%) translateY(-20%);
            `}
            src={ReactLogo}
            alt="React logo"
          />
        </div>
      </Feature>
      <Feature area="three" i={4}>
        <h2>Implicit schema validation</h2>
        <p>
          Write schema once, validate twice. Zod, Yup, Ajv, etc. your favorite
          schema validator implicitly integrates with TSDL.
        </p>
        <div
          css={[
            css`
              margin-top: 32px;
            `,
            centered,
          ]}
        >
          <Link href="/docs/api/input">
            <Button>Learn more</Button>
          </Link>
        </div>
      </Feature>
      <Feature
        area="four"
        i={5.5}
        injection={
          <div
            css={[
              absolute,
              css`
                background-image: linear-gradient(
                  -30deg,
                  #ffffff17 0%,
                  transparent 100%
                );
                background-attachment: fixed;
              `,
            ]}
          />
        }
      >
        <h2>Incrementally adoptable</h2>
        <p
          css={css`
            margin-bottom: 12px;
          `}
        >
          TSDL works standalone or alongside existing backends.
        </p>
        <SubFeatures
          css={css`
            gap: 32px;
            margin-top: 24px;
          `}
        >
          <SubFeature>
            <p>
              <FontAwesomeIcon icon={faCheck} />
              Vanilla Node
            </p>
          </SubFeature>
          <SubFeature>
            <p>
              <FontAwesomeIcon icon={faCheck} />
              Express.js
            </p>
          </SubFeature>
          <SubFeature>
            <p>
              <FontAwesomeIcon icon={faCheck} />
              Koa
            </p>
          </SubFeature>
          <SubFeature>
            <p>
              <FontAwesomeIcon icon={faCheck} />
              Deno
            </p>
          </SubFeature>
        </SubFeatures>
      </Feature>
      <Feature
        injection={
          <div
            css={[
              absolute,
              css`
                background-image: radial-gradient(#333 1px, transparent 0),
                  radial-gradient(#333 1px, transparent 0);
                --size: 40px;
                background-size: var(--size) var(--size);
                background-position: 0 0,
                  calc(var(--size) / 2) calc(var(--size) / 2);
                border: 10px solid transparent;
                background-attachment: fixed;
              `,
            ]}
          />
        }
        area="five"
        i={8}
      >
        <h3
          css={css`
            text-align: center;
            font-size: 1.6em;
            font-weight: 600;
            margin-top: 0.5em;
            color: #969696;
          `}
        >
          Say goodbye to GraphQL, REST and get/post/put ...
        </h3>
        <h2
          css={css`
            text-align: center;
            font-size: 3em !important;
            font-weight: 700 !important;
            margin-top: 0.1em;
          `}
        >
          Hello, future
        </h2>
        <div
          css={[
            centered,
            css`
              gap: 12px;
              margin-top: 40px;
            `,
          ]}
        >
          <Link href="/docs/getting-started/introduction">
            <Button>Level upp your app</Button>
          </Link>
        </div>
      </Feature>
    </Root>
  );
}

const FeatureRoot = styled.div`
  height: 300px;
  padding: 1.5em;
  background: #000;
  border-radius: 1.5em;
  position: relative;
  overflow: hidden;
  transition: all 0.1s ease-out;
  h2 {
    font-weight: 600;
    font-size: 2.3em;
    margin-bottom: 0.5em;
    line-height: 110%;
  }
  p {
    font-size: 0.95em;
  }
  ul {
    list-style: initial;
    padding-left: 1em;
    li {
      margin-bottom: 0.1em;
    }
  }
`;

const br = css`
  border-radius: inherit;
`;

const FeatureBorder = styled.div`
  background: linear-gradient(
    var(--rotation),
    #ffffff9f 0%,
    #363636 50%,
    #ffffff81 100%
  );
`;

const FeatureOverlay = styled.div`
  box-sizing: border-box;
  padding: 1px;
`;

const FeatureBg = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  background: #0d0d0d;
`;

function Feature({
  area,
  children,
  injection,
  i,
}: {
  area: string;
  children?: React.ReactNode;
  injection?: React.ReactNode;
  i: number;
}) {
  const pos = useScrollPosition() - i * 100;

  return (
    <FeatureRoot
      style={{
        gridArea: `${area}`,
        opacity: `${Math.max(0.3, pos / 50)}`,
        transform: `translateY(${Math.max(0, -pos / 7)}px) scale(${
          0.9 + Math.max(Math.min(0.1, pos / 1000), 0)
        })`,
      }}
    >
      <FeatureBorder
        css={[
          absolute,
          br,
          css`
            --rotation: ${i * 60 + (152 * pos) / 500}deg;
          `,
        ]}
      />
      <FeatureOverlay css={[absolute, br]}>
        <FeatureBg css={br} />
        {injection}
      </FeatureOverlay>
      <FeatureContent>{children}</FeatureContent>
    </FeatureRoot>
  );
}

export default Features;
