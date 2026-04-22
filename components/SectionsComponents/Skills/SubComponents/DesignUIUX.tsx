/* eslint-disable @next/next/no-img-element */
import { BandeTexteAnimation, TypingAnimation } from '@/components/Shared/TyperText';
import { motion } from 'framer-motion';
import React from 'react';
import FIGMA from "@/assets/images/icons/Design/figma.svg";
import CANVA from "@/assets/images/icons/Design/canva.svg";

const tools = [
  { name: "Figma", icon: FIGMA.src },
  { name: "Canva", icon: CANVA.src },
];

const perf = [
  { title: "Créativité", niv: 60 },
  { title: "Compréhension UX", niv: 50 },
  { title: "Design esthétique", niv: 40 },
  { title: "Collaboration", niv: 60 },
  { title: "Analytique", niv: 30 },
  { title: "Connaissances techniques", niv: 40 },
];

function DesignUIUX() {
  return (
    <div className="flex flex-col 2xl:space-y-10 py-4 2xl:py-10">
      <div className="grid lg:grid-cols-2 gap-y-5 lg:gap-x-16 mb-10">
        <div className="flex flex-col items-start space-y-5">
          <BandeTexteAnimation whiteBar className="font-heading text-2xl font-bold" text="Description" />
          <TypingAnimation duration={3} className="font-body text-sm text-white/80 leading-relaxed" text="En tant que designer UI/UX débutant, je suis curieux et je souhaite découvrir le monde de la conception d'interfaces utilisateur. J'utilise Figma comme outil privilégié pour explorer et expérimenter la création de designs. Je suis ouvert à l'apprentissage des meilleures pratiques en matière de design et d'expérience utilisateur, afin de développer mes compétences dans la conception d'interfaces attrayantes et fonctionnelles. Je suis enthousiaste à l'idée d'explorer ce domaine et de collaborer avec d'autres professionnels pour créer des expériences utilisateur convaincantes. Mon objectif est de développer mon talent et de contribuer à la création d'interfaces intuitives et agréables pour les utilisateurs." />
        </div>
        <div className="flex flex-col items-start space-y-5">
          <BandeTexteAnimation whiteBar className="font-heading text-2xl font-bold" text="Performances" />
          <div className="flex flex-col w-full space-y-4">
            {perf.map((item, index) => (
              <div className="flex flex-col space-y-1.5" key={index}>
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, ease: "easeOut" }}
                  className="font-heading text-xs font-semibold tracking-wider text-white/60"
                >
                  {item.title}
                </motion.span>
                <div className="w-full bg-white/10 rounded-full h-1.5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.niv}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                    className="bg-white rounded-full h-1.5"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-center font-heading text-xl font-bold tracking-wide">Arsenal</h4>
        <div className="grid gap-8 mt-8 lg:mt-4 place-items-center grid-cols-2 md:grid-cols-3 lg:flex items-center justify-center my-3 2xl:my-8 lg:space-x-8">
          {tools.map((tool, index) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="h-16 w-16"
              key={index}
            >
              <img className="object-contain w-full h-full hover:scale-110 duration-200" src={tool.icon} alt={tool.name} loading="lazy" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DesignUIUX;
