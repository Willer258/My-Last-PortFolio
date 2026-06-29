import React from "react";
import MainHead from "../SpecialComponent/MainHead";
import SideNav from "./SideNav";
import Footer from "./Footer";
import { useRecoilState } from "recoil";
import { showProverbs } from "@/utils/atomes";
import { useTranslation } from "next-i18next";

const Layout = ({ children }: any) => {
  const [showText] = useRecoilState(showProverbs);
  const { t } = useTranslation("common");

  return (
    <div className="min-h-dvh bg-surface">
      <MainHead />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-ink focus:text-surface focus:font-heading focus:text-sm focus:font-semibold focus:shadow-lg"
      >
        {t("a11y.skipToContent")}
      </a>
      {!showText && <SideNav />}
      <main id="main" tabIndex={-1} className="md:pl-36 outline-none">
        {children}
      </main>
      {!showText && <Footer />}
    </div>
  );
};

export default Layout;
