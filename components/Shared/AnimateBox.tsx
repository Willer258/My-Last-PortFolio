import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

function AnimateBox({ children, delay }: any) {
  const variants = {
    hidden: { y: "-100%" },
    show: { y: "100%" },
  };
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  return (
    <div className="relative flex items-center overflow-hidden">
      <motion.div
        ref={ref}
        className="absolute h-full bg-ink w-full"
        variants={variants}
        initial="hidden"
        transition={{ duration: 1, delay: delay ?? 0 }}
        animate={controls}
      />
      <div className="relative" style={{ zIndex: -1 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.5 } }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

export default AnimateBox;
