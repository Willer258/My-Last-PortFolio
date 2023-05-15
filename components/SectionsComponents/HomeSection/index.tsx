/* eslint-disable react/no-unescaped-entities */
import AnimateCursorTarget from "@/components/Shared/AnimateCursorTarget";
import Logo from "@/components/Shared/Logo";
import { texts } from "@/utils/saluttexte";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Button from "../../Shared/Button";
import {
  RetypingTextAnimation,
  TypingAnimation,
} from "@/components/Shared/TyperText";

function HomeSection() {
  const [stateText, setStateText] = useState(texts[0]);
  useEffect(() => {
    setTimeout(() => {
      {
        setStateText(texts[Math.floor(Math.random() * texts.length)]);
      }
    }, 5000);
  }, [stateText]);


  return (
    <div id="home" className="relative h-screen lg:w-3/4 mx-auto px-2 md:px-5">
      <motion.div
        initial={{ width: 0, height: 0 }}
        animate={{ width: 500, height: 500 }}
        style={{ animationDuration: "30s" }}
        className=" absolute animate-spin animate-duration-2000 rounded-xl mix-blend-difference -top-[150px] bg-white -left-[120px] z-0"
      ></motion.div>

      <Logo className="w-32 h-32" />
     
      <div className="flex justify-start h-full w-full items-center">
        <div className="space-y-5 md:space-y-8">
          <AnimateCursorTarget type="text">
            <motion.div
              key={stateText}
              initial={{ opacity: 0.5, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <motion.span className="italic font-thin text-2xl">
                {stateText} !!!
              </motion.span>
            </motion.div>
          </AnimateCursorTarget>

          <AnimateCursorTarget type="text">
            <motion.h1
              initial={{ y: "50vh" }}
              animate={{ y: 0 }}
              className=" text-3xl md:text-5xl lg:text-6xl"
            >
              <TypingAnimation text=" Wilfried Houinlindjonon" />
            </motion.h1>
          </AnimateCursorTarget>

          <AnimateCursorTarget type="text">
            <h2 className=" text-3xl md:text-4xl font-bold ">
              
                {/* <TypingAnimation setTimeOuting={()=>setStateText(true)} text=" Designer, Concepteur" /> */}

                <RetypingTextAnimation className={'leading-relaxed'}
                
                  words={[" de site web", " d'application web et mobile."]}
                  text="Designer UI-UX/Concepteur"
                />
             
            </h2>
          </AnimateCursorTarget>

          <AnimateCursorTarget type="text">
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: "100%" }}
              className="lg:text-lg w-5/6"
            >
              Je suis un développeur basé à Abidjan CI, spécialisé dans la
              construction de sites Web d'exception, applications mobiles, et
              tout le reste.
            </motion.p>
          </AnimateCursorTarget>

          <div className="flex space-x-3">
            <motion.div initial={{ scale: 0 }} animate={{ scale: "100%" }}>
              <motion.a
                animate={{ scale: "100%" }}
                href="mailto:wilfriedhouinlindjonon91@gmail.com"
              >
                <Button type="outlined">Prendre contact</Button>
              </motion.a>
            </motion.div>
            <motion.div
              initial={{ x: "10vh", opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
                transition: { duration: 0.3 },
              }}
            >
              <a
                href="https://firebasestorage.googleapis.com/v0/b/mon-portfolio-7cb39.appspot.com/o/CV_2023-04-23_Alain%20Wilfried_Houinlindjonon%20(2).pdf?alt=media&token=f5a10ac8-a2a5-40ac-95ae-4112bb234202"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="  border ">Télécharger mon CV</Button>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: "100%" }}
        style={{ width: "800px", height: "800px" }}
        className=" absolute bottom-5 mix-blend-difference bg-white rounded-full -right-20"
      ></motion.div>
    </div>
  );
}

export default HomeSection;
