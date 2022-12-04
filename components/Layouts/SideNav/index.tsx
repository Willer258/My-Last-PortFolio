/* eslint-disable @next/next/no-img-element */
import AnimateCursorTarget from "@/components/Shared/AnimateCursorTarget";
import Logo from "@/components/Shared/Logo";
import React from "react";
import Navigation from "./SidNavSubComponent/Navigation";
const SideNav = () => {
  return (
    <AnimateCursorTarget type="blackBg">
      <div className="fixed top-0 bottom-0 mix-blend-difference  z-40 flex left-0">
        <div className="hidden  md:flex items-center justify-center h-full w-16 bg-black ">
          <span>
            <Logo isWhite/>
          </span>
        </div>

        <div
          className={
            "w-16 bg-white h-full text-black flex flex-col items-center p-3 justify-center"
          }
        >
          <Navigation />
        </div>
      </div>
    </AnimateCursorTarget>
  );
};

export default SideNav;
