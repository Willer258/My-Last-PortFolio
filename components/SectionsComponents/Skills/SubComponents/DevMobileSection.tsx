/* eslint-disable @next/next/no-img-element */
import { BandeTexteAnimation, TypingAnimation } from "@/components/Shared/TyperText";
import { motion } from "framer-motion";
import React from "react";
import DART from "@/assets/images/icons/devMobile/language/dart.svg";
import FLUTTER from "@/assets/images/icons/devMobile/framework/flutter.svg";

const languages = [
  { name: "Dart", icon: DART.src },
  { name: "Flutter", icon: FLUTTER.src },
];

const perf = [
  { title: "Integration", niv: 80 },
  { title: "Call API", niv: 70 },
  { title: "Testing", niv: 50 },
  { title: "Documentation", niv: 50 },
  { title: "Amelioration", niv: 70 },
  { title: "Maintenance", niv: 70 },
];

function DevMobileSection() {
  return (
    <div className="flex flex-col 2xl:space-y-10 py-4 2xl:py-10">
      <div className="grid lg:grid-cols-2 gap-y-5 lg:gap-x-16 mb-10">
        <div className="flex flex-col items-start space-y-5">
          <BandeTexteAnimation whiteBar className="font-heading text-2xl font-bold" text="Description" />
          <TypingAnimation duration={3} className="font-body text-sm text-white/80 leading-relaxed" text="En tant que développeur mobile passionné, je me spécialise dans l'utilisation de Dart et Flutter comme langage et framework de prédilection. Grâce à Flutter, je peux créer des interfaces utilisateur fluides et attrayantes pour les applications mobiles. J'apprécie la polyvalence de Flutter, qui me permet de développer des applications multiplateformes avec une seule base de code. En utilisant Dart, j'écris un code clair et efficace, ce qui facilite le développement d'applications mobiles réactives et performantes. Mon objectif est de créer des applications mobiles de haute qualité en utilisant les dernières tendances et les meilleures pratiques, tout en offrant une expérience utilisateur exceptionnelle." />
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
          {languages.map((language, index) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="h-16 w-16"
              key={index}
            >
              <img className="object-contain w-full h-full hover:scale-110 duration-200" src={language.icon} alt={language.name} loading="lazy" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DevMobileSection;
