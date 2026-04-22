import image from "@/assets/profile.jpg";
import ScrollReveal from "@/components/Shared/ScrollReveal";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from 'next-i18next';

const PixelatedCanvas = dynamic(
  () => import("@/components/ui/PixelatedCanvas").then(m => m.PixelatedCanvas),
  { ssr: false }
);

// Each character fades in based on scroll progress
function ScrollRevealText({ text, className, progress }: { text: string; className?: string; progress: any }) {
  const chars = text.split('');
  return (
    <span className={className}>
      {chars.map((char, i) => {
        const start = i / chars.length;
        const end = Math.min(1, start + 1.5 / chars.length);
        return (
          <ScrollChar key={i} char={char} progress={progress} start={start} end={end} />
        );
      })}
    </span>
  );
}

function ScrollChar({ char, progress, start, end }: { char: string; progress: any; start: number; end: number }) {
  const opacity = useTransform(progress, [start, end], [0.1, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {char}
    </motion.span>
  );
}

const Profil = () => {
  const { t } = useTranslation('common');
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Map overall scroll into per-paragraph progress
  const introProgress = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);
  const p1Progress = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const p2Progress = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const p3Progress = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);

  const fullText = [
    t('about.intro'),
    t('about.paragraph1'),
    t('about.paragraph2'),
    t('about.paragraph3'),
  ];

  return (
    <section
      ref={sectionRef}
      id="profil"
      className="max-w-6xl mx-auto py-16 md:py-24 px-4 md:px-8 relative"
    >
      {/* Title */}
      <ScrollReveal>
        <h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tightest mb-12 md:mb-16 section-accent">
          {t('about.title')}
        </h2>
      </ScrollReveal>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        {/* Text — scroll-reveal characters */}
        <div className="lg:w-1/2 space-y-6">
          <p className="font-body text-base md:text-lg text-ink-muted leading-relaxed">
            <ScrollRevealText text={fullText[0]} progress={introProgress} />
          </p>
          <p className="font-body text-base md:text-lg text-ink-muted leading-relaxed">
            <ScrollRevealText text={fullText[1]} progress={p1Progress} />
          </p>
          <p className="font-body text-base md:text-lg text-ink-muted leading-relaxed">
            <ScrollRevealText text={fullText[2]} progress={p2Progress} />
          </p>
          <p className="font-body text-base md:text-lg text-ink-muted leading-relaxed">
            <ScrollRevealText text={fullText[3]} progress={p3Progress} />
          </p>
        </div>

        {/* Photo — sticky while scrolling text */}
        <div className="lg:w-1/2 lg:sticky lg:top-32">
          <ScrollReveal delay={0.2} direction="right">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <PixelatedCanvas
                src={image.src}
                width={600}
                height={600}
                cellSize={3}
                dotScale={0.9}
                shape="square"
                backgroundColor="#0c0c0c"
                dropoutStrength={0.3}
                interactive
                distortionStrength={3}
                distortionRadius={80}
                distortionMode="swirl"
                followSpeed={0.2}
                jitterStrength={4}
                jitterSpeed={4}
                sampleAverage
                tintColor="#FFFFFF"
                tintStrength={0.1}
                objectFit="cover"
                responsive
                className="w-full h-auto"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Profil;
