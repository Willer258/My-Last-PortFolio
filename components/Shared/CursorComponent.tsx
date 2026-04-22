import { cursorState } from "@/utils/atomes";
import { motion } from "framer-motion";
import { useEffect, useRef, useCallback } from "react";
import { useRecoilState } from "recoil";

function CursorComponent() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const [cursor] = useRecoilState(cursorState);

  const updateTransform = useCallback(() => {
    const el = cursorRef.current;
    if (!el) return;
    const { x, y } = posRef.current;
    // Direct DOM update — no React re-render
    el.style.transform = `translate3d(${x - 10}px, ${y - 5}px, 0)`;
  }, []);

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

  const variants: Record<string, any> = {
    default: {
      scale: 1,
      width: 20,
      height: 20,
      backgroundColor: "white",
      mixBlendMode: "difference",
    },
    button: {
      scale: 1,
      width: 150,
      height: 150,
      backgroundColor: "white",
      mixBlendMode: "difference",
      border: "solid 2px",
    },
    blackBg: {
      scale: 1,
      width: 20,
      height: 20,
      backgroundColor: "white",
    },
    image: {
      scale: 1,
      width: 100,
      height: 100,
      backgroundColor: "transparent",
      mixBlendMode: "difference",
      border: "solid 2px",
    },
    text: {
      scale: 1,
      width: 20,
      height: 20,
      backgroundColor: "white",
      mixBlendMode: "difference",
    },
    hidden: {
      scale: 0,
      opacity: 0,
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
