/* eslint-disable @next/next/no-img-element */

import React from "react";
import HTML5 from "@/assets/images/icons/devWeb/lang/html5.png";
import CSS3 from "@/assets/images/icons/devWeb/lang/css-3.png";
import JS from "@/assets/images/icons/devWeb/lang/js.png";
import TS from "@/assets/images/icons/devWeb/lang/typescript.png";
import REACTJS from "@/assets/images/icons/devWeb/framework/atom.png";
import NEXTJS from "@/assets/images/icons/devWeb/framework/nextjs.svg";
import VUEJS from "@/assets/images/icons/devWeb/framework/vuejs.svg";


import {
  BandeTexteAnimation,
  TypingAnimation,
} from "@/components/Shared/TyperText";
import { motion } from "framer-motion";

function DevWebSection() {
  const languages = [
    {
      name: "HTML5",
      icon: HTML5.src,
    },
    {
      name: "CSS3",
      icon: CSS3.src,
    },
    {
      name: "JavaScript",
      icon: JS.src,
    },
    {
      name: "Typescript",
      icon: TS.src,
    },
    {
      name: "Reactjs",
      icon: REACTJS.src,
    },
    {
      name: "Nextjs",
      icon: NEXTJS.src,
    },
    {
      name: "VUEjs",
      icon: VUEJS.src,
    },
  ];

  const performance = [
    {
      title: "Integration",
      niv: 85,
    },
    {
      title: "Call API",
      niv: 80,
    },
    {
      title: "Testing",
      niv: 50,
    },
    {
      title: "Documentation",
      niv: 60,
    },
    {
      title: "Amelioration",
      niv: 70,
    },
    {
      title: "Maintenance",
      niv: 80,
    },
  ];

  return (
    <div className=" flex flex-col 2xl:space-y-10 py-3 2xl:py-10">
      <div className=" grid lg:grid-cols-2 gap-y-5 lg:gap-x-20 mb-10">
        <div className="flex flex-col items-start space-y-5  ">
          <BandeTexteAnimation
            whiteBar
            className="text-2xl font-bold"
            text="Description"
          />
          <TypingAnimation
            duration={3}
            className="text-base"
            text="En tant que développeur web spécialisé en React.js et Next.js, j'ai acquis une solide expertise dans la création d'interfaces utilisateur modernes et réactives. Je suis passionné par le développement web et je m'efforce d'offrir des expériences utilisateur fluides et performantes. Grâce à React.js, je peux facilement organiser et gérer l'état de mes applications, tandis que Next.js me permet de créer des applications évolutives avec des fonctionnalités avancées telles que le rendu côté serveur. Je suis constamment à l'affût des dernières tendances et des meilleures pratiques pour offrir des solutions web de haute qualité."
          />
        </div>
        <div className="flex flex-col items-start space-y-5 ">
          <BandeTexteAnimation
            whiteBar
            className="text-2xl font-bold"
            text="Performances"
          />
          <div className="flex flex-col w-full space-y-4">
            {performance.map((item, index) => (
              <div className="flex flex-col space-y-2 " key={index}>
                <div className="overflow-hidden">
                  <motion.div
                    initial={{ y: -20 }}
                    animate={{ y: 0, transition: { delay: index * 0.5 } }}
                  >
                    <motion.span className="uppercase font-semibold">
                      {item.title}
                    </motion.span>
                  </motion.div>
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${item.niv}%`,
                    transition: { delay: index * 0.5 },
                  }}
                  className={`bg-white rounded h-2`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* language */}

      <div>
        <div className="overflow-hidden">
          <motion.h4
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-center text-2xl font-bold uppercase "
          >
           Arsenal
          </motion.h4>
        </div>

        <div className=" grid gap-10 mt-10 lg:mt-0 place-items-center grid-cols-2 md:grid-cols-3 lg:flex items-center justify-center my-3 2xl:my-10 lg:space-x-10">
          {languages.map((language, index) => (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, transition: { delay: index * 0.3 } }}
              className="h-20 w-20"
              key={index}
            >
              <img
                className="object-contain w-full h-full hover:scale-125 duration-300"
                src={language.icon}
                alt={language.name}
              />
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default DevWebSection;
