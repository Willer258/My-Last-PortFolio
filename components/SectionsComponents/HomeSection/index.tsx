/* eslint-disable react/no-unescaped-entities */
import AnimateCursorTarget from "@/components/Shared/AnimateCursorTarget";
import Logo from "@/components/Shared/Logo";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Button from "../../Shared/Button";
import {
  RetypingTextAnimation,
  TypingAnimation,
} from "@/components/Shared/TyperText";
import { useTranslation } from 'next-i18next';

function HomeSection() {
  const { t } = useTranslation('common');
  const greetings = t('home.greetings', { returnObjects: true }) as string[];
  const [stateText, setStateText] = useState(greetings[0]);

  useEffect(() => {
    setTimeout(() => {
      setStateText(greetings[Math.floor(Math.random() * greetings.length)]);
    }, 5000);
  }, [stateText, greetings]);


  return (
    <div id="home" className="  relative md:h-screen mb-16 xl:mb-0 lg:w-5/6 2xl:w-3/4 mx-auto px-2 md:px-5">
      <motion.div
        initial={{ width: 0, height: 0 }}
        animate={{ width: '25vw', height: '25vw' }}
        style={{ animationDuration: "30s" }}
        className=" hidden lg:block absolute animate-spin animate-duration-2000 rounded-xl mix-blend-difference  lg:-top-[150px] bg-white  lg:-left-[20px] 2xl:-left-[120px] z-0"
      />

<Logo className="w-32 h-32 invisible md:visible right-0 " />

      <Logo className="w-32 h-32 absolute right-0 top-0 md:hidden" />
     
      <div className="flex justify-start md:h-full w-full items-center">
        <div className="space-y-5 md:space-y-8">
          <AnimateCursorTarget type="text">
            <motion.div
              key={stateText}
              initial={{ opacity: 0.5, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <motion.span className="italic font-thin text-lg md:text-2xl">
                {stateText} !!!
              </motion.span>
            </motion.div>
          </AnimateCursorTarget>

          <AnimateCursorTarget type="text">
            <motion.h1
              initial={{ y: "50vh" }}
              animate={{ y: 0 }}
              className=" text-3xl md:text-5xl 2xl:text-6xl"
            >
              <TypingAnimation text={` ${t('home.name')}`} />
            </motion.h1>
          </AnimateCursorTarget>

          <AnimateCursorTarget type="text">
            <h2 className=" text-xl md:text-2xl 2xl:text-4xl font-bold ">
                <RetypingTextAnimation
                  className={'leading-relaxed'}
                  words={t('home.roles', { returnObjects: true }) as string[]}
                  text={t('home.title')}
                />
            </h2>
          </AnimateCursorTarget>

          <AnimateCursorTarget type="text">
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: "100%" }}
              className="2xl:text-lg w-5/6"
            >
              {t('home.description')}
            </motion.p>
          </AnimateCursorTarget>

          <div className="flex flex-col  space-y-3 md:space-y-0 md:flex-row md:space-x-3">
            <motion.div initial={{ scale: 0 }} animate={{ scale: "100%" }}>
              <motion.a
                animate={{ scale: "100%" }}
                href="mailto:wilfriedhouinlindjonon91@gmail.com"
              >
                <Button type="outlined">{t('home.contact')}</Button>
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
                href="https://firebasestorage.googleapis.com/v0/b/mon-portfolio-7cb39.appspot.com/o/HOUINLINDJONON%20ALAIN%20WILFRIED.pdf?alt=media&token=ac38d6b1-5d08-42bc-8f70-ee4fca0f9658"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="  border ">{t('home.downloadCV')}</Button>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
      
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: "100%" }}
        style={{ width: "40vw", height: "40vw" }}
        className=" absolute bottom-5 hidden lg:block mix-blend-difference bg-white rounded-full -right-20"
      />
    </div>
  );
}

export default HomeSection;
