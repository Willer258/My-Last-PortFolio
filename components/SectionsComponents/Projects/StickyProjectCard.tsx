/* eslint-disable @next/next/no-img-element */
import React from "react";
import ImageCarousel from "@/components/Shared/ImageCarousel";
import ProjectMockup from "./ProjectMockup";
import { IProject } from "@/utils/projects";
import { useTranslation } from "next-i18next";

const typeLabels: Record<string, string> = {
  web: "Web",
  mobile: "Mobile",
  design: "Design",
  fullstack: "Fullstack",
};

interface StickyProjectCardProps {
  project: IProject;
  index: number;
  onOpen: () => void;
}

export default function StickyProjectCard({ project, index, onOpen }: StickyProjectCardProps) {
  const { t } = useTranslation("common");
  const hasScreenshots = project.screenshots && project.screenshots.length > 0;

  return (
    <div
      className="bg-surface-dark grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-12 p-6 sm:p-8 md:p-14 lg:p-16 rounded-2xl sm:rounded-3xl mb-8 md:mb-10 sticky top-20 md:top-[120px] min-h-[350px] sm:min-h-[400px] md:min-h-[480px]"
    >
      {/* Content */}
      <div className="flex flex-col justify-center space-y-5">
        <div className="flex items-center gap-3">
          <span className="font-heading text-[10px] tracking-[0.2em] uppercase text-white/70 bg-white/5 rounded-full px-3 py-1">
            {typeLabels[project.type]}
          </span>
          {project.company && (
            <span className="font-heading text-[10px] tracking-wider text-white/70">
              {project.company}
            </span>
          )}
        </div>

        <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tightest">
          {project.title}
        </h3>

        <p className="font-body text-sm md:text-base lg:text-lg text-white/70 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech, i) => (
            <span key={i} className="font-body text-xs text-white/70 bg-white/5 rounded-full px-3 py-1.5">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-2">
          <button
            type="button"
            onClick={onOpen}
            aria-label={t("projects.openCaseStudyAria", { title: project.title })}
            className="inline-flex items-center gap-2 font-heading text-sm font-semibold text-ink bg-white rounded-full px-5 py-2.5 hover:bg-white/90 transition-colors group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span>{t("projects.viewCaseStudy")}</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-heading text-sm font-semibold text-white/70 hover:text-white transition-colors group"
            >
              <span className="underline underline-offset-4 decoration-white/10 group-hover:decoration-white/40">
                {t("projects.viewProject")}
              </span>
            </a>
          )}
        </div>
      </div>

      {/* Image */}
      <div className="mt-8 md:mt-0 group/img grayscale hover:grayscale-0 transition-all duration-700 ease-out">
        {hasScreenshots ? (
          <ImageCarousel
            images={project.screenshots!}
            alt={project.title}
            autoPlay
            interval={5000}
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
        ) : (
          <div className="rounded-lg overflow-hidden shadow-lg">
            <ProjectMockup type={project.type} title={project.title} stack={project.stack} />
            <div className="h-6 bg-surface-panel" />
          </div>
        )}
      </div>
    </div>
  );
}
