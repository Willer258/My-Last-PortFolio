import { texts } from "@/utils/saluttexte";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import AnimateCursorTarget from "./AnimateCursorTarget";
import Logo from "./Logo";
import { useRecoilState } from "recoil";
import { showProverbs } from "@/utils/atomes";
import { TypingAnimation } from "./TyperText";

function LoadingAnimatePage() {
  
  const variants = {
    init: {
    opacity:0,
      transition: {
        ease: "circIn",
        duration: .3,
        type: "spring",
        bounce: 0.1,
        // stiffness: 100,
      },
    },
    appear: {
      opacity:1,
      width:'100%',
      transition: {
        ease: "circIn",
        duration: 1.7,
        type: "spring",
        bounce: 0.1,
        // stiffness: 100,
      },
    },
    exit: {
      x: "400vw",

      transition: {
        ease: "circIn",
        duration: 1.7,
        type: "spring",
        bounce: 0.1,
        // stiffness: 100,
      },
    },
  };
 
 
  return (
    <AnimateCursorTarget type={"blackBg"}>
      <motion.div
        variants={variants}
        initial="init"
        animate="appear"
        exit="exit"
        className="h-screen fixed top-0 bottom-0 left-0 right-0 z-40  flex items-center bg-black justify-center text-white"
      >
        <div className="position absolute w-32 h-32 top-20 ">
          <Logo isWhite />
        </div>
        <div className="text-center text-5xl px-32 leading-loose">
        <TypingAnimation/> 
        </div>
      </motion.div>
   
    </AnimateCursorTarget>
  );
}

export default LoadingAnimatePage;
