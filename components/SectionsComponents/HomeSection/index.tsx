import AnimateCursorTarget from "@/components/Shared/AnimateCursorTarget";
import dynamic from "next/dynamic";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import React, { useEffect, useState, useCallback } from "react";
import Button from "../../Shared/Button";
import {
  RetypingTextAnimation,
  TypingAnimation,
} from "@/components/Shared/TyperText";
import { useTranslation } from 'next-i18next';
import { useRecoilState } from "recoil";
import { showProverbs } from "@/utils/atomes";
import { texts as greetingsData } from "@/utils/saluttexte";

const FluidParticles = dynamic(() => import("@/components/Shared/FluidParticles"), { ssr: false });

const easeExpo = [0.16, 1, 0.3, 1] as const;

function HomeSection() {
  const { t } = useTranslation('common');
  const [showText] = useRecoilState(showProverbs);
  const [ready, setReady] = useState(false);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const stateText = greetingsData[greetingIndex];

  // Wait for loading to finish before starting hero animations
  useEffect(() => {
    if (!showText && !ready) {
      // Small delay so the slide-down finishes first
      const timer = setTimeout(() => setReady(true), 400);
      return () => clearTimeout(timer);
    }
  }, [showText, ready]);

  useEffect(() => {
    if (!ready) return;
    const timer = setInterval(() => {
      setGreetingIndex(prev => (prev + 1) % greetingsData.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [ready]);

  // Stagger offsets
  const items = [
    { id: "greeting", delay: 0, y: 30 },
    { id: "name", delay: 0.15, y: 50 },
    { id: "role", delay: 0.35, y: 40 },
    { id: "desc", delay: 0.55, y: 30 },
    { id: "cta", delay: 0.75, y: 25 },
  ];

  return (
    <AnimateCursorTarget type="hidden">
      <section id="home" className="relative min-h-dvh mb-16 xl:mb-0 overflow-hidden">
        {/* Fluid particles — fade in when ready */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 1.5, ease: easeExpo }}
        >
          <FluidParticles
            particleDensity={100}
            particleSize={1}
            particleColor="#555555"
            activeColor="#000000"
            maxBlastRadius={300}
            hoverDelay={1}
            interactionDistance={100}
          />
        </motion.div>

        {/* Decorative line — draws in */}
        <motion.div
          className="absolute left-[15%] top-0 w-px bg-ink/10 z-0 origin-top hidden lg:block"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: ready ? 1 : 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: easeExpo }}
          style={{ height: "100%" }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex justify-start min-h-[85dvh] w-full items-center">
            <div className="space-y-6 md:space-y-8 max-w-2xl">

              {/* Greeting — pop-in letter by letter */}
              <div className="h-8 md:h-10 flex items-center">
                <AnimatePresence mode="wait">
                  {ready && (
                    <motion.span
                      key={stateText}
                      className="italic font-body font-light text-ink-faint text-base md:text-xl tracking-wide inline-flex"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    >
                      {stateText.split('').map((char, i) => (
                        <motion.span
                          key={`${stateText}-${i}`}
                          initial={{ opacity: 0, y: 12, scale: 0.5 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: i * 0.05,
                            ease: [0.34, 1.56, 0.64, 1],
                          }}
                          className="inline-block"
                        >
                          {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                      ))}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Name — large clip reveal */}
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={ready ? { y: 0 } : {}}
                  transition={{ duration: 0.9, delay: items[1].delay, ease: easeExpo }}
                  className="font-heading text-4xl md:text-6xl 2xl:text-7xl font-bold tracking-tightest leading-display"
                >
                  {ready ? <TypingAnimation text={` ${t('home.name')}`} /> : t('home.name')}
                </motion.h1>
              </div>

              {/* Role — clip reveal */}
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: "100%" }}
                  animate={ready ? { y: 0 } : {}}
                  transition={{ duration: 0.8, delay: items[2].delay, ease: easeExpo }}
                >
                  <h2 className="font-heading text-xl md:text-2xl 2xl:text-3xl font-semibold text-ink-muted">
                    {ready ? (
                      <RetypingTextAnimation
                        className="leading-relaxed"
                        words={t('home.roles', { returnObjects: true }) as string[]}
                        text={t('home.title')}
                      />
                    ) : (
                      t('home.title')
                    )}
                  </h2>
                </motion.div>
              </div>

              {/* Description — fade up */}
              <motion.p
                initial={{ opacity: 0, y: items[3].y }}
                animate={ready ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: items[3].delay, ease: easeExpo }}
                className="font-body text-base md:text-lg text-ink-muted leading-relaxed max-w-content"
              >
                {t('home.description')}
              </motion.p>

              {/* CTA buttons — fade up with stagger */}
              <motion.div
                initial={{ opacity: 0, y: items[4].y }}
                animate={ready ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: items[4].delay, ease: easeExpo }}
                className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:space-x-4 pt-2"
              >
                <motion.a
                  href="mailto:wilfriedhouinlindjonon91@gmail.com"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button type="outlined">{t('home.contact')}</Button>
                </motion.a>
                <motion.a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t('home.cvAriaLabel')}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button className="border border-ink/10">{t('home.downloadCV')}</Button>
                </motion.a>
              </motion.div>

            </div>
          </div>
        </div>

        {/* Bottom fade — particles dissolve into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-surface via-surface/80 to-transparent z-[5] pointer-events-none" />

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.2, ease: easeExpo }}
        >
          <span className="font-heading text-[9px] tracking-[0.3em] uppercase text-ink-faint">{t('home.scroll')}</span>
          <motion.div
            className="w-px h-8 bg-ink/20 origin-top"
            animate={ready ? { scaleY: [0, 1, 0] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />
        </motion.div>
      </section>
    </AnimateCursorTarget>
  );
}

export default HomeSection;
