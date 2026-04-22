import { cursorState } from "@/utils/atomes";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef, useCallback } from "react";
import { useRecoilState } from "recoil";

// Half-sizes for centering the cursor on the pointer
const cursorSizes: Record<string, number> = {
  default: 10,
  button: 75,
  blackBg: 10,
  image: 50,
  text: 10,
  hidden: 10,
};

function CursorComponent() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const [cursor] = useRecoilState(cursorState);
  const halfSize = cursorSizes[cursor] ?? 10;

  const updateTransform = useCallback(() => {
    const el = cursorRef.current;
    if (!el) return;
    const { x, y } = posRef.current;
    const half = cursorSizes[cursor] ?? 10;
    el.style.transform = `translate3d(${x - half}px, ${y - half}px, 0)`;
  }, [cursor]);

  useEffect(() => {
    let rafId: number | null = null;
    let dirty = false;

    const onMouseMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
      if (!dirty) {
        dirty = true;
        rafId = requestAnimationFrame(() => {
          updateTransform();
          dirty = false;
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [updateTransform]);

  // Re-center when cursor variant changes (size change)
  useEffect(() => {
    updateTransform();
  }, [cursor, updateTransform]);

  const variants: Record<string, any> = {
    default: {
      width: 20,
      height: 20,
      backgroundColor: "white",
      mixBlendMode: "difference",
      opacity: 1,
      scale: 1,
    },
    button: {
      width: 150,
      height: 150,
      backgroundColor: "white",
      mixBlendMode: "difference",
      opacity: 1,
      scale: 1,
      border: "solid 2px",
    },
    blackBg: {
      width: 20,
      height: 20,
      backgroundColor: "white",
      opacity: 1,
      scale: 1,
    },
    image: {
      width: 100,
      height: 100,
      backgroundColor: "transparent",
      mixBlendMode: "difference",
      opacity: 1,
      scale: 1,
      border: "solid 2px",
    },
    text: {
      width: 20,
      height: 20,
      backgroundColor: "white",
      mixBlendMode: "difference",
      opacity: 1,
      scale: 1,
    },
    hidden: {
      opacity: 0,
      scale: 0,
    },
  };

  return (
    <motion.div
      ref={cursorRef}
      className="cursor hidden lg:block"
      style={{ willChange: "transform", transform: "translate3d(-100px, -100px, 0)" }}
      animate={cursor}
      variants={variants}
      transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
      aria-hidden="true"
    />
  );
}

export default CursorComponent;
