import React from "react";
import MainHead from "../SpecialComponent/MainHead";
import Footer from "./Footer";
import SideNav from "./SideNav";

const Layout = ({ children }: any) => {
  return (
    <div>
      <MainHead />
      <SideNav />
      <div className="ml-16 md:ml-32">
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
