import FontAwesomeIcon from "@/components/SpecialComponent/FontAwesomeIcon";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, Suspense, ComponentType } from "react";

interface SkillsMobileProps {
  tabNames: string[];
  tabComponents: ComponentType[];
}

function SkillsMobile({ tabNames, tabComponents }: SkillsMobileProps) {
  const [screenSelected, setScreenSelected] = useState<number | undefined>();

  return (
    <div className="flex flex-col w-full mt-10 overflow-hidden rounded-lg">
      {tabNames.map((name, index) => {
        const isOpen = screenSelected === index;
        const Component = tabComponents[index];

        return (
          <div key={index}>
            <button
              type="button"
              onClick={() => setScreenSelected(isOpen ? undefined : index)}
              aria-expanded={isOpen}
              aria-controls={`skills-mobile-${index}`}
              className="w-full pl-4 py-4 flex justify-between px-4 items-center text-base md:text-xl border-b bg-surface-dark text-white font-heading font-semibold border-white/10"
            >
              <span>{name}</span>
              <FontAwesomeIcon
                icon={isOpen ? "fa-caret-up" : "fa-caret-down"}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`skills-mobile-${index}`}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                  className="bg-surface-dark text-white overflow-hidden"
                >
                  <div className="p-5">
                    <Suspense fallback={<div className="h-32" />}>
                      <Component />
                    </Suspense>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default SkillsMobile;
