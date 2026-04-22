import React from "react";
import FontAwesomeIcon from "../SpecialComponent/FontAwesomeIcon";
import AnimateCursorTarget from "./AnimateCursorTarget";

interface IButton {
  children: string;
  icon?: string;
  className?: string;
  type?: "outlined";
  isWhite?: boolean;
  id?: string;
}

function Button({ children, icon, className, type, isWhite, id }: IButton) {
  return (
    <AnimateCursorTarget type="button">
      <button
        type="button"
        id={id}
        className={`content rounded-lg duration-200 font-heading font-semibold tracking-wide
          active:scale-[0.98] active:translate-y-[1px]
          focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2
          ${className ?? ""}
          ${type === "outlined"
            ? `border-2 ${isWhite
                ? "text-white bg-surface-dark hover:text-surface-dark hover:bg-white border-white"
                : "text-ink border-ink hover:text-white bg-transparent hover:bg-ink"
              }`
            : `${isWhite
                ? "bg-white hover:bg-surface-dark text-surface-dark hover:text-white border-2 hover:border-white"
                : "bg-ink text-white hover:bg-white hover:text-ink border-2 border-transparent hover:border-ink"
              }`
          }
          px-6 py-3.5 ${icon ? "space-x-3" : ""}`}
      >
        <span>{children}</span>
        <FontAwesomeIcon icon={icon} />
      </button>
    </AnimateCursorTarget>
  );
}

export default Button;
