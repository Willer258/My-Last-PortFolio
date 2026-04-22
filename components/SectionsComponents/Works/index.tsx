import { works } from "@/utils/works";
import React, { useState } from "react";
import Work from "./SubComponents/Work";
import TimelineDot from "./SubComponents/TimelineDot";
import { BandeTexteAnimation } from "@/components/Shared/TyperText";
import ScrollReveal from "@/components/Shared/ScrollReveal";
import { useTranslation } from "next-i18next";

const Works = () => {
  const { t } = useTranslation("common");
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="works"
      className="mt-24 lg:mt-32 max-w-6xl mx-auto px-4 md:px-8"
    >
      {/* Section title - mobile only (above timeline) */}
      <ScrollReveal className="lg:hidden mb-12">
        <div className="section-accent">
          <BandeTexteAnimation
            noLine
            className="font-heading text-2xl md:text-4xl font-bold tracking-tightest"
            text={t("works.title")}
          />
        </div>
      </ScrollReveal>

      {/* Desktop: Split layout with sticky timeline */}
      <div className="hidden lg:grid grid-cols-[1fr_2.5fr] gap-16">
        {/* Left: Sticky timeline sidebar */}
        <div className="relative">
          <div className="sticky top-[20vh]">
            <ScrollReveal>
              <div className="section-accent mb-16">
                <BandeTexteAnimation
                  noLine
                  className="font-heading text-3xl xl:text-4xl font-bold tracking-tightest"
                  text={t("works.title")}
                />
              </div>
            </ScrollReveal>

            <div className="flex flex-col gap-0">
              {works.map((work, index) => (
                <React.Fragment key={index}>
                  <div className="flex items-center gap-4">
                    <TimelineDot active={index === activeIndex} />
                    <span
                      className={`font-body text-sm whitespace-nowrap transition-colors duration-400 ${
                        index === activeIndex
                          ? "text-ink font-medium"
                          : "text-ink-faint"
                      }`}
                    >
                      {work.date}
                    </span>
                  </div>
                  {index < works.length - 1 && (
                    <div className="w-[2px] h-14 bg-ink-faint/30 ml-[6px]" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Experience cards */}
        <div className="space-y-16">
          {works.map((work, index) => (
            <Work
              key={index}
              index={index}
              date={work.date}
              entreprise={work.entreprise}
              fonction={work.fonction}
              tasks={work.tasks}
              description={work.description}
              onInView={setActiveIndex}
            />
          ))}
        </div>
      </div>

      {/* Mobile: Timeline left border layout */}
      <div className="lg:hidden border-l-2 border-ink-faint/30 pl-6 space-y-10">
        {works.map((work, index) => (
          <div key={index} className="relative">
            {/* Timeline dot on the border */}
            <div className="absolute -left-[calc(1.5rem+5px)] top-10">
              <TimelineDot active={index === activeIndex} />
            </div>
            <Work
              index={index}
              date={work.date}
              entreprise={work.entreprise}
              fonction={work.fonction}
              tasks={work.tasks}
              description={work.description}
              onInView={setActiveIndex}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Works;
