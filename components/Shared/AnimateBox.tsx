import {
  LazyMotion,
  domAnimation,
  m,
  motion,
  useAnimation,
} from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

function AnimateBox({ children, delay }: any) {
  const variants = {
    hidden: {
      y: "-100%",
    },
    show: {
      y: "100%",
    },
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
        className="absolute h-full bg-black w-full"
        variants={variants}
        initial={'hidden'}
        transition={{ duration: 1, delay: delay ?? 1 }}
        animate={controls}
        viewport={{ once: true, amount: 0.8 }}
      />
      <motion.div
        initial={{ opacity: 0, background: "black", zIndex: -10000 }}
        whileInView={{ opacity: 1, zIndex: -10000 }}
        transition={{ duration: 0, delay: delay ?? 1.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default AnimateBox;
