import AnimateCursorTarget from "@/components/Shared/AnimateCursorTarget";
import React from "react";
import FontAwesomeIcon from "../../../../SpecialComponent/FontAwesomeIcon";
import { motion } from "framer-motion";

interface IPagesLinksProps {
  link: string;
  label: string;
  icon?: string;
  isActive?: boolean;
}

const PagesLinks = ({ link, label, icon, isActive }: IPagesLinksProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(link, { duration: 1.2 });
    } else {
      document.querySelector(link)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimateCursorTarget type="button">
      <a href={link} onClick={handleClick}>
        <motion.button
          type="button"
          transition={{ duration: 0.2 }}
          className={`w-11 h-11 rounded-md duration-200 flex items-center justify-center relative ${
            isActive
              ? "bg-ink text-white"
              : "text-ink-muted hover:bg-ink hover:text-white"
          }`}
          aria-label={label}
          aria-current={isActive ? "true" : undefined}
        >
          <span className="sr-only">{label}</span>
          <FontAwesomeIcon icon={icon} />
          {isActive && (
            <motion.div
              layoutId="nav-indicator"
              className="absolute -right-3 w-0.5 h-5 bg-ink rounded-full"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </motion.button>
      </a>
    </AnimateCursorTarget>
  );
};

export default PagesLinks;
