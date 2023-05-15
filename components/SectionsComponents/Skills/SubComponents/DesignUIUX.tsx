/* eslint-disable @next/next/no-img-element */
import { BandeTexteAnimation, TypingAnimation } from '@/components/Shared/TyperText';
import { motion } from 'framer-motion';
import React from 'react'

import FIGMA from "@/assets/images/icons/design/figma.svg";


import CANVA from "@/assets/images/icons/design/canva.svg";
function DesignUIUX() {
    const tools = [
      {
        name: "FIGMA",
        icon: FIGMA.src,
      },
      {
        name: "CANVA",
        icon: CANVA.src,
      },
    ];
  
 
    const performance = [
        {
          title: "Créativité",
          niv: 60,
        },
        {
          title: "Compréhension UX",
          niv: 50,
        },
        {
          title: "Design esthétique",
          niv: 40,
        },
        {
          title: "Collaboration",
          niv: 60,
        },
        {
          title: "Analytique",
          niv: 30,
        },
        {
          title: "Connaissances techniques",
          niv: 40,
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
              text="En tant que designer UI/UX débutant, je suis curieux et je souhaite découvrir le monde de la conception d'interfaces utilisateur. J'utilise Figma comme outil privilégié pour explorer et expérimenter la création de designs. Je suis ouvert à l'apprentissage des meilleures pratiques en matière de design et d'expérience utilisateur, afin de développer mes compétences dans la conception d'interfaces attrayantes et fonctionnelles. Je suis enthousiaste à l'idée d'explorer ce domaine et de collaborer avec d'autres professionnels pour créer des expériences utilisateur convaincantes. Mon objectif est de développer mon talent et de contribuer à la création d'interfaces intuitives et agréables pour les utilisateurs."
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

        {/* Framework */}
  
        <div>
          <motion.h4
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-center text-2xl font-bold uppercase"
          >
            Arsenal
          </motion.h4>
          <div className="flex items-center justify-center my-10 space-x-10">
            {tools.map((tools, index) => (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, transition: { delay: index * 0.3 } }}
                className="h-20 w-20"
                key={index}
              >
                <img
                  className="object-contain w-full h-full hover:scale-125 duration-300"
                  src={tools.icon}
                  alt={tools.name}
                />
              </motion.div>
            ))}
          </div>
        </div>
  
   
      </div>
    );
}

export default DesignUIUX