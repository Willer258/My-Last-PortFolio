import React from "react";
import MainHead from "../SpecialComponent/MainHead";
import SideNav from "./SideNav";
import { useRecoilState } from "recoil";
import { showProverbs } from "@/utils/atomes";

const Layout = ({ children }: any) => {
  const [showText] = useRecoilState(showProverbs);

  return (
    <div className="min-h-dvh bg-surface">
      <MainHead />
      {!showText && <SideNav />}
      <main className="pb-16 md:pb-0 md:pl-36">{children}</main>
    </div>
  );
};

export default Layout;
