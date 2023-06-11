import React from "react";
import Logo from "./components/misc/Logo";

// eslint-disable-next-line import/no-anonymous-default-export
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
  docsRepositoryBase: "https://github.com/asplunds/tsdl",
  sidebar: {
    defaultMenuCollapseLevel: 3,
  },
};
