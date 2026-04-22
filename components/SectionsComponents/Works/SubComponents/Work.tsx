import ScrollReveal from "@/components/Shared/ScrollReveal";
import AnimateCursorTarget from "@/components/Shared/AnimateCursorTarget";
import { motion } from "framer-motion";
import React from "react";
import { useTranslation } from "next-i18next";

interface IWork {
  index: number;
  fonction: string;
  entreprise: string;
  date: string;
  description?: string;
  tasks: string[];
  onInView?: (index: number) => void;
}

const Work = ({
  fonction,
  entreprise,
  date,
  description,
  tasks,
  index,
  onInView,
}: IWork) => {
  const { t } = useTranslation("common");

  return (
    <ScrollReveal delay={0.05}>
      <AnimateCursorTarget type="button">
        <motion.div
          className="bg-surface-muted rounded-2xl p-8 md:p-10 transition-shadow duration-500 hover:shadow-lg"
          onViewportEnter={() => onInView?.(index)}
          viewport={{ amount: 0.2 }}
        >
          <div className="space-y-1">
            <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-tightest">
              {entreprise}
            </h3>
            <p className="font-heading text-lg md:text-xl font-semibold text-ink-muted">
              {fonction}
            </p>
            <p className="font-body text-ink-faint">{date}</p>
          </div>

          <div className="w-12 h-[2px] bg-ink my-6" />

          {description && (
            <p className="font-body text-ink-muted leading-relaxed max-w-content">
              {description}
            </p>
          )}

          <div className="mt-6">
            <p className="font-heading text-lg font-semibold mb-3">
              {t("works.activities")} :
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
              {tasks.map((task, taskIndex) => (
                <li
                  key={taskIndex}
                  className="font-body text-base text-ink-muted list-disc ml-4"
                >
                  {task}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimateCursorTarget>
    </ScrollReveal>
  );
};

export default Work;
