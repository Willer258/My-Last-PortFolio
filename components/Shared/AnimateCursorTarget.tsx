import { cursorState } from "@/utils/atomes";
import React from "react";
import { useRecoilState } from "recoil";

function AnimateCursorTarget({ children, type }: any) {
  const [, setCursor] = useRecoilState(cursorState);

  return (
    <div
      onMouseEnter={() => {
        if (type) setCursor(type);
      }}
      onMouseLeave={() => {
        setCursor("default");
      }}
    >
      {children}
    </div>
  );
}

export default AnimateCursorTarget;
