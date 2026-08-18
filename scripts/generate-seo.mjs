// Génère public/robots.txt et public/sitemap.xml au prebuild,
// alignés sur NEXT_PUBLIC_SITE_URL (même fallback que MainHead.tsx).
import { writeFileSync } from "node:fs";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://wilfriedhouinlindjonon.com"
).replace(/\/$/, "");

const lastmod = new Date().toISOString().split("T")[0];

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

const urlEntry = (loc) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <xhtml:link rel="alternate" hreflang="fr" href="${SITE_URL}/" />
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />
  </url>`;

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntry(`${SITE_URL}/`)}
${urlEntry(`${SITE_URL}/en`)}
</urlset>
`;

writeFileSync("public/robots.txt", robots);
writeFileSync("public/sitemap.xml", sitemap);
console.log(`SEO files generated for ${SITE_URL} (robots.txt, sitemap.xml)`);
