import React from "react";

type WrapperProps = {
  children: React.ReactNode;
  width: number;
};

function Wrapper({ children, width }: WrapperProps) {
  return (
    <div
      style={{
        marginInline: "auto",
        width: `min(${width}px, calc(100% - 24px))`,
      }}
    >
      {children}
    </div>
  );
}

export default Wrapper;
