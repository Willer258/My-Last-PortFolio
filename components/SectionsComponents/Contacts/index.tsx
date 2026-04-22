import AnimateCursorTarget from "@/components/Shared/AnimateCursorTarget";
import ScrollReveal from "@/components/Shared/ScrollReveal";
import { BandeTexteAnimation } from "@/components/Shared/TyperText";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
import { useTranslation } from 'next-i18next';

const GenerativeScene = dynamic(() => import("@/components/Shared/GenerativeScene"), { ssr: false });

const Contacts = () => {
  const { t } = useTranslation('common');
  return (
    <AnimateCursorTarget type="blackBg">
      <section
        className="min-h-dvh place-content-center place-items-center grid bg-surface-dark lg:grid-cols-2 text-white relative overflow-hidden"
        id="contact"
      >
        {/* 3D generative background — replaces video */}
        <div className="absolute inset-0 lg:relative lg:inset-auto z-0 w-full h-full opacity-40 lg:opacity-100">
          <GenerativeScene />
        </div>

        <div className="relative z-10 h-full w-full flex py-10 md:py-24 px-6 md:px-12 items-center md:items-start flex-col space-y-12">
          {/* Questions */}
          <ScrollReveal>
            <div className="flex md:items-start items-center space-y-4 flex-col">
              <BandeTexteAnimation whiteBar className="font-heading text-xl md:text-3xl 2xl:text-4xl font-bold tracking-tightest" text={`${t('contact.question1')} `} />
              <BandeTexteAnimation whiteBar delay={0.5} className="hidden md:inline font-heading text-xl md:text-3xl 2xl:text-4xl font-bold tracking-tightest" text={`${t('contact.question2')}  `} />
              <BandeTexteAnimation whiteBar delay={0.5} className="md:hidden font-heading text-xl font-bold tracking-tightest" text={`${t('contact.question2Mobile1')} `} />
              <BandeTexteAnimation whiteBar delay={0.7} className="md:hidden font-heading text-xl font-bold tracking-tightest" text={`${t('contact.question2Mobile2')} `} />
              <BandeTexteAnimation whiteBar delay={1} className="font-heading text-xl md:text-3xl 2xl:text-4xl font-bold tracking-tightest" text={t('contact.service')} />
            </div>
          </ScrollReveal>

          {/* Contact info — card style */}
          <ScrollReveal delay={0.2}>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 space-y-5 border border-white/5 w-full">
              <h3 className="font-heading text-lg font-bold mb-4">
                <BandeTexteAnimation whiteBar delay={1.5} className="font-heading text-lg font-bold" text={t('contact.coordinates')} />
              </h3>

              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <span className="font-heading text-[10px] tracking-[0.2em] uppercase text-white/40 w-20 shrink-0">{t('contact.email')}</span>
                  <a
                    className="font-body text-sm text-white/80 hover:text-white transition-colors duration-200 underline underline-offset-4 decoration-white/10 hover:decoration-white/40"
                    href="mailto:wilfriedhouinlindjonon91@gmail.com"
                  >
                    wilfriedhouinlindjonon91@gmail.com
                  </a>
                </div>

                <div className="h-px bg-white/5" />

                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <span className="font-heading text-[10px] tracking-[0.2em] uppercase text-white/40 w-20 shrink-0">{t('contact.phone')}</span>
                  <div className="flex flex-col md:flex-row gap-1 md:gap-3">
                    <a className="font-body text-sm text-white/80 hover:text-white transition-colors" href="tel:+2250767668478">+225 07-67-66-84-78</a>
                    <span className="hidden md:inline text-white/20">/</span>
                    <a className="font-body text-sm text-white/80 hover:text-white transition-colors" href="tel:+2250172598212">+225 01-72-59-82-12</a>
                  </div>
                </div>

                <div className="h-px bg-white/5" />

                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <span className="font-heading text-[10px] tracking-[0.2em] uppercase text-white/40 w-20 shrink-0">{t('contact.location')}</span>
                  <span className="font-body text-sm text-white/80">{t('contact.locationValue')}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Social links */}
          <ScrollReveal delay={0.4}>
            <div className="space-y-4">
              <BandeTexteAnimation whiteBar delay={2} className="font-heading text-lg font-bold" text={t('contact.social')} />
              <div className="flex space-x-3">
                <a
                  href="https://github.com/Willer258"
                  rel="noreferrer"
                  target="_blank"
                  className="group h-12 w-12 p-2.5 hover:scale-105 active:scale-95 duration-200 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white border border-white/10 hover:border-white/30 transition-all"
                  aria-label="GitHub profile"
                >
                  <Image src="/social/github.svg" width={100} height={100} className="w-full h-full object-contain invert group-hover:invert-0 transition-all duration-300" alt="GitHub" />
                </a>
                <a
                  href="https://www.linkedin.com/in/alain-wilfried-houinlindjonon-929612247/"
                  rel="noreferrer"
                  target="_blank"
                  className="group h-12 w-12 p-2.5 hover:scale-105 active:scale-95 duration-200 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white border border-white/10 hover:border-white/30 transition-all"
                  aria-label="LinkedIn profile"
                >
                  <Image src="/social/linkedin.svg" width={100} height={100} className="w-full h-full object-contain invert group-hover:invert-0 transition-all duration-300" alt="LinkedIn" />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </AnimateCursorTarget>
  );
};

export default Contacts;
