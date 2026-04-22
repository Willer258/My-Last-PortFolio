import { cursorState } from "@/utils/atomes";
import React, { createContext, useContext } from "react";
import { useRecoilState } from "recoil";

// Context tracks the parent cursor type so nested targets
// restore the correct state on mouse leave.
const CursorParentContext = createContext<string>("default");

function AnimateCursorTarget({
  children,
  type,
}: {
  children: React.ReactNode;
  type?: string;
}) {
  const [, setCursor] = useRecoilState(cursorState);
  const parentType = useContext(CursorParentContext);

  return (
    <CursorParentContext.Provider value={type ?? parentType}>
      <div
        onMouseEnter={() => {
          if (type) setCursor(type);
        }}
        onMouseLeave={() => {
          setCursor(parentType);
        }}
      >
        {children}
      </div>
    </CursorParentContext.Provider>
  );
}

export default AnimateCursorTarget;
