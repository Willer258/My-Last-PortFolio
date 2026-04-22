import AnimateCursorTarget from "@/components/Shared/AnimateCursorTarget";
import LanguageSwitcher from "@/components/Shared/LanguageSwitcher";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useCallback } from "react";
import Navigation from "./SidNavSubComponent/Navigation";

const easeExpo = [0.76, 0, 0.24, 1] as const;

const SideNav = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = useCallback(() => setDrawerOpen((prev) => !prev), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  return (
    <AnimateCursorTarget type="blackBg">
      {/* Desktop sidebar — unchanged */}
      <motion.nav
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.7, ease: easeExpo, delay: 0.2 }}
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

      {/* Mobile: Hamburger button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: easeExpo, delay: 0.5 }}
        type="button"
        onClick={toggleDrawer}
        className="md:hidden fixed bottom-5 right-5 z-[45] w-12 h-12 rounded-full bg-surface-dark text-white flex items-center justify-center shadow-lg shadow-black/20 active:scale-95 transition-transform"
        aria-label={drawerOpen ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={drawerOpen}
      >
        <div className="flex flex-col items-center justify-center gap-[5px] w-5">
          <motion.span
            animate={drawerOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: easeExpo }}
            className="block w-full h-[2px] bg-white rounded-full origin-center"
          />
          <motion.span
            animate={drawerOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            className="block w-full h-[2px] bg-white rounded-full"
          />
          <motion.span
            animate={drawerOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: easeExpo }}
            className="block w-full h-[2px] bg-white rounded-full origin-center"
          />
        </div>
      </motion.button>

      {/* Mobile: Drawer overlay + panel */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 z-nav bg-black/60 backdrop-blur-sm"
              onClick={closeDrawer}
              aria-hidden
            />

            {/* Drawer panel */}
            <motion.nav
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.5, ease: easeExpo }}
              className="md:hidden fixed bottom-0 left-0 right-0 z-nav bg-surface-dark text-white rounded-t-2xl overflow-hidden"
              aria-label="Mobile navigation"
            >
              <div className="px-8 pt-10 pb-8">
                {/* Handle bar */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-white/20" />

                <Navigation isMobile onNavigate={closeDrawer} />

                <div className="mt-8 pt-6 border-t border-white/10">
                  <LanguageSwitcher />
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </AnimateCursorTarget>
  );
};

export default SideNav;
