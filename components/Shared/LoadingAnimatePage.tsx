import { texts } from "@/utils/saluttexte";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import AnimateCursorTarget from "./AnimateCursorTarget";
import Logo from "./Logo";

function LoadingAnimatePage() {
  const variants = {
    init: {
      x: -0,
      transition: {
        ease: "circIn",
        duration: 1.7,
        type: "spring",
        bounce: 0.1,
        // stiffness: 100,
      },
    },
    appear: {
      x: 0,
      transition: {
        ease: "circIn",
        duration: 1.7,
        type: "spring",
        bounce: 0.1,
        // stiffness: 100,
      },
    },
    exit: {
      x: "300vw",

      transition: {
        ease: "circIn",
        duration: 1.7,
        type: "spring",
        bounce: 0.1,
        // stiffness: 100,
      },
    },
  };

  const [stateText, setStateText] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setStateText(stateText + 1);
    }, 1500);
  }, [stateText]);

  return (
    <AnimateCursorTarget type={"blackBg"}>
      <motion.div
        variants={variants}
        initial={"init"}
        animate="appear"
        exit={"exit"}
        className="h-screen fixed top-0 bottom-0 left-0 right-0 z-40  flex items-center bg-black justify-center text-white"
      >
        <div className="position absolute w-32 h-32 top-20 ">
          <Logo isWhite />
        </div>
        <div className="overflow-hidden">
          <motion.div
            key={texts[stateText]}
            initial={{ x: -500, opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <span style={{ fontSize: "10rem" }}>{texts[stateText]} !</span>
          </motion.div>
        </div>
      </motion.div>
    </AnimateCursorTarget>
  );
}

export default LoadingAnimatePage;
