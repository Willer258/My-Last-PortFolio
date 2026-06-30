/* eslint-disable @next/next/no-img-element */
import { motion } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'next-i18next';
import ASANA from "@/assets/images/icons/autres/asana.svg";
import DOCKER from "@/assets/images/icons/autres/docker.svg";
import FIREBASE from "@/assets/images/icons/autres/firebase.svg";
import NETLIFY from "@/assets/images/icons/autres/netilfy.svg";
import VERCEL from "@/assets/images/icons/autres/vercel.svg";
import WORDPESS from "@/assets/images/icons/autres/wordpress.svg";
import OPENAI from "@/assets/images/icons/autres/openai.svg";

const toolGroups = [
  {
    categoryKey: "skills.hostingCategory",
    items: [
      { name: "Vercel", icon: VERCEL.src },
      { name: "Netlify", icon: NETLIFY.src },
      { name: "Firebase", icon: FIREBASE.src },
      { name: "Docker", icon: DOCKER.src },
    ],
  },
  {
    categoryKey: "skills.managementCategory",
    items: [
      { name: "Asana", icon: ASANA.src },
      { name: "WordPress", icon: WORDPESS.src },
      { name: "OpenAI", icon: OPENAI.src },
    ],
  },
];

function Autres() {
  const { t } = useTranslation('common');
  const practices = t('skills.practices', { returnObjects: true }) as string[];

  return (
    <div className="flex flex-col space-y-10 py-4 2xl:py-10">
      <div className="grid lg:grid-cols-2 gap-y-8 lg:gap-x-16">
        {toolGroups.map((group, gi) => (
          <div key={gi} className="flex flex-col items-start space-y-4">
            <h3 className="font-heading text-lg font-bold text-white/90">{t(group.categoryKey)}</h3>
            <div className="grid grid-cols-2 gap-3 w-full">
              {group.items.map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                  className="flex items-center space-x-3 bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors duration-200"
                >
                  <img src={tool.icon} alt={tool.name} className="w-8 h-8 object-contain" loading="lazy" />
                  <span className="font-heading text-sm font-medium">{tool.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-heading text-lg font-bold text-white/90 mb-4">{t('skills.bestPractices')}</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {practices.map((practice, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="bg-white/5 rounded-lg px-3 py-2 text-center"
            >
              <span className="font-body text-xs text-white/70">{practice}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Autres;
