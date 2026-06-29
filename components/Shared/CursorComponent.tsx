import { cursorState } from "@/utils/atomes";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";

const SPRING_CONFIG = { damping: 25, stiffness: 300, mass: 0.5 };
// Near-instant follow when the user prefers reduced motion (no visible trailing)
const REDUCED_SPRING_CONFIG = { damping: 100, stiffness: 2000, mass: 0.1 };

const variants: Record<string, {
  size: number;
  bg: string;
  blend: string;
  border: string;
  opacity: number;
}> = {
  default: {
    size: 12,
    bg: "white",
    blend: "difference",
    border: "none",
    opacity: 1,
  },
  button: {
    size: 56,
    bg: "transparent",
    blend: "difference",
    border: "1.5px solid white",
    opacity: 1,
  },
  blackBg: {
    size: 12,
    bg: "white",
    blend: "normal",
    border: "none",
    opacity: 0.8,
  },
  image: {
    size: 64,
    bg: "transparent",
    blend: "difference",
    border: "1.5px solid white",
    opacity: 1,
  },
  text: {
    size: 8,
    bg: "white",
    blend: "difference",
    border: "none",
    opacity: 0.6,
  },
  hidden: {
    size: 0,
    bg: "white",
    blend: "difference",
    border: "none",
    opacity: 0,
  },
};

function CursorComponent() {
  const [cursor] = useRecoilState(cursorState);
  const cursorRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const spring = prefersReducedMotion ? REDUCED_SPRING_CONFIG : SPRING_CONFIG;

  // Spring-driven position for buttery smooth trailing
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, spring);
  const springY = useSpring(mouseY, spring);

  // Spring-driven size
  const size = useMotionValue(variants.default.size);
  const springSize = useSpring(
    size,
    prefersReducedMotion ? REDUCED_SPRING_CONFIG : { damping: 20, stiffness: 250 }
  );

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [mouseX, mouseY]);

  // Update size + styles when variant changes
  useEffect(() => {
    const v = variants[cursor] ?? variants.default;
    size.set(v.size);

    const el = cursorRef.current;
    if (!el) return;
    el.style.backgroundColor = v.bg;
    el.style.mixBlendMode = v.blend;
    el.style.border = v.border;
    el.style.opacity = String(v.opacity);
  }, [cursor, size]);

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 rounded-full pointer-events-none hidden lg:block"
      style={{
        x: springX,
        y: springY,
        width: springSize,
        height: springSize,
        translateX: "-50%",
        translateY: "-50%",
        zIndex: 50,
        willChange: "transform, width, height",
        backgroundColor: variants.default.bg,
        mixBlendMode: variants.default.blend as any,
      }}
      aria-hidden="true"
    />
  );
}

export default CursorComponent;
