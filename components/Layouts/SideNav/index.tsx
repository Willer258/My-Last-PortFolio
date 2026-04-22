import AnimateCursorTarget from "@/components/Shared/AnimateCursorTarget";
import LanguageSwitcher from "@/components/Shared/LanguageSwitcher";
import { motion } from "framer-motion";
import React from "react";
import Navigation from "./SidNavSubComponent/Navigation";

const SideNav = () => {
  return (
    <AnimateCursorTarget type="blackBg">
      <motion.nav
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        className="fixed top-0 left-0 h-full z-nav hidden md:flex flex-col justify-between py-8 px-5 w-36 bg-surface-dark text-white"
        aria-label="Main navigation"
      >
        <div className="font-heading text-sm font-bold tracking-widest">
          W.
        </div>

        <div className="flex-1 flex items-center">
          <Navigation />
        </div>

        <LanguageSwitcher />
      </motion.nav>

      {/* Mobile bottom bar */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-nav bg-surface-dark/95 backdrop-blur-sm border-t border-white/5"
      >
        <Navigation isMobile />
      </motion.div>
    </AnimateCursorTarget>
  );
};

export default SideNav;
