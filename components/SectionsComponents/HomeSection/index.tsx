/* eslint-disable react/no-unescaped-entities */
import AnimateCursorTarget from "@/components/Shared/AnimateCursorTarget";
import Logo from "@/components/Shared/Logo";
import { texts } from "@/utils/saluttexte";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Button from "../../Shared/Button";

function HomeSection() {
  const [stateText, setStateText] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      {
        stateText == texts.length - 1
          ? setStateText(0)
          : setStateText(stateText + 1);
      }
    }, 5000);
  }, [stateText]);
  return (
    <div id="home" className="h-screen lg:w-3/4 mx-auto px-2 md:px-5">
      <Logo className="w-32 h-32" />
      <a
        href="https://firebasestorage.googleapis.com/v0/b/mon-portfolio-7cb39.appspot.com/o/cv.pdf?alt=media&token=35322b94-a4e4-4416-b035-aa4e836f786f"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button className="fixed top-5 right-5 uppercase border border-white">
          Télécharger mon CV
        </Button>
      </a>

      <div className="flex justify-start h-full w-full items-center">
        <div className="space-y-5 md:space-y-8">
          <AnimateCursorTarget type="text">
            <motion.div
              key={texts[stateText]}
              initial={{ opacity: 0.5, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <motion.span className="italic font-thin text-2xl">
                {texts[stateText]} !!!
              </motion.span>
            </motion.div>
          </AnimateCursorTarget>

          <AnimateCursorTarget type="text">
            <h1 className="text-3xl md:text-5xl lg:text-6xl">
              Wilfried Houinlindjonon
            </h1>
          </AnimateCursorTarget>

          <AnimateCursorTarget type="text">
            <h2 className="text-3xl md:text-5xl font-bold ">
              Concepteur de site web, d'appli web et mobile.
            </h2>
          </AnimateCursorTarget>

          <AnimateCursorTarget type="text">
            <p className="lg:text-lg w-5/6">
              Je suis un développeur basé à Abidjan CI, spécialisé dans la
              construction de sites Web d'exception, applications mobiles, et
              tout le reste.
            </p>
          </AnimateCursorTarget>

          <div className="flex space-x-3">
            <a href="mailto:wilfriedhouinlindjonon91@gmail.com">
              <Button type="outlined">Prendre contact</Button>
            </a>
            <a
              href="https://firebasestorage.googleapis.com/v0/b/mon-portfolio-7cb39.appspot.com/o/cv.pdf?alt=media&token=35322b94-a4e4-4416-b035-aa4e836f786f"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="  border ">Télécharger mon CV</Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSection;
