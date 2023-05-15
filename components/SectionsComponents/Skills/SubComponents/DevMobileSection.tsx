/* eslint-disable @next/next/no-img-element */
import {
  BandeTexteAnimation,
  TypingAnimation,
} from "@/components/Shared/TyperText";
import { motion } from "framer-motion";
import React from "react";

import DART from "@/assets/images/icons/devMobile/language/dart.svg";

import FLUTTER from "@/assets/images/icons/devMobile/framework/flutter.svg";
function DevMobileSection() {
  const languages = [
    {
      name: "DART",
      icon: DART.src,
    },
    {
      name: "Flutter",
      icon: FLUTTER.src,
    },
  ];

  const performance = [
    {
      title: "Integration",
      niv: 80,
    },
    {
      title: "Call API",
      niv: 70,
    },
    {
      title: "Testing",
      niv: 50,
    },
    {
      title: "Documentation",
      niv: 50,
    },
    {
      title: "Amelioration",
      niv: 70,
    },
    {
      title: "Maintenance",
      niv: 70,
    },
  ];

  return (
    <div className=" flex flex-col space-y-10 py-10">
      <div className=" grid grid-cols-2 gap-x-20 mb-10">
        <div className="flex flex-col items-start space-y-5  ">
          <BandeTexteAnimation
            whiteBar
            className="text-2xl font-bold"
            text="Description"
          />
          <TypingAnimation
            duration={3}
            className="text-base"
            text="En tant que développeur mobile passionné, je me spécialise dans l'utilisation de Dart et Flutter comme langage et framework de prédilection. Grâce à Flutter, je peux créer des interfaces utilisateur fluides et attrayantes pour les applications mobiles. J'apprécie la polyvalence de Flutter, qui me permet de développer des applications multiplateformes avec une seule base de code. En utilisant Dart, j'écris un code clair et efficace, ce qui facilite le développement d'applications mobiles réactives et performantes. Mon objectif est de créer des applications mobiles de haute qualité en utilisant les dernières tendances et les meilleures pratiques, tout en offrant une expérience utilisateur exceptionnelle."
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

        <div className="flex items-center justify-center my-10 space-x-10">
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

export default DevMobileSection;
