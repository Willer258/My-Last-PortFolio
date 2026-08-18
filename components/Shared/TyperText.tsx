import { motion, useAnimation, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export const TypingAnimation = ({
  text,
  style,
  className,
  delay,
  duration,
  isList,
  onAnimationComplete,
  nospace,
}: any) => {
  const [displayedText, setDisplayedText] = useState("");

  const [texte, setTexte] = useState("");

  const prefersReducedMotion = useReducedMotion();
  function genererTexte() {
    if (text) {
      setTexte(text);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      genererTexte();
    }, delay ?? 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Reduced motion: render the full text at once, skip the typing animation
    if (prefersReducedMotion) {
      if (texte && displayedText !== texte) {
        setDisplayedText(texte);
        onAnimationComplete && onAnimationComplete();
      }
      return;
    }

    const intervalId = setInterval(() => {
      const length = displayedText.length;

      if (length < texte.length) {
        setDisplayedText(texte.slice(0, length + 1));
      } else {
        clearInterval(intervalId);
        onAnimationComplete && onAnimationComplete();
      }
    }, duration ?? 50);

    return () => clearInterval(intervalId);
  }, [displayedText, texte, prefersReducedMotion]);

  if (isList) {
    return (
      <li className={className} style={style}>
        {displayedText}
      </li>
    );
  } else {
    return (
      <>
        {" "}
        {nospace ? (
          <div className={className} style={style}>
            {displayedText}
          </div>
        ) : (
          <div className="relative">
            <div className={className + " " + "absolute"} style={style}>
              {displayedText}
            </div>
            {/* Transparent copy reserves layout width only — hidden from assistive tech */}
            <div className={className + " " + "text-transparent"} aria-hidden="true">
              {text}
            </div>
          </div>
        )}
      </>
    );
  }
};

export const RetypingTextAnimation = ({
  words,
  text,
  delay,
  className,
}: any) => {
  const [currentText, setCurrenText] = useState("");
  const [textAdded, setTextAdded] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Reduced motion: show the full text + first word statically, no cycling
    if (prefersReducedMotion) return;
    const timer = setTimeout(() => {
      const current = index % words.length;
      const word = words[current];

      // Condition pour savoir s'il faut ajouter ou supprimer un mot
      if (text) {
        setTextAdded(text.substring(0, textAdded.length + 1));
      }
      if (isDeleting) {
        setCurrenText(word.substring(0, currentText.length - 1));
      } else {
        setCurrenText(word.substring(0, currentText.length + 1));
      }

      // Condition pour savoir s'il faut passer au mot suivant
      if (!isDeleting && currentText === word) {
        setTimeout(() => {
          setIsDeleting(true);
          setCount(count + 1);
        }, 1000);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setIndex(index + 1);
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, index, words, text, textAdded.length, count, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div className="relative">
        <div className={className + " " + "absolute"}>
          {text} {words?.[0]}
        </div>
        <div className="text-transparent ">
          {text} {words?.[1]}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="relative"
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 1, delay: delay ?? 0 }}
    >
      <div className={className + " " + "absolute"}>
        {textAdded} {textAdded == text ? currentText : null}
      </div>
      <div className="text-transparent ">
        {text} {words[1]}
      </div>
    </motion.div>
  );
};

export const BandeTexteAnimation = ({
  className,
  text,
  delay,
  noLine,
  whiteBar,
  as,
}: any) => {
  // Semantic element for the revealed text (defaults to a level-2 heading)
  const Tag = as ?? "h2";
  const variants = {
    hidden: {
      x: "-100%",
    },
    show: {
      x: "100%",
    },

    gomark: {
      width: "100%",
    },

    cometext: {
      opacity: 1,
    },
  };
  const controlsText = useAnimation();
  const controlsMark = useAnimation();
  const controlsBack = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      controlsBack.start("show");
      controlsText.start("cometext");
      controlsMark.start("gomark");
    }
  }, [controlsBack, controlsMark, controlsText, inView]);
  return (
    <div className="relative flex  items-center overflow-hidden">
      <motion.div
        ref={ref}
        variants={variants}
        className={`absolute h-full ${
          whiteBar ? "bg-white" : "bg-ink"
        }  w-full`}
        initial={{ x: "-100%" }}
        animate={controlsBack}
        transition={{ duration: 1, delay: delay ?? 0 }}
        exit={{ width: 0 }}
      />

      <>
        {noLine ?? (
          <motion.div
            className={`absolute h-2 bottom-0.5 ${
              whiteBar ? "bg-ink" : "bg-ink/30"
            } w-full`}
            initial={{ width: 0 }}
            variants={variants}
            animate={controlsMark}
            transition={{ duration: 2, delay: delay ?? 0 }}
            exit={{ width: 0 }}
          />
        )}

        <Tag className={className}>
          <motion.span
            initial={{ opacity: 0 }}
            variants={variants}
            animate={controlsText}
            transition={{ delay: (delay ?? 0) + 0.5 }}
          >
            {text}
          </motion.span>
        </Tag>
      </>
    </div>
  );
};
