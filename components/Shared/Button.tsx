import React from "react";
import FontAwesomeIcon from "../SpecialComponent/FontAwesomeIcon";
import AnimateCursorTarget from "./AnimateCursorTarget";

interface IButton {
  children: string;
  icon?: string;
  className?: string;
  type?: "outlined";
  isWhite?: boolean;
  id?:string;
}
function Button({ children, icon, className, type, isWhite,id }: IButton) {
  return (
    <AnimateCursorTarget type={'button'}>
      <button
      id={id}
        className={`content rounded-xl duration-300 font-semibold ${
          className ?? ""
        } ${
          type == "outlined"
            ? ` border-2 ${
                isWhite
                  ? "  text-white bg-black hover:text-black hover:bg-white  border-white "
                  : " text-black border-black hover:text-white bg-white hover:bg-black"
              }`
            : ` ${
                isWhite
                  ? "bg-white hover:bg-black text-black hover:text-white border-2 hover:border-white "
                  : "bg-black text-white hover:bg-white hover:text-black border-2 hover:border-black"
              }`
        } 
      }  px-5 py-4  ${icon && "space-x-3"} `}
      >
        <span>{children}</span>
        <FontAwesomeIcon icon={icon} />
      </button>
    </AnimateCursorTarget>
  );
}

export default Button;
