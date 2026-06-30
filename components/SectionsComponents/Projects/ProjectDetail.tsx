/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslation } from "next-i18next";
import ImageCarousel from "@/components/Shared/ImageCarousel";
import TiltCard from "@/components/Shared/TiltCard";
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

  // Esc to close + focus trap
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

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-stretch md:items-center md:justify-center md:p-6 lg:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.25 }}
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
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.985 }}
            transition={{ duration: reduce ? 0 : 0.45, ease }}
            className="relative z-10 w-full md:max-w-5xl bg-surface text-ink md:rounded-3xl overflow-y-auto max-h-screen md:max-h-[88vh] shadow-2xl shadow-ink/30"
          >
            {/* Close */}
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={t("projects.detail.close")}
              className="sticky top-0 float-right z-20 m-4 w-10 h-10 rounded-full bg-ink/5 hover:bg-ink/10 text-ink flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Gallery (sticky on desktop so it stays visible while reading) */}
              <div className="bg-surface-muted p-5 sm:p-8 lg:p-10 flex flex-col gap-4 lg:sticky lg:top-0 lg:self-start lg:max-h-[88vh]">
                <span className="font-heading text-xs tracking-[0.2em] uppercase text-ink-muted">
                  {t("projects.detail.preview")}
                </span>
                <TiltCard
                  intensity={reduce ? 0 : 8}
                  glare={!reduce}
                  className={`relative will-change-transform ${project.type === "mobile" ? "" : "rounded-xl"}`}
                >
                  {!hasShots ? (
                    <div className="rounded-xl overflow-hidden shadow-xl shadow-ink/10">
                      <ProjectMockup type={project.type} title={project.title} stack={project.stack} />
                    </div>
                  ) : project.type === "mobile" ? (
                    /* Phone frame for mobile screenshots */
                    <div className="mx-auto w-[250px] max-w-full rounded-[2.2rem] border-[7px] border-ink bg-ink shadow-2xl shadow-ink/40 overflow-hidden">
                      <ImageCarousel
                        images={project.screenshots!}
                        alt={project.title}
                        autoPlay={false}
                        controlsAlwaysVisible
                        portrait
                        className="w-full h-[440px] sm:h-[520px]"
                      />
                    </div>
                  ) : (
                    /* Browser window frame for web / fullstack screenshots */
                    <div className="rounded-xl overflow-hidden border border-ink/10 shadow-2xl shadow-ink/20 bg-white">
                      <div className="flex items-center gap-1.5 px-3.5 py-2.5 bg-surface-muted border-b border-ink/5">
                        <span className="w-2.5 h-2.5 rounded-full bg-ink/15" />
                        <span className="w-2.5 h-2.5 rounded-full bg-ink/15" />
                        <span className="w-2.5 h-2.5 rounded-full bg-ink/15" />
                        <span className="ml-2 font-body text-[10px] text-ink-faint truncate">
                          {project.link
                            ? project.link.replace(/^https?:\/\//, "").replace(/\/$/, "")
                            : project.title.toLowerCase().replace(/[^a-z0-9]+/g, "") + ".app"}
                        </span>
                      </div>
                      <ImageCarousel
                        images={project.screenshots!}
                        alt={project.title}
                        autoPlay={false}
                        controlsAlwaysVisible
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </TiltCard>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 lg:p-10 flex flex-col gap-6">
                <div className="flex flex-col gap-3">
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
                    className="font-heading text-3xl md:text-4xl font-bold tracking-tightest leading-[1.05]"
                  >
                    {project.title}
                  </h3>
                  <p className="font-body text-base text-ink-muted leading-relaxed max-w-content">
                    {project.description}
                  </p>
                </div>

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

                {project.features && project.features.length > 0 && (
                  <section className="flex flex-col gap-2">
                    <h4 className="font-heading text-xs tracking-[0.15em] uppercase text-ink-faint">
                      {t("projects.detail.features")}
                    </h4>
                    <ul className="flex flex-col gap-2">
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

                <section className="flex flex-col gap-2">
                  <h4 className="font-heading text-xs tracking-[0.15em] uppercase text-ink-faint">
                    {t("projects.detail.stack")}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech, i) => (
                      <span key={i} className="font-body text-xs text-ink-muted bg-ink/5 rounded-full px-3 py-1.5">
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 self-start font-heading text-sm font-semibold text-surface bg-ink rounded-full px-5 py-3 hover:bg-ink/90 transition-colors group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  >
                    <span>{t("projects.detail.visit")}</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
