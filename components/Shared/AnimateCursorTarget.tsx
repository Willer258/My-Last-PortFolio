import { cursorState } from "@/utils/atomes";
import React from "react";

import { useRecoilState } from "recoil";
function AnimateCursorTarget({ children, type }: any) {
  const [, Setcursor] = useRecoilState(cursorState);
  return (
    <div
      onMouseEnter={() => {
        type === "button"
          ? Setcursor("button")
          : type === "blackBg"
          ? Setcursor("blackBg")
          : type === "image"
          ? Setcursor("image")
          : type === "text"
          ? Setcursor("text")
          : null;
      }}
      onMouseLeave={() => {
        Setcursor("default");
      }}
      className={type === "text" ? "text-black bg-white " : ""}
    >
      {children}
    </div>
  );
}

export default AnimateCursorTarget;
