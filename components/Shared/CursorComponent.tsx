import { cursorState } from "@/utils/atomes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

function CursorComponent() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursor] = useRecoilState(cursorState);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveMouse);
    return () => window.removeEventListener("mousemove", moveMouse);
  }, []);

  const baseTranslate = { translateX: cursorPosition.x - 10, translateY: cursorPosition.y - 10 };

  const variants: any = {
    default: {
      ...baseTranslate,
      translateY: cursorPosition.y - 5,
      scale: 1,
      backgroundColor: "white",
      mixBlendMode: "difference",
    },
    button: {
      translateX: cursorPosition.x - 75,
      translateY: cursorPosition.y - 75,
      scale: 1,
      backgroundColor: "white",
      mixBlendMode: "difference",
      border: "solid 2px",
      width: 150,
      height: 150,
    },
    blackBg: {
      ...baseTranslate,
      scale: 1,
      backgroundColor: "white",
    },
    image: {
      ...baseTranslate,
      scale: 1,
      backgroundColor: "transparent",
      mixBlendMode: "difference",
      border: "solid 2px",
      width: 100,
      height: 100,
    },
    text: {
      ...baseTranslate,
      scale: 1,
      backgroundColor: "white",
      mixBlendMode: "difference",
    },
    hidden: {
      ...baseTranslate,
      scale: 0,
      opacity: 0,
    },
  };

  return (
    <motion.div
      className="cursor hidden lg:block"
      style={{ willChange: "transform" }}
      animate={cursor}
      variants={variants}
      transition={{ type: "tween", duration: 0.05, ease: "linear" }}
      aria-hidden="true"
    />
  );
}

export default CursorComponent;
