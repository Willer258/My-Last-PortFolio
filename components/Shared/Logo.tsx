/* eslint-disable @next/next/no-img-element */

import LogoPng from "../../assets/images/logos/logo.png";
import LogoPngWhite from "../../assets/images/logos/logoWhite.png";
function Logo({ className, isWhite }: any) {
  return (
    <img
      className={className}
      src={isWhite ? LogoPngWhite.src : LogoPng.src}
      alt="Logo"
    />
  );
}

export default Logo;
