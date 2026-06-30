import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="md:pl-36 bg-surface border-t border-ink/10">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-heading text-sm font-semibold tracking-tight text-ink">
          Wilfried Houinlindjonon
        </p>
        <p className="font-body text-xs text-ink-faint">
          &copy; {year} Wilfried Houinlindjonon
        </p>
      </div>
    </footer>
  );
};

export default Footer;
