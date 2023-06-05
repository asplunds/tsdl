/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";
import src from "./logo.svg";
import Image from "next/image";

void jsx;

const Root = styled.div`
  display: inline-block;
  svg {
    height: 40px;
    width: 40px;
    display: flex;
  }
`;

function Logo() {
  return (
    <Root>
      <Image height={30} src={src} alt="TSDL Logo" />
    </Root>
  );
}

export default Logo;
