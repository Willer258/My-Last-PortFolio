import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import React from "react";

// TODO: confirmer le domaine de production
const SITE_URL = "https://wilfriedhouinlindjonon.com";

const DEFAULT_LOCALE = "fr";

const MainHead = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const locale = router.locale ?? DEFAULT_LOCALE;
  const path = router.asPath.split("#")[0].split("?")[0];
  const cleanPath = path === "/" ? "" : path;

  const localePrefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  const canonicalUrl = `${SITE_URL}${localePrefix}${cleanPath}`;
  const frUrl = `${SITE_URL}${cleanPath}`;
  const enUrl = `${SITE_URL}/en${cleanPath}`;
  const ogImageUrl = `${SITE_URL}/og-image.jpg`;

  const title = t("seo.title");
  const description = t("seo.description");
  const ogTitle = t("seo.ogTitle");
  const ogDescription = t("seo.ogDescription");

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Wilfried Houinlindjonon",
    jobTitle: "Développeur Full-stack",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Abidjan",
      addressCountry: "CI",
    },
    url: SITE_URL,
    sameAs: [
      "https://github.com/Willer258",
      "https://www.linkedin.com/in/alain-wilfried-houinlindjonon-929612247/",
    ],
  };

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="2136" />
      <meta property="og:image:height" content="2112" />
      <meta property="og:locale" content={locale === "fr" ? "fr_FR" : "en_US"} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={ogImageUrl} />

      {/* Canonical & alternate languages */}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="fr" href={frUrl} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="x-default" href={frUrl} />

      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

      {/* JSON-LD: Person */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
    </Head>
  );
};

export default MainHead;
