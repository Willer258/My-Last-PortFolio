import {
  LazyMotion,
  domAnimation,
  m,
  motion,
  useAnimation,
} from "framer-motion";
import React, { useEffect, useState } from "react";
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
        transition={{ duration: 1, delay: delay ?? 0 }}
        animate={controls}
      
      />
        <motion.div
        initial={{ opacity: 0, zIndex: -10000 }}
        animate={{ opacity: 1, zIndex: -10000  ,transition:{delay:.5}}}
      
      >
        {children}
      </motion.div>
      
    
    </div>
  );
}

export default AnimateBox;
