import Image from "next/image";
import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="md:pl-36 bg-surface-dark border-t border-white/10 text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-5">
        <p className="font-heading text-sm font-semibold tracking-tight text-white">
          Wilfried Houinlindjonon
        </p>

        <div className="flex space-x-3">
          <a
            href="https://github.com/Willer258"
            rel="noreferrer"
            target="_blank"
            className="group h-10 w-10 p-2 hover:scale-105 active:scale-95 duration-200 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white border border-white/10 hover:border-white/30 transition-all"
            aria-label="GitHub profile"
          >
            <Image src="/social/github.svg" width={100} height={100} className="w-full h-full object-contain invert group-hover:invert-0 transition-all duration-300" alt="GitHub" />
          </a>
          <a
            href="https://www.linkedin.com/in/alain-wilfried-houinlindjonon-929612247/"
            rel="noreferrer"
            target="_blank"
            className="group h-10 w-10 p-2 hover:scale-105 active:scale-95 duration-200 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white border border-white/10 hover:border-white/30 transition-all"
            aria-label="LinkedIn profile"
          >
            <Image src="/social/linkedin.svg" width={100} height={100} className="w-full h-full object-contain invert group-hover:invert-0 transition-all duration-300" alt="LinkedIn" />
          </a>
        </div>

        {/* Right padding keeps the copyright clear of the floating scroll button */}
        <p className="font-body text-xs text-white/50 sm:pr-14">
          &copy; {year} Wilfried Houinlindjonon
        </p>
      </div>
    </footer>
  );
};

export default Footer;
