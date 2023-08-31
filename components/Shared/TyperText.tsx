/* eslint-disable react-hooks/exhaustive-deps */
import { showProverbs } from "@/utils/atomes";
import { textes } from "@/utils/proverbes";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useRecoilState } from "recoil";

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

  const [, setShowText] = useRecoilState(showProverbs);
  function genererTexte() {
    if (text) {
      setTexte(text);
    } else {
      const index = Math.floor(Math.random() * textes.length);
      setTexte(textes[index]);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      genererTexte();
    }, delay ?? 0);
  }, [delay, genererTexte]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const length = displayedText.length;

      if (length < texte.length) {
        setDisplayedText(texte.slice(0, length + 1));
      } else {
        clearInterval(intervalId);
        onAnimationComplete && onAnimationComplete();
        if (!text) {
          setTimeout(() => {
            setShowText(false);
          }, 2000);
        }
      }
    }, duration ?? 50);

    return () => clearInterval(intervalId);
  }, [displayedText, setShowText, texte]);

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
            <div className={className + " " + "text-transparent"}>{text}</div>
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

  useEffect(() => {
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
  }, [currentText, isDeleting, index, words, text, textAdded.length, count]);

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
}: any) => {
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
          whiteBar ? "bg-white" : "bg-black"
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
              whiteBar ? "bg-white/30" : "bg-black/30"
            } w-full`}
            initial={{ width: 0 }}
            variants={variants}
            animate={controlsMark}
            transition={{ duration: 2, delay: delay ?? 0 }}
            exit={{ width: 0 }}
          />
        )}

        <motion.h2
          className={className}
          initial={{ opacity: 0 }}
          variants={variants}
          animate={controlsText}
          transition={{ delay: delay + 0.5 ?? 0.5 }}
        >
          {text}
        </motion.h2>
      </>
    </div>
  );
};
