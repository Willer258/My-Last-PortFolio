/* eslint-disable @next/next/no-img-element */
import AnimateCursorTarget from "@/components/Shared/AnimateCursorTarget";
import Logo from "@/components/Shared/Logo";
import LanguageSwitcher from "@/components/Shared/LanguageSwitcher";
import React from "react";
import Navigation from "./SidNavSubComponent/Navigation";
const SideNav = () => {
  return (
    <AnimateCursorTarget type="blackBg">
      <div className="fixed h-[100%] top-0 bottom-0 mix-blend-difference  z-40 flex left-0">
        <div className="hidden  md:flex items-center justify-center h-full w-16 bg-black ">
          <span>
            <Logo isWhite/>
          </span>
        </div>

        <div
          className={
            "w-16 bg-white h-full text-black flex flex-col items-center p-3 justify-between"
          }
        >
          <div className="flex-1 flex items-center">
            <Navigation />
          </div>
          <div className="mb-4">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </AnimateCursorTarget>
  );
};

export default SideNav;
