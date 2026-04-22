/* eslint-disable @next/next/no-img-element */
import React from "react";
import { BandeTexteAnimation } from "@/components/Shared/TyperText";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/Shared/ScrollReveal";
import TiltCard from "@/components/Shared/TiltCard";
import { useTranslation } from 'next-i18next';

import HTML5 from "@/assets/images/icons/devWeb/lang/html5.png";
import CSS3 from "@/assets/images/icons/devWeb/lang/css-3.png";
import JS from "@/assets/images/icons/devWeb/lang/js.png";
import TS from "@/assets/images/icons/devWeb/lang/typescript.png";
import REACTJS from "@/assets/images/icons/devWeb/framework/atom.png";
import NEXTJS from "@/assets/images/icons/devWeb/framework/nextjs.svg";
import VUEJS from "@/assets/images/icons/devWeb/framework/vuejs.svg";
import DART from "@/assets/images/icons/devMobile/language/dart.svg";
import FLUTTER from "@/assets/images/icons/devMobile/framework/flutter.svg";
import FIGMA from "@/assets/images/icons/Design/figma.svg";
import CANVA from "@/assets/images/icons/Design/canva.svg";
import PHP from "@/assets/images/icons/devBackend/php.svg";
import SYMFONY from "@/assets/images/icons/devBackend/symfony.svg";
import MYSQL from "@/assets/images/icons/devBackend/mysql.svg";
import POSTGRESQL from "@/assets/images/icons/devBackend/postgresql.svg";
import DOCKER from "@/assets/images/icons/autres/docker.svg";
import FIREBASE from "@/assets/images/icons/autres/firebase.svg";
import VERCEL from "@/assets/images/icons/autres/vercel.svg";
import NETLIFY from "@/assets/images/icons/autres/netilfy.svg";

const frontend = [
  { name: "HTML5", icon: HTML5.src },
  { name: "CSS3", icon: CSS3.src },
  { name: "JavaScript", icon: JS.src },
  { name: "TypeScript", icon: TS.src },
  { name: "React", icon: REACTJS.src },
  { name: "Next.js", icon: NEXTJS.src },
  { name: "Vue.js", icon: VUEJS.src },
];

const backend = [
  { name: "PHP", icon: PHP.src },
  { name: "Symfony", icon: SYMFONY.src },
  { name: "MySQL", icon: MYSQL.src },
  { name: "PostgreSQL", icon: POSTGRESQL.src },
];

const mobile = [
  { name: "Dart", icon: DART.src },
  { name: "Flutter", icon: FLUTTER.src },
];

const design = [
  { name: "Figma", icon: FIGMA.src },
  { name: "Canva", icon: CANVA.src },
];

const devops = [
  { name: "Docker", icon: DOCKER.src },
  { name: "Firebase", icon: FIREBASE.src },
  { name: "Vercel", icon: VERCEL.src },
  { name: "Netlify", icon: NETLIFY.src },
];

const practices = [
  "Git & GitHub",
  "REST API",
  "Clean Code",
  "Testing",
  "SEO",
  "Scrum",
  "Responsive",
  "CI/CD",
];

const IconGrid = ({ items, delay = 0 }: { items: { name: string; icon: string }[]; delay?: number }) => (
  <div className="flex flex-wrap gap-4 mt-4">
    {items.map((item, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: delay + i * 0.06, duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        className="group flex flex-col items-center gap-2"
      >
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white/5 hover:bg-white/10 p-2.5 transition-all duration-200 hover:scale-105">
          <img src={item.icon} alt={item.name} className="w-full h-full object-contain" loading="lazy" />
        </div>
        <span className="font-heading text-[10px] tracking-wider text-white/40 group-hover:text-white/70 transition-colors">
          {item.name}
        </span>
      </motion.div>
    ))}
  </div>
);

const Skills = () => {
  const { t } = useTranslation('common');

  return (
    <section className="my-12 lg:my-20 max-w-6xl mx-auto px-4 md:px-8" id="skills">
      <ScrollReveal>
        <div className="flex lg:justify-center mb-16">
          <div className="section-accent">
            <BandeTexteAnimation
              noLine
              className="font-heading text-2xl md:text-4xl font-bold tracking-tightest"
              text={` ${t('skills.title')}`}
            />
          </div>
        </div>
      </ScrollReveal>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">

        {/* Frontend — large card */}
        <ScrollReveal className="lg:col-span-7">
          <TiltCard intensity={4} className="relative bg-surface-dark rounded-2xl p-6 md:p-8 h-full min-h-[280px] overflow-hidden">
            <div className="relative z-10">
              <span className="font-heading text-xs tracking-[0.2em] text-white/30 uppercase">Frontend</span>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mt-2 tracking-tightest">
                React, Next.js & Vue
              </h3>
              <p className="font-body text-sm text-white/50 mt-3 max-w-md leading-relaxed">
                {"Interfaces modernes, réactives et performantes. Du composant au déploiement."}
              </p>
              <IconGrid items={frontend} delay={0.1} />
            </div>
            {/* Decorative gradient */}
            <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-white/[0.02] blur-3xl" />
          </TiltCard>
        </ScrollReveal>

        {/* Backend — medium card */}
        <ScrollReveal delay={0.1} className="lg:col-span-5">
          <TiltCard intensity={4} className="relative bg-surface-dark rounded-2xl p-6 md:p-8 h-full min-h-[280px] overflow-hidden">
            <div className="relative z-10">
              <span className="font-heading text-xs tracking-[0.2em] text-white/30 uppercase">Backend</span>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mt-2 tracking-tightest">
                PHP & Symfony
              </h3>
              <p className="font-body text-sm text-white/50 mt-3 leading-relaxed">
                {"API REST, Doctrine ORM, MySQL & PostgreSQL."}
              </p>
              <IconGrid items={backend} delay={0.15} />
            </div>
            <div className="absolute -left-16 -top-16 w-48 h-48 rounded-full bg-white/[0.02] blur-3xl" />
          </TiltCard>
        </ScrollReveal>

        {/* Mobile — small card */}
        <ScrollReveal delay={0.15} className="lg:col-span-3">
          <TiltCard intensity={5} className="relative bg-surface-dark rounded-2xl p-6 h-full min-h-[220px] overflow-hidden">
            <div className="relative z-10">
              <span className="font-heading text-xs tracking-[0.2em] text-white/30 uppercase">Mobile</span>
              <h3 className="font-heading text-xl font-bold text-white mt-2 tracking-tightest">
                Flutter
              </h3>
              <IconGrid items={mobile} delay={0.2} />
            </div>
          </TiltCard>
        </ScrollReveal>

        {/* Design — small card */}
        <ScrollReveal delay={0.2} className="lg:col-span-3">
          <TiltCard intensity={5} className="relative bg-surface-dark rounded-2xl p-6 h-full min-h-[220px] overflow-hidden">
            <div className="relative z-10">
              <span className="font-heading text-xs tracking-[0.2em] text-white/30 uppercase">Design</span>
              <h3 className="font-heading text-xl font-bold text-white mt-2 tracking-tightest">
                UI/UX
              </h3>
              <IconGrid items={design} delay={0.25} />
            </div>
          </TiltCard>
        </ScrollReveal>

        {/* DevOps + Practices — wide card */}
        <ScrollReveal delay={0.25} className="lg:col-span-6">
          <TiltCard intensity={3} className="relative bg-surface-dark rounded-2xl p-6 md:p-8 h-full min-h-[220px] overflow-hidden">
            <div className="relative z-10">
              <span className="font-heading text-xs tracking-[0.2em] text-white/30 uppercase">{"Outils & Pratiques"}</span>
              <div className="flex flex-col md:flex-row md:gap-10 mt-4">
                <div>
                  <IconGrid items={devops} delay={0.3} />
                </div>
                <div className="mt-6 md:mt-0">
                  <div className="flex flex-wrap gap-2 mt-4">
                    {practices.map((p, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.35 + i * 0.04, duration: 0.3 }}
                        className="font-body text-[11px] text-white/50 bg-white/5 hover:bg-white/10 rounded-full px-3 py-1.5 transition-colors duration-200"
                      >
                        {p}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-white/[0.02] blur-3xl" />
          </TiltCard>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default Skills;
