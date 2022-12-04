import { motion } from "framer-motion";
import AnimateCursorTarget from "./AnimateCursorTarget";

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
      x: "200vw",
      opacity: 0,
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
        initial={"init"}
        animate="appear"
        exit={"exit"}
        className="h-screen fixed top-0 bottom-0 left-0 right-0 z-40  flex items-center bg-black justify-center text-white"
      >
        <div className="relative overflow-hidden">
          <motion.span
            variants={variants}
            initial={"init"}
            animate="appear"
            exit={"exit"}
            className="text-6xl"
          >
            Ohayo
          </motion.span>
        </div>
      </motion.div>
    </AnimateCursorTarget>
  );
}

export default LoadingAnimatePage;
