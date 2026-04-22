/* eslint-disable @next/next/no-img-element */
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ImageCarousel from "@/components/Shared/ImageCarousel";
import ProjectMockup from "./ProjectMockup";
import { IProject } from "@/utils/projects";

const typeLabels: Record<string, string> = {
  web: "Web",
  mobile: "Mobile",
  design: "Design",
  fullstack: "Fullstack",
};

export default function FeaturedProject({ project, index }: { project: IProject; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const isEven = index % 2 === 0;
  const hasScreenshots = project.screenshots && project.screenshots.length > 0;

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className="py-12 lg:py-20"
    >
      <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-16 items-center`}>
        {/* Visual */}
        <motion.div
          style={{ y: imageY }}
          className="w-full lg:w-3/5 relative"
        >
          {hasScreenshots ? (
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
              <ImageCarousel
                images={project.screenshots!}
                alt={project.title}
                autoPlay
                interval={5000}
              />
            </div>
          ) : (
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/20 bg-surface-dark">
              <ProjectMockup type={project.type} title={project.title} stack={project.stack} />
              <div className="h-8 bg-[#1a1a1a]" />
            </div>
          )}
        </motion.div>

        {/* Info */}
        <motion.div
          style={{ y }}
          className="w-full lg:w-2/5 space-y-5"
        >
          <div className="flex items-center gap-3">
            <span className="font-heading text-[10px] tracking-[0.2em] uppercase text-ink-faint bg-surface-muted rounded-full px-3 py-1">
              {typeLabels[project.type]}
            </span>
            {project.company && (
              <span className="font-heading text-[10px] tracking-wider text-ink-faint">
                {project.company}
              </span>
            )}
          </div>

          <h3 className="font-heading text-3xl lg:text-4xl font-bold tracking-tightest leading-display">
            {project.title}
          </h3>

          <p className="font-body text-base text-ink-muted leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.stack.map((tech, i) => (
              <span key={i} className="font-body text-xs text-ink-muted bg-surface-muted rounded-full px-3 py-1.5">
                {tech}
              </span>
            ))}
          </div>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-heading text-sm font-semibold text-ink hover:text-ink-muted transition-colors duration-200 pt-2 group"
            >
              <span className="underline underline-offset-4 decoration-ink/20 group-hover:decoration-ink/50 transition-all">
                Voir le projet
              </span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
