import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState, useCallback } from "react";
import { useRecoilState } from "recoil";
import { showProverbs, cursorState } from "@/utils/atomes";
import { textes } from "@/utils/proverbes";
import PopInText from "./PopInText";

const GenerativeScene = dynamic(() => import("./GenerativeScene"), { ssr: false });

function LoadingAnimatePage() {
  const [, setShowText] = useRecoilState(showProverbs);
  const [, setCursor] = useRecoilState(cursorState);
  const [assetsReady, setAssetsReady] = useState(false);
  const [sequenceDone, setSequenceDone] = useState(false);
  const [sliding, setSliding] = useState(false);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    setQuote(textes[Math.floor(Math.random() * textes.length)]);
    setCursor("hidden");
  }, [setCursor]);

  useEffect(() => {
    const check = async () => {
      try {
        if (document.fonts) await document.fonts.ready;
        setAssetsReady(true);
      } catch {
        setAssetsReady(true);
      }
    };
    check();
  }, []);

  const onSequenceComplete = useCallback(() => {
    setSequenceDone(true);
  }, []);

  // When ready: start slide animation, DON'T unmount yet
  useEffect(() => {
    if (sequenceDone && assetsReady && !sliding) {
      setSliding(true);
    }
  }, [sequenceDone, assetsReady, sliding]);

  // After slide animation completes: unmount
  const onSlideComplete = () => {
    setCursor("default");
    setShowText(false);
  };

  return (
    <motion.div
      key="loading"
      initial={{ y: 0 }}
      animate={{ y: sliding ? "100vh" : 0 }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (sliding) onSlideComplete();
      }}
      className="min-h-dvh fixed inset-0 z-loading flex items-center bg-surface-dark justify-center text-white overflow-hidden cursor-none"
    >
      <GenerativeScene />

      <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/70 to-transparent z-10" />

      <div className="relative z-20 text-center font-heading text-xl md:text-3xl lg:text-4xl px-8 md:px-24 leading-relaxed tracking-tightest max-w-4xl">
        {quote && (
          <PopInText
            text={quote}
            wordDelay={60}
            onComplete={onSequenceComplete}
          />
        )}
      </div>
    </motion.div>
  );
}

export default LoadingAnimatePage;
