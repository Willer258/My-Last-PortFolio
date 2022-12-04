import { cursorState } from "@/utils/atomes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { useRecoilState } from "recoil";

function CursorComponent() {
  // useEffect(() => {

  //   const cursor: any = document.querySelector(".cursor");
  //   document.addEventListener("mousemove", (e) => {

  //       var xCord = e.clientX;
  //       var yCord = e.clientY;

  //       var yPercent = (yCord/window.innerHeight) * 1000;
  //       console.log(yPercent)
  //     cursor.style.left = e.pageX  + "px";
  //     cursor.style.top = yPercent + "px";
  //   });
  // });

  const [cursorPosition, setCursorPosition] = useState({
    x: 0,
    y: 0,
  });
  const [cursor] = useRecoilState(cursorState);

  useEffect(() => {
    const moveMouse = (e: any) => {
      setCursorPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", moveMouse);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
    };
  });

  const variants :any = {
    default: {
      x: cursorPosition.x - 10,
      y: cursorPosition.y - 10,
    },

    button: {
      height: 150,
      width: 150,
      x: cursorPosition.x - 75,
      y: cursorPosition.y - 75,
      backgroundColor: "white",
      mixBlendMode: "difference",
      border: "solid 2px",
    },
    blackBg: {
      x: cursorPosition.x - 10,
      y: cursorPosition.y - 10,
      backgroundColor: "white",
      mixBlendMode: "difference",
    },
    image: {
      x: cursorPosition.x - 10,
      y: cursorPosition.y - 10,
      backgroundColor: "transparent",
      border: "solid 2px",
      height: 100,
      width: 100,
    
    },
    text: {
      x: cursorPosition.x - 10,
      y: cursorPosition.y - 10,
      backgroundColor: "white",
      mixBlendMode: "difference",
    },
  };

  return <motion.div className="cursor " animate={cursor} variants={variants} />;
}

export default CursorComponent;
