import { BandeTexteAnimation, TypingAnimation } from '@/components/Shared/TyperText';
import { motion } from 'framer-motion';
import React from 'react'


import ASANA from "@/assets/images/icons/autres/asana.svg";
import DOCKER from "@/assets/images/icons/autres/docker.svg";
import FIREBASE from "@/assets/images/icons/autres/firebase.svg";
import NETLIFY from "@/assets/images/icons/autres/netilfy.svg";
import VERCEL from "@/assets/images/icons/autres/vercel.svg";
import WORDPESS from "@/assets/images/icons/autres/wordpress.svg";
import OPENAI from "@/assets/images/icons/autres/openai.svg";
function Autres() {
    const tools = [
        {
          name: "ASANA",
          icon: ASANA.src,
        },
        {
          name: "DOCKER",
          icon: DOCKER.src,
        },
        {
          name: "FIREBASE",
          icon: FIREBASE.src,
        },
        {
          name: "NETLIFY",
          icon: NETLIFY.src,
        },
        {
          name: "VERCEL",
          icon: VERCEL.src,
        },
        {
          name: "WORDPESS",
          icon: WORDPESS.src,
        },
        {
          name: "OPENAI",
          icon: OPENAI.src,
        },
        
      ];
    
   
      const performance = [
          {
            title: "Hosting",
            niv: 30,
          },
          {
            title: "Web mastering WordPress",
            niv: 60,
          },
          {
            title: "Community manager",
            niv: 20,
          },
          {
            title: "Scrum mastering",
            niv: 40,
          },
          {
            title: "Devellopement Backend",
            niv: 40,
          },
          {
            title: "Graphisme",
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
                text="Même en tant que développeur, j'ai eu l'occasion d'experimenté d'autres métiers du web. Au-delà de mes compétences de base en développement, j'ai été amené à toucher à différents domaines connexes. Par exemple, j'ai pu m'intéresser à la conception d'interfaces utilisateur (UI) et à l'expérience utilisateur (UX), en cherchant à comprendre comment créer des interfaces attrayantes et intuitives. J'ai également pu acquérir des connaissances en matière de gestion de projet, de tests et d'optimisation des performances pour garantir des applications web de haute qualité. Cette diversité de compétences m'a permis d'avoir une vision plus complète du processus de développement web et d'être plus polyvalent dans mon travail."
              />
            </div>
            <div className="flex flex-col items-start space-y-5 ">
              <BandeTexteAnimation
                whiteBar
                className="text-2xl font-bold"
                text="Autres Aptitudes"
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
              Autres outils
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

export default Autres