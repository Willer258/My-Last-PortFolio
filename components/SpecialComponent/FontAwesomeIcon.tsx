import React from "react";

interface IFontAwesomeIcon {
  size?: string;
  className?: string;
  icon?: string;
  
}
const FontAwesomeIcon = ({ size, icon, className }: IFontAwesomeIcon) => {
  return (
    <i className={`fa-solid ${icon}  ${size ?? "text-2xl"}  ${className} `}></i>
  );
};

export default FontAwesomeIcon;
