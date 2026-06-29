import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, useCallback, useMemo } from "react";

interface PopInTextProps {
  text: string;
  className?: string;
  wordDelay?: number;
  onComplete?: () => void;
}

// Average reading speed: ~4 words/second → 250ms per word for comfortable reading
const READING_MS_PER_WORD = 250;

export default function PopInText({ text, className, wordDelay = 60, onComplete }: PopInTextProps) {
  const [phase, setPhase] = useState<"typing" | "reading" | "done">("typing");
  const [visibleCount, setVisibleCount] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const words = useMemo(() => (text ? text.split(" ") : []), [text]);

  // Sequence 1: Pop-in word by word
  useEffect(() => {
    if (phase !== "typing" || !text) return;

    // Reduced motion: reveal the whole text at once, skip the pop-in
    if (prefersReducedMotion) {
      setVisibleCount(words.length);
      setPhase("reading");
      return;
    }

    if (visibleCount >= words.length) {
      setPhase("reading");
      return;
    }

    const timer = setTimeout(() => setVisibleCount((c) => c + 1), wordDelay);
    return () => clearTimeout(timer);
  }, [visibleCount, words.length, wordDelay, text, phase, prefersReducedMotion]);

  // Sequence 2: Reading time proportional to word count
  useEffect(() => {
    if (phase !== "reading") return;

    const readingTime = words.length * READING_MS_PER_WORD;
    const timer = setTimeout(() => setPhase("done"), readingTime);
    return () => clearTimeout(timer);
  }, [phase, words.length]);

  // Sequence 3: Signal complete
  useEffect(() => {
    if (phase === "done") onComplete?.();
  }, [phase, onComplete]);

  if (!text) return null;

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14, scale: 0.85 }}
          animate={
            prefersReducedMotion
              ? { opacity: 1, y: 0, scale: 1 }
              : i < visibleCount
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 14, scale: 0.85 }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }
          }
          className="inline-block mr-[0.3em]"
          aria-hidden="true"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
