import { showProverbs } from "@/utils/atomes";
import { textes } from "@/utils/proverbes";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";

interface Itext {
  style?: any;
  className?: string;
  text?: string;
  setTimeOuting?: any;
  sndText?:Function
}
export const TypingAnimation = ({
  text,
  style,
  className,
  sndText,
}: Itext) => {
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
    genererTexte();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const length = displayedText.length;

      if (length < texte.length) {
        setDisplayedText(texte.slice(0, length + 1));
      } else {
        clearInterval(intervalId);
       
        sndText;
        if (!text) {
        setTimeout(() => {
            setShowText(false);
        }, 2000);
         }
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, [displayedText, setShowText, texte]);

  return (
    <span className={className} style={style}>
      {displayedText}
    </span>
  );
};

export const RetypingTextAnimation = ({ words, text}: any) => {
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
      if(text){
        setTextAdded(text.substring(0, textAdded.length + 1));  }
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
  }, [currentText, isDeleting, index, words]);

  return (
    <motion.div
      animate={{ scale: [1, 1.5, 1], opacity: [0, 1] }}
      transition={{ duration: 1 }}
    >
      <span> {textAdded}  { textAdded==text ? currentText : null}</span>
    </motion.div>
  );
};
