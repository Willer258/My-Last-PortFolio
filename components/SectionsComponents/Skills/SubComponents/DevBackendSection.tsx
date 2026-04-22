/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import React from "react";
import PHP from "@/assets/images/icons/devBackend/php.svg";
import SYMFONY from "@/assets/images/icons/devBackend/symfony.svg";
import MYSQL from "@/assets/images/icons/devBackend/mysql.svg";
import POSTGRESQL from "@/assets/images/icons/devBackend/postgresql.svg";

const stack = [
  { name: "PHP", icon: PHP.src },
  { name: "Symfony", icon: SYMFONY.src },
  { name: "MySQL", icon: MYSQL.src },
  { name: "PostgreSQL", icon: POSTGRESQL.src },
];

const perf = [
  { title: "API REST", niv: 75 },
  { title: "Base de données", niv: 70 },
  { title: "Architecture MVC", niv: 70 },
  { title: "Sécurité", niv: 60 },
  { title: "Testing", niv: 50 },
  { title: "Déploiement", niv: 55 },
];

function DevBackendSection() {
  return (
    <div className="flex flex-col 2xl:space-y-10 py-4 2xl:py-10">
      <div className="grid lg:grid-cols-2 gap-y-5 lg:gap-x-16 mb-10">
        <div className="flex flex-col items-start space-y-5">
          <h3 className="font-heading text-2xl font-bold">Stack</h3>
          <div className="grid grid-cols-2 gap-4 w-full">
            {stack.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                className="flex items-center space-x-3 bg-white/5 rounded-lg p-3"
              >
                <img src={item.icon} alt={item.name} className="w-10 h-10 object-contain" loading="lazy" />
                <span className="font-heading text-sm font-semibold">{item.name}</span>
              </motion.div>
            ))}
          </div>
          <p className="font-body text-sm text-white/70 leading-relaxed">
            {"Conception d'API REST avec Symfony, gestion de bases de données relationnelles avec Doctrine ORM, authentification JWT, et architecture en couches pour des applications web robustes et maintenables."}
          </p>
        </div>
        <div className="flex flex-col items-start space-y-5">
          <h3 className="font-heading text-2xl font-bold">Aptitudes</h3>
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
    </div>
  );
}

export default DevBackendSection;
