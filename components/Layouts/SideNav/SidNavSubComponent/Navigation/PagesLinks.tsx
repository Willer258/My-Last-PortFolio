import AnimateCursorTarget from "@/components/Shared/AnimateCursorTarget";
import Link from "next/link";
import React from "react";
import FontAwesomeIcon from "../../../../SpecialComponent/FontAwesomeIcon";

interface IPagesLinksProps {
  link: string;
  label: string;
  icon?: string;
}
const PagesLinks = ({ link, label, icon }: IPagesLinksProps) => {
  return (
    <AnimateCursorTarget type={'button'}>
      <Link href={link}>
        <button className="w-14 h-14 rounded hover:bg-white hover:text-black duration-300">
          <span className="hidden">{label}</span>
          <FontAwesomeIcon icon={icon} />
        </button>
      </Link>
    </AnimateCursorTarget>
  );
};

export default PagesLinks;
