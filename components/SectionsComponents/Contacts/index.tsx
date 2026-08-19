import AnimateCursorTarget from "@/components/Shared/AnimateCursorTarget";
import ScrollReveal from "@/components/Shared/ScrollReveal";
import { BandeTexteAnimation } from "@/components/Shared/TyperText";
import ContactForm from "./ContactForm";
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
        className="min-h-dvh bg-surface-dark text-white relative overflow-hidden"
        id="contact"
      >
        {/* 3D generative background — full-bleed so the glass form blurs it (decorative) */}
        <div className="absolute inset-0 z-0 opacity-40 lg:opacity-90" aria-hidden="true">
          <GenerativeScene />
        </div>
        {/* Readability veil over the scene edges */}
        <div
          className="absolute inset-0 z-0 bg-gradient-to-r from-surface-dark/70 via-transparent to-surface-dark/40 pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto min-h-dvh grid lg:grid-cols-[1fr_1.15fr] gap-10 xl:gap-16 content-center items-center px-4 sm:px-6 md:px-12 py-16 md:py-24">
          {/* Left column — headline, coordinates, social */}
          <div className="flex flex-col items-center md:items-start space-y-10 sm:space-y-12 w-full">
            {/* Questions */}
            <ScrollReveal>
              <div className="flex md:items-start items-center space-y-4 flex-col">
                {/* Single section heading; the remaining lines continue the headline as text */}
                <BandeTexteAnimation whiteBar className="font-heading text-xl md:text-3xl 2xl:text-4xl font-bold tracking-tightest" text={`${t('contact.question1')} `} />
                <BandeTexteAnimation as="p" whiteBar delay={0.5} className="hidden md:inline font-heading text-xl md:text-3xl 2xl:text-4xl font-bold tracking-tightest" text={`${t('contact.question2')}  `} />
                <BandeTexteAnimation as="p" whiteBar delay={0.5} className="md:hidden font-heading text-xl font-bold tracking-tightest" text={`${t('contact.question2Mobile1')} `} />
                <BandeTexteAnimation as="p" whiteBar delay={0.7} className="md:hidden font-heading text-xl font-bold tracking-tightest" text={`${t('contact.question2Mobile2')} `} />
                <BandeTexteAnimation as="p" whiteBar delay={1} className="font-heading text-xl md:text-3xl 2xl:text-4xl font-bold tracking-tightest" text={t('contact.service')} />
              </div>
            </ScrollReveal>

            {/* Contact info — card style */}
            <ScrollReveal delay={0.2} className="w-full">
              <div className="bg-white/[0.04] backdrop-blur-md rounded-xl p-6 space-y-5 border border-white/10 w-full">
                <div className="mb-4">
                  <BandeTexteAnimation as="h3" whiteBar delay={1.5} className="font-heading text-lg font-bold" text={t('contact.coordinates')} />
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <span className="font-heading text-[10px] tracking-[0.2em] uppercase text-white/70 w-20 shrink-0">{t('contact.email')}</span>
                    <a
                      className="font-body text-xs sm:text-sm text-white/80 hover:text-white transition-colors duration-200 underline underline-offset-4 decoration-white/10 hover:decoration-white/40 break-all sm:break-normal"
                      href="mailto:wilfriedhouinlindjonon91@gmail.com"
                    >
                      wilfriedhouinlindjonon91@gmail.com
                    </a>
                  </div>

                  <div className="h-px bg-white/5" />

                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <span className="font-heading text-[10px] tracking-[0.2em] uppercase text-white/70 w-20 shrink-0">{t('contact.phone')}</span>
                    <a className="font-body text-sm text-white/80 hover:text-white transition-colors" href="tel:+2250172598212">+225 01-72-59-82-12</a>
                  </div>

                  <div className="h-px bg-white/5" />

                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <span className="font-heading text-[10px] tracking-[0.2em] uppercase text-white/70 w-20 shrink-0">{t('contact.location')}</span>
                    <span className="font-body text-sm text-white/80">{t('contact.locationValue')}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Social links */}
            <ScrollReveal delay={0.4}>
              <div className="space-y-4">
                <BandeTexteAnimation as="h3" whiteBar delay={2} className="font-heading text-lg font-bold" text={t('contact.social')} />
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

          {/* Right column — wide glass contact form over the scene */}
          <ScrollReveal delay={0.3} className="w-full">
            <ContactForm />
          </ScrollReveal>
        </div>
      </section>
    </AnimateCursorTarget>
  );
};

export default Contacts;
