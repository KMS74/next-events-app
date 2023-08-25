import React from "react";
import MainHeader from "./MainHeader";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MainHeader />
      <main>{children}</main>
    </>
  );
};

export default layout;
