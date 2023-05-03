import React from "react";
import Logo from "./components/misc/Logo";

export default {
  logo: <Logo />,
  project: {
    link: "https://github.com/asplunds/tsdl",
  },
  footer: {
    text: "MIT 2023 © Jonathan Asplund",
  },
  useNextSeoProps() {
    return {
      titleTemplate: "%s – TSDL",
    };
  },
};
