/* eslint-disable @next/next/no-img-element */
import React from "react";
import ScrollReveal from "@/components/Shared/ScrollReveal";
import ImageCarousel from "@/components/Shared/ImageCarousel";
import { IProject } from "@/utils/projects";
import { useTranslation } from "next-i18next";

const typeLabels: Record<string, string> = {
  web: "Web",
  mobile: "Mobile",
  design: "Design",
  fullstack: "Fullstack",
};

export default function SmallProjectCard({ project, index, onOpen }: { project: IProject; index: number; onOpen: () => void }) {
  const { t } = useTranslation("common");
  const hasScreenshots = project.screenshots && project.screenshots.length > 0;
  const hasLink = !!project.link;

  return (
    <ScrollReveal delay={0.05}>
      <div className="relative bg-surface-dark rounded-xl overflow-hidden group break-inside-avoid mb-4 grayscale hover:grayscale-0 transition-all duration-700 ease-out">
        {/* Screenshots carousel if available */}
        {hasScreenshots && (
          <div className="overflow-hidden">
            <ImageCarousel
              images={project.screenshots!}
              alt={project.title}
              autoPlay={false}
            />
          </div>
        )}

        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-heading text-sm font-bold text-white tracking-tight truncate">
              {project.title}
            </h4>
            <span className="font-heading text-[8px] tracking-[0.15em] uppercase text-white/70 shrink-0">
              {typeLabels[project.type]}
            </span>
          </div>

          <p className="font-body text-[11px] text-white/70 leading-relaxed">
            {project.description}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <div className="flex gap-1 flex-wrap">
              {project.stack.slice(0, 3).map((tech, i) => (
                <span key={i} className="font-body text-[9px] text-white/70 bg-white/5 rounded px-1.5 py-0.5">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              {project.company && (
                <span className="font-heading text-[8px] tracking-wider text-white/70">
                  {project.company}
                </span>
              )}
              {hasLink && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-[2] text-white/70 hover:text-white transition-colors"
                  aria-label={t("projects.viewAriaLabel", { title: project.title })}
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Full-card trigger to open the case study (link above stays clickable via z-[2]) */}
        <button
          type="button"
          onClick={onOpen}
          aria-label={t("projects.openCaseStudyAria", { title: project.title })}
          className="absolute inset-0 z-[1] rounded-xl focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
        />
      </div>
    </ScrollReveal>
  );
}
