import Head from "next/head";
import Link from "next/link";
import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

const EMAIL = "wilfriedhouinlindjonon91@gmail.com";
const LINKEDIN_URL =
  "https://www.linkedin.com/in/alain-wilfried-houinlindjonon-929612247/";
const GITHUB_URL = "https://github.com/Willer258";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://wilfriedhouinlindjonon.com";

// Projets personnels repris de `projects.items` (même ordre que les fichiers de langue).
// Les réalisations faites pour un employeur n'apparaissent pas sur le CV.
const PERSONAL_PROJECT_INDEXES = [0, 4, 2, 1, 3, 10];

// Dans `works.items`, la dernière entrée est l'activité d'indépendant : sur le CV elle est
// remplacée par la section « Réalisations en indépendant », plus détaillée.
const FREELANCE_WORK_INDEX = 5;

interface IWorkItem {
  fonction: string;
  entreprise: string;
  date: string;
  tasks: string[];
}

interface IProjectItem {
  title: string;
  description: string;
  role: string;
}

interface IService {
  name: string;
  deliverable: string;
}

interface ISkill {
  domain: string;
  items: string;
}

interface IEducation {
  title: string;
  school: string;
  date: string;
}

const stripProtocol = (url: string) =>
  url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="section-accent">
    <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tightest print:text-lg">
      {children}
    </h2>
  </div>
);

// Ligne « intitulé à gauche, contenu à droite », partagée par les réalisations et les compétences.
const rowClassName =
  "grid md:grid-cols-[13rem_1fr] print:grid-cols-[11rem_1fr] gap-x-8 gap-y-1 py-5 print:py-1.5 break-inside-avoid";

const Cv: NextPage & { bare?: boolean } = () => {
  const { t } = useTranslation("common");
  const { locale } = useRouter();

  const works = (
    t("works.items", { returnObjects: true }) as IWorkItem[]
  ).filter((_, index) => index !== FREELANCE_WORK_INDEX);
  const allProjects = t("projects.items", {
    returnObjects: true,
  }) as IProjectItem[];
  const projects = PERSONAL_PROJECT_INDEXES.map(
    (index) => allProjects[index]
  ).filter(Boolean);
  const profile = t("cv.profile", { returnObjects: true }) as string[];
  const services = t("cv.services", { returnObjects: true }) as IService[];
  const skills = t("cv.skills", { returnObjects: true }) as ISkill[];
  const education = t("cv.education", {
    returnObjects: true,
  }) as IEducation[];

  const linkClassName =
    "underline decoration-ink-faint/50 underline-offset-4 hover:decoration-ink print:no-underline";

  return (
    <>
      <Head>
        <title>{t("cv.seoTitle")}</title>
        <meta name="description" content={t("cv.seoDescription")} />
      </Head>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8 md:py-14 font-body text-ink print:max-w-none print:p-0 print:text-[10pt] print:leading-snug">
        {/* Barre d'actions — absente de la version imprimée */}
        <div className="print:hidden flex flex-wrap items-center justify-between gap-4 mb-12 md:mb-20">
          <Link href="/" className={`text-sm ${linkClassName}`}>
            {t("cv.backHome")}
          </Link>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 text-sm" role="group" aria-label="Language">
              <Link
                href="/cv"
                locale="fr"
                aria-label="Français"
                aria-current={locale === "fr" ? "true" : undefined}
                className={locale === "fr" ? "font-semibold" : "text-ink-faint hover:text-ink"}
              >
                FR
              </Link>
              <span aria-hidden="true" className="text-ink-faint">
                /
              </span>
              <Link
                href="/cv"
                locale="en"
                aria-label="English"
                aria-current={locale === "en" ? "true" : undefined}
                className={locale === "en" ? "font-semibold" : "text-ink-faint hover:text-ink"}
              >
                EN
              </Link>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-lg border-2 border-ink px-4 py-2 font-heading text-sm font-semibold transition-colors duration-200 hover:bg-ink hover:text-white active:translate-y-[1px]"
            >
              {t("cv.print")}
            </button>
          </div>
        </div>

        {/* En-tête */}
        <header>
          <h1 className="font-heading font-bold tracking-tightest leading-display text-[clamp(2.4rem,7.2vw,5.25rem)] print:text-[26pt]">
            {t("cv.name")}
          </h1>
          <p className="mt-5 print:mt-2 font-heading text-xl md:text-2xl font-medium print:text-[13pt]">
            {t("cv.role")}
          </p>
          <p className="mt-1 text-lg text-ink-muted print:text-[11pt]">
            {t("cv.focus")}
          </p>

          <ul
            aria-label={t("cv.contactLabel")}
            className="mt-7 print:mt-3 flex flex-wrap gap-x-8 gap-y-2 text-[15px] print:text-[9.5pt] print:gap-x-5"
          >
            <li>{t("cv.location")}</li>
            <li>
              <a href={`mailto:${EMAIL}`} className={linkClassName}>
                {EMAIL}
              </a>
            </li>
            <li>
              <a href={SITE_URL} className={linkClassName}>
                <span className="print:hidden">{t("cv.portfolioLabel")}</span>
                <span className="hidden print:inline">
                  {stripProtocol(SITE_URL)}
                </span>
              </a>
            </li>
            <li>
              <a href={LINKEDIN_URL} className={linkClassName}>
                <span className="print:hidden">LinkedIn</span>
                <span className="hidden print:inline">
                  {stripProtocol(LINKEDIN_URL)}
                </span>
              </a>
            </li>
            <li>
              <a href={GITHUB_URL} className={linkClassName}>
                <span className="print:hidden">GitHub</span>
                <span className="hidden print:inline">
                  {stripProtocol(GITHUB_URL)}
                </span>
              </a>
            </li>
          </ul>
        </header>

        {/* Profil + prestations */}
        <div className="mt-14 md:mt-20 print:mt-5 grid lg:grid-cols-[1.15fr_1fr] print:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 print:gap-6 items-start">
          <section>
            <SectionTitle>{t("cv.profileTitle")}</SectionTitle>
            <div className="mt-6 print:mt-3 space-y-4 print:space-y-2 text-lg print:text-[10pt] leading-relaxed print:leading-snug max-w-content">
              {profile.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="radius bg-surface-dark text-white p-7 sm:p-9 print:rounded-none print:bg-transparent print:text-ink print:border print:border-ink print:p-4 break-inside-avoid">
            <h2 className="font-heading text-xl md:text-2xl font-bold tracking-tightest print:text-[12pt]">
              {t("cv.servicesTitle")}
            </h2>
            <dl className="mt-6 print:mt-2 space-y-5 print:space-y-2">
              {services.map((service) => (
                <div key={service.name}>
                  <dt className="font-heading font-semibold">{service.name}</dt>
                  <dd className="mt-1 print:mt-0 text-white/70 print:text-ink-muted">
                    {service.deliverable}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        {/* Expériences — une vraie chronologie, d'où la ligne de temps */}
        <section className="mt-16 md:mt-24 print:mt-5">
          <SectionTitle>{t("cv.experienceTitle")}</SectionTitle>
          <ol className="mt-9 print:mt-4 border-l-2 border-ink-faint/30 pl-6 sm:pl-8 print:pl-4 print:ml-2 space-y-10 print:space-y-3">
            {works.map((work) => (
              <li
                key={`${work.entreprise}-${work.date}`}
                className="relative grid md:grid-cols-[12rem_1fr] print:grid-cols-[9.5rem_1fr] gap-x-8 gap-y-1 break-inside-avoid"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-2 -left-[calc(1.5rem+7px)] sm:-left-[calc(2rem+7px)] print:-left-[calc(1rem+6px)] h-3 w-3 print:h-2.5 print:w-2.5 rounded-full bg-ink"
                />
                <p className="pt-1 text-sm text-ink-faint print:text-[9pt]">
                  {work.date}
                </p>
                <div>
                  <h3 className="font-heading text-lg font-semibold print:text-[11pt]">
                    {work.fonction}
                  </h3>
                  <p className="text-ink-muted">{work.entreprise}</p>
                  <ul className="mt-3 print:mt-1 list-disc pl-5 space-y-1.5 print:space-y-0 text-ink-muted">
                    {work.tasks.map((task) => (
                      <li key={task}>{task}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Réalisations en indépendant */}
        <section className="mt-16 md:mt-24 print:mt-5">
          <SectionTitle>{t("cv.projectsTitle")}</SectionTitle>
          <div className="mt-6 print:mt-2 divide-y divide-ink-faint/20 border-y border-ink-faint/20">
            {projects.map((project) => (
              <div key={project.title} className={rowClassName}>
                <h3 className="font-heading font-semibold">{project.title}</h3>
                <div>
                  <p>{project.description}</p>
                  {/* Le rôle détaillé reste à l'écran ; à l'impression il est omis pour tenir sur deux pages. */}
                  <p className="mt-1 text-sm text-ink-faint print:hidden">
                    {project.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Compétences */}
        <section className="mt-16 md:mt-24 print:mt-5">
          <SectionTitle>{t("cv.skillsTitle")}</SectionTitle>
          <dl className="mt-6 print:mt-2 divide-y divide-ink-faint/20 border-y border-ink-faint/20">
            {skills.map((skill) => (
              <div key={skill.domain} className={rowClassName}>
                <dt className="font-heading font-semibold">{skill.domain}</dt>
                <dd className="text-ink-muted">{skill.items}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Formation + langues */}
        <div className="mt-16 md:mt-24 print:mt-5 grid md:grid-cols-[1.6fr_1fr] print:grid-cols-[1.6fr_1fr] gap-12 print:gap-6 break-inside-avoid">
          <section>
            <SectionTitle>{t("cv.educationTitle")}</SectionTitle>
            <ul className="mt-6 print:mt-3 space-y-5 print:space-y-2">
              {education.map((item) => (
                <li key={item.title}>
                  <p className="font-heading font-semibold">{item.title}</p>
                  <p className="text-ink-muted">
                    {item.school}, {item.date}
                  </p>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <SectionTitle>{t("cv.languagesTitle")}</SectionTitle>
            <p className="mt-6 print:mt-3">{t("cv.languages")}</p>
            <p className="mt-4 print:mt-2 text-sm print:text-[9pt] text-ink-faint">
              {t("cv.referencesNote")}
            </p>
          </section>
        </div>

        {/* Appel à l'action — absent de la version imprimée */}
        <div className="print:hidden mt-16 md:mt-24 pb-6">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-block rounded-lg border-2 border-transparent bg-ink px-6 py-3.5 font-heading font-semibold tracking-wide text-white transition-colors duration-200 hover:border-ink hover:bg-white hover:text-ink active:translate-y-[1px]"
          >
            {t("cv.contactCta")}
          </a>
        </div>
      </div>
    </>
  );
};

// Page autonome : ni navigation latérale ni pied de page du portfolio (voir Layout).
Cv.bare = true;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "fr", ["common"])),
  },
});

export default Cv;
