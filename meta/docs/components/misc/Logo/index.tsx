import React from "react";
import src from "./logo.svg";
import Image from "next/image";
import classes from "./Logo.module.css";

function Logo() {
  return (
    <div className={classes.root}>
      <Image height={30} src={src} alt="TSDL Logo" />
    </div>
  );
}

export default Logo;
