import { useActiveSection } from "@/utils/useActiveSection";
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from 'next-i18next';

const navItems = [
  { key: "home", section: "home" },
  { key: "about", section: "profil" },
  { key: "projects", section: "projects" },
  { key: "works", section: "works" },
  { key: "skills", section: "skills" },
  { key: "contact", section: "contact" },
];

const scrollToSection = (e: React.MouseEvent, section: string) => {
  e.preventDefault();
  const lenis = (window as any).__lenis;
  const target = `#${section}`;
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.2 });
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
  }
};

const Navigation = ({ isMobile }: { isMobile?: boolean }) => {
  const activeSection = useActiveSection();
  const { t } = useTranslation('common');

  if (isMobile) {
    return (
      <ul className="flex justify-around list-none m-0 p-0 py-3 px-2">
        {navItems.map((item) => {
          const isActive = activeSection === item.section;
          return (
            <li key={item.key}>
              <a
                href={`#${item.section}`}
                onClick={(e) => scrollToSection(e, item.section)}
                className={`font-heading text-[10px] tracking-wider transition-colors duration-200 ${
                  isActive ? "text-white font-bold" : "text-white/40"
                }`}
              >
                {t(`nav.${item.key}`)}
              </a>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul className="flex flex-col space-y-6 list-none p-0 m-0">
      {navItems.map((item, index) => {
        const isActive = activeSection === item.section;
        return (
          <motion.li
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            key={item.key}
          >
            <a
              href={`#${item.section}`}
              onClick={(e) => scrollToSection(e, item.section)}
              className="relative group flex items-center"
            >
              <span
                className={`font-heading text-xs tracking-widest uppercase transition-all duration-300 ${
                  isActive
                    ? "text-white font-bold"
                    : "text-white/30 hover:text-white/70"
                }`}
              >
                {t(`nav.${item.key}`)}
              </span>
              {isActive && (
                <motion.span
                  layoutId="nav-dot"
                  className="ml-2 w-1.5 h-1.5 rounded-full bg-white"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </a>
          </motion.li>
        );
      })}
    </ul>
  );
};

export default Navigation;
