import React, { useMemo } from "react";
import { BandeTexteAnimation } from "@/components/Shared/TyperText";
import ScrollReveal from "@/components/Shared/ScrollReveal";
import StickyProjectCard from "./StickyProjectCard";
import SmallProjectCard from "./SmallProjectCard";
import { projects, IProject } from "@/utils/projects";
import { useTranslation } from 'next-i18next';

const Projects = () => {
  const { t } = useTranslation('common');

  const projectItems = t('projects.items', { returnObjects: true }) as Array<{ title: string; description: string }>;
  const mergedProjects: IProject[] = useMemo(
    () => projects.map((p, i) => ({ ...p, title: projectItems[i]?.title ?? '', description: projectItems[i]?.description ?? '' })),
    [projectItems]
  );

  const featured = mergedProjects.filter((p) => p.featured);
  const others = mergedProjects.filter((p) => !p.featured);

  return (
    <section className="py-12 md:py-20" id="projects">
      {/* Header — constrained width */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="flex lg:justify-center mb-6">
            <div className="section-accent">
              <BandeTexteAnimation
                noLine
                className="font-heading text-2xl md:text-4xl font-bold tracking-tightest"
                text={` ${t('projects.title')}`}
              />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="font-body text-base text-ink-muted lg:text-center max-w-2xl mx-auto mb-10">
            {t('projects.subtitle')}
          </p>
        </ScrollReveal>
      </div>

      {/* Featured projects — sticky stacking cards, 70% width */}
      <div className="w-full px-2 md:px-0 md:w-[85%] lg:w-[80%] mx-auto">
        {featured.map((project, index) => (
          <StickyProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>

      {/* Divider + other projects — constrained width */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="flex items-center gap-4 my-10 lg:my-14">
            <div className="flex-1 h-px bg-ink/10" />
            <span className="font-heading text-xs tracking-[0.2em] uppercase text-ink-faint">
              {t('projects.otherProjects')}
            </span>
            <div className="flex-1 h-px bg-ink/10" />
          </div>
        </ScrollReveal>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
          {others.map((project, index) => (
            <SmallProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <span className="font-body text-sm text-ink-faint">
            {t('projects.moreThan', { count: mergedProjects.length })}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Projects;
