/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useCallback, useState } from "react";
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
  const [fullView, setFullView] = useState(false);

  const open = !!project;

  // Esc closes the full-screen preview first, then the dialog + focus trap
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        if (fullView) setFullView(false);
        else onClose();
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
    [onClose, fullView]
  );

  // Reset the full-screen preview whenever a different project opens (or it closes)
  useEffect(() => {
    setFullView(false);
  }, [project]);

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

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[70] flex justify-end"
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
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: reduce ? 0 : 0.5, ease }}
            className="relative z-10 ml-auto h-full w-full sm:max-w-[560px] md:max-w-[780px] lg:max-w-[960px] bg-surface text-ink overflow-y-auto shadow-2xl shadow-ink/40 md:rounded-l-3xl"
          >
            {/* Close — sticky, overlays without disrupting flow */}
            <div className="sticky top-0 z-30 h-0 flex justify-end pointer-events-none">
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label={t("projects.detail.close")}
                className="pointer-events-auto m-4 w-10 h-10 rounded-full bg-ink/10 hover:bg-ink/20 backdrop-blur-sm text-ink flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Header */}
            <div className="px-6 sm:px-10 lg:px-12 pt-9 sm:pt-11 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="font-heading text-[10px] tracking-[0.2em] uppercase text-ink-muted bg-ink/5 rounded-full px-3 py-1">
                  {typeLabels[project.type]}
                </span>
                {project.company && (
                  <span className="font-heading text-[10px] tracking-wider text-ink-muted">
                    {project.company}
                  </span>
                )}
              </div>
              <h3
                id="project-detail-title"
                className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tightest leading-[1.03]"
              >
                {project.title}
              </h3>
              <p className="font-body text-base md:text-lg text-ink-muted leading-relaxed max-w-content">
                {project.description}
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {project.stack.map((tech, i) => (
                  <span key={i} className="font-body text-xs text-ink-muted bg-ink/5 rounded-full px-3 py-1.5">
                    {tech}
                  </span>
                ))}
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 self-start font-heading text-sm font-semibold text-surface bg-ink rounded-full px-5 py-3 mt-1 hover:bg-ink/90 transition-colors group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  <span>{t("projects.detail.visit")}</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              )}
            </div>

            {/* Gallery — full-width banner */}
            <div className="relative group mt-7 sm:mt-9 h-[38vh] sm:h-[44vh] overflow-hidden bg-surface-dark">
              <span className="absolute top-4 left-4 z-20 font-heading text-[10px] tracking-[0.2em] uppercase text-white/90 bg-ink/45 backdrop-blur-sm rounded-full px-3 py-1.5 pointer-events-none">
                {t("projects.detail.preview")}
              </span>
              {hasShots ? (
                <ImageCarousel
                  images={project.screenshots!}
                  alt={project.title}
                  autoPlay={false}
                  controlsAlwaysVisible
                  cover
                  className={`w-full h-full ${reduce ? "" : "transition-transform duration-[1100ms] ease-out group-hover:scale-[1.06]"}`}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-6 sm:p-10">
                  <ProjectMockup type={project.type} title={project.title} stack={project.stack} />
                </div>
              )}

              {hasShots && (
                <button
                  type="button"
                  onClick={() => setFullView(true)}
                  className="absolute bottom-4 right-4 z-20 inline-flex items-center gap-1.5 font-heading text-[11px] font-semibold text-ink bg-white/90 hover:bg-white rounded-full px-3.5 py-2 shadow-lg shadow-ink/20 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V5a1 1 0 011-1h3m8 0h3a1 1 0 011 1v3m0 8v3a1 1 0 01-1 1h-3m-8 0H5a1 1 0 01-1-1v-3" />
                  </svg>
                  {t("projects.detail.viewFull")}
                </button>
              )}
            </div>

            {/* Content */}
            <div className="px-6 sm:px-10 lg:px-12 py-8 sm:py-10 flex flex-col gap-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                {project.problem && (
                  <section className="flex flex-col gap-1.5">
                    <h4 className="font-heading text-xs tracking-[0.15em] uppercase text-ink-faint">
                      {t("projects.detail.problem")}
                    </h4>
                    <p className="font-body text-sm md:text-base text-ink leading-relaxed">{project.problem}</p>
                  </section>
                )}
                {project.solution && (
                  <section className="flex flex-col gap-1.5">
                    <h4 className="font-heading text-xs tracking-[0.15em] uppercase text-ink-faint">
                      {t("projects.detail.solution")}
                    </h4>
                    <p className="font-body text-sm md:text-base text-ink leading-relaxed">{project.solution}</p>
                  </section>
                )}
              </div>

              {project.features && project.features.length > 0 && (
                <section className="flex flex-col gap-3">
                  <h4 className="font-heading text-xs tracking-[0.15em] uppercase text-ink-faint">
                    {t("projects.detail.features")}
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
                    {project.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 font-body text-sm md:text-base text-ink">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-ink shrink-0" aria-hidden="true" />
                        <span className="leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {project.role && (
                <section className="flex flex-col gap-1.5">
                  <h4 className="font-heading text-xs tracking-[0.15em] uppercase text-ink-faint">
                    {t("projects.detail.role")}
                  </h4>
                  <p className="font-body text-sm md:text-base text-ink leading-relaxed">{project.role}</p>
                </section>
              )}
            </div>
          </motion.div>

          {/* Full-screen preview — uncropped carousel with controls */}
          <AnimatePresence>
            {fullView && hasShots && (
              <motion.div
                className="fixed inset-0 z-[80] flex flex-col"
                data-lenis-prevent
                onWheel={(e) => e.stopPropagation()}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.25 }}
              >
                <button
                  type="button"
                  aria-label={t("projects.detail.closeFull")}
                  onClick={() => setFullView(false)}
                  className="absolute inset-0 bg-ink/95 backdrop-blur-sm cursor-default"
                />
                <div className="relative z-10 flex items-center justify-between gap-4 px-5 sm:px-8 py-4">
                  <span className="font-heading text-sm font-semibold tracking-wide text-white/90 truncate">
                    {project.title}
                  </span>
                  <button
                    type="button"
                    onClick={() => setFullView(false)}
                    aria-label={t("projects.detail.closeFull")}
                    className="shrink-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="relative z-10 flex-1 min-h-0 px-4 sm:px-12 pb-8 flex items-center justify-center">
                  <ImageCarousel
                    images={project.screenshots!}
                    alt={project.title}
                    autoPlay={false}
                    controlsAlwaysVisible
                    portrait
                    className="w-full h-full"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
