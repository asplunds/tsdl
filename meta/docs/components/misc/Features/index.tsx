/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";

const Root = styled.div`
  display: grid;
  grid-auto-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "one one one one one two two two two"
    "three three three three four four four four four"
    "five five five five five six six six six";
  gap: 1.5em;
  font-size: 16px;
`;

type FeaturesProps = object;

function Features(_props: FeaturesProps) {
  return (
    <Root>
      <Feature area="one" title="Bye-bye REST & GraphQL">
        <p>
          Legacy transport protocols slow the developer down, they&apos;re
          type-unsafe and treats every requests like a foreign invasion.
        </p>
        <br />
        <p>
          TSDL lets your frontend know what input types are required, the output
          and the available queries. Changes on the backend are immediately
          known on the frontend, just like changing a shared utility function!
        </p>
      </Feature>
      <Feature area="two" title="Hello, TSDL">
        <ul>
          <li>Write schemas once, validate twice</li>
          <li>Works with any framework</li>
          <li>First class React Query & SWR integration</li>
          <li>Express.js & Node.js http integrations</li>
          <li>Move fast, don&apos;t break things</li>
        </ul>
      </Feature>
      <Feature area="three" title="" />
      <Feature area="four" title="" />
      <Feature area="five" title="" />
      <Feature area="six" title="" />
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
  h2 {
    font-weight: 600;
    font-size: 1.6em;
    margin-bottom: 0.5em;
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

function Feature({
  area,
  title,
  children,
}: {
  area: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <FeatureRoot
      css={css`
        grid-area: ${area};
      `}
    >
      <h2>{title}</h2>
      {children}
    </FeatureRoot>
  );
}

export default Features;
