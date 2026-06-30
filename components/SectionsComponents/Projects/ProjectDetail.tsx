/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslation } from "next-i18next";
import ImageCarousel from "@/components/Shared/ImageCarousel";
import ProjectMockup from "./ProjectMockup";
import { IProject } from "@/utils/projects";

const typeLabels: Record<string, string> = {
  web: "Web",
  mobile: "Mobile",
  design: "Design",
  fullstack: "Fullstack",
};

interface ProjectDetailProps {
  project: IProject | null;
  onClose: () => void;
}

export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  const { t } = useTranslation("common");
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const open = !!project;

  // Esc closes the dialog + focus trap
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement as HTMLElement;
    document.addEventListener("keydown", onKeyDown);
    // lock page scroll + pause Lenis smooth scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const lenis = (window as unknown as { __lenis?: { stop?: () => void; start?: () => void } }).__lenis;
    lenis?.stop?.();
    // focus the dialog after mount
    const id = window.setTimeout(() => closeRef.current?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      lenis?.start?.();
      window.clearTimeout(id);
      lastFocused.current?.focus?.();
    };
  }, [open, onKeyDown]);

  const ease = [0.22, 1, 0.36, 1] as const;
  const hasShots = !!project?.screenshots && project.screenshots.length > 0;

  // Staggered entrance for the presentation blocks
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } };
  const item = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } } };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.3 }}
          aria-hidden={false}
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label={t("projects.detail.close")}
            onClick={onClose}
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm cursor-default"
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-detail-title"
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
            initial={reduce ? { opacity: 0 } : { y: "100%" }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            exit={reduce ? { opacity: 0 } : { y: "100%" }}
            transition={{ duration: reduce ? 0 : 0.55, ease }}
            className="relative z-10 w-full h-[94vh] bg-surface text-ink overflow-y-auto shadow-2xl shadow-ink/40 rounded-t-3xl"
          >
            {/* Top bar: drag handle + sticky close */}
            <div className="sticky top-0 z-30 flex items-center justify-center pt-3.5 pb-3 bg-surface/85 backdrop-blur-md">
              <div className="h-1.5 w-12 rounded-full bg-ink/15" aria-hidden="true" />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label={t("projects.detail.close")}
                className="absolute right-4 top-2.5 w-10 h-10 rounded-full bg-ink/5 hover:bg-ink/10 text-ink flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <motion.div variants={container} initial="hidden" animate="show">
              {/* Gallery hero — shows the FULL image (landscape full-width, mobile contained) */}
              <motion.div variants={item} className="relative bg-surface-dark">
                <span className="absolute top-4 left-4 z-20 font-heading text-[10px] tracking-[0.2em] uppercase text-white/90 bg-ink/45 backdrop-blur-sm rounded-full px-3 py-1.5 pointer-events-none">
                  {t("projects.detail.preview")}
                </span>
                {hasShots ? (
                  project.type === "mobile" ? (
                    <ImageCarousel
                      images={project.screenshots!}
                      alt={project.title}
                      autoPlay={false}
                      controlsAlwaysVisible
                      portrait
                      className="w-full h-[58vh] sm:h-[64vh]"
                    />
                  ) : (
                    <ImageCarousel
                      images={project.screenshots!}
                      alt={project.title}
                      autoPlay={false}
                      controlsAlwaysVisible
                      className="w-full h-auto"
                    />
                  )
                ) : (
                  <div className="w-full h-[42vh] flex items-center justify-center p-6 sm:p-10">
                    <ProjectMockup type={project.type} title={project.title} stack={project.stack} />
                  </div>
                )}
              </motion.div>

              {/* Content — main column + meta sidebar */}
              <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 py-10 sm:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
                  {/* Main */}
                  <div className="lg:col-span-2 flex flex-col gap-9">
                    <motion.div variants={item} className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <span className="font-heading text-[10px] tracking-[0.2em] uppercase text-ink-muted bg-ink/5 rounded-full px-3 py-1">
                          {typeLabels[project.type]}
                        </span>
                        {project.company && (
                          <span className="font-heading text-[10px] tracking-wider text-ink-muted">{project.company}</span>
                        )}
                      </div>
                      <h3
                        id="project-detail-title"
                        className="font-heading text-4xl md:text-5xl font-bold tracking-tightest leading-[1.02]"
                      >
                        {project.title}
                      </h3>
                      <p className="font-body text-base md:text-lg text-ink-muted leading-relaxed">{project.description}</p>
                    </motion.div>

                    {project.problem && (
                      <motion.section variants={item} className="flex flex-col gap-2">
                        <h4 className="font-heading text-xs tracking-[0.15em] uppercase text-ink-faint">{t("projects.detail.problem")}</h4>
                        <p className="font-body text-base md:text-lg text-ink leading-relaxed">{project.problem}</p>
                      </motion.section>
                    )}
                    {project.solution && (
                      <motion.section variants={item} className="flex flex-col gap-2">
                        <h4 className="font-heading text-xs tracking-[0.15em] uppercase text-ink-faint">{t("projects.detail.solution")}</h4>
                        <p className="font-body text-base md:text-lg text-ink leading-relaxed">{project.solution}</p>
                      </motion.section>
                    )}
                    {project.features && project.features.length > 0 && (
                      <motion.section variants={item} className="flex flex-col gap-3">
                        <h4 className="font-heading text-xs tracking-[0.15em] uppercase text-ink-faint">{t("projects.detail.features")}</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                          {project.features.map((f, i) => (
                            <li key={i} className="flex items-start gap-2.5 font-body text-sm md:text-base text-ink">
                              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-ink shrink-0" aria-hidden="true" />
                              <span className="leading-relaxed">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.section>
                    )}
                  </div>

                  {/* Meta sidebar */}
                  <motion.aside variants={item} className="lg:col-span-1">
                    <div className="lg:sticky lg:top-24 flex flex-col gap-6 rounded-2xl bg-ink/[0.03] p-6">
                      {project.role && (
                        <div className="flex flex-col gap-1.5">
                          <h4 className="font-heading text-xs tracking-[0.15em] uppercase text-ink-faint">{t("projects.detail.role")}</h4>
                          <p className="font-body text-sm text-ink leading-relaxed">{project.role}</p>
                        </div>
                      )}
                      <div className="flex flex-col gap-2">
                        <h4 className="font-heading text-xs tracking-[0.15em] uppercase text-ink-faint">{t("projects.detail.stack")}</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.stack.map((tech, i) => (
                            <span key={i} className="font-body text-xs text-ink-muted bg-ink/5 rounded-full px-3 py-1.5">{tech}</span>
                          ))}
                        </div>
                      </div>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 font-heading text-sm font-semibold text-surface bg-ink rounded-full px-5 py-3 hover:bg-ink/90 transition-colors group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                        >
                          <span>{t("projects.detail.visit")}</span>
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </motion.aside>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
