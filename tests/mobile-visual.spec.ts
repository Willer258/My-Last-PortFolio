import { test, expect, Page, devices } from "@playwright/test";

const BASE = "http://localhost:3000";
const iPhone = devices["iPhone 14"];

async function waitForApp(page: Page) {
  await page.goto(BASE, { waitUntil: "load" });
  await page.waitForFunction(
    () => !document.querySelector('.cursor-none'),
    { timeout: 25000 }
  );
  await page.waitForTimeout(1000);
}

function scrollTo(page: Page, selector: string) {
  return page.evaluate(
    (s) => document.querySelector(s)?.scrollIntoView({ behavior: "instant" }),
    selector
  );
}

test.use({ ...iPhone, timeout: 90000 });

test.describe("Mobile Visual Check — iPhone 14", () => {

  test("full mobile audit with screenshots", async ({ page }) => {
    await waitForApp(page);

    // === GLOBAL: No horizontal overflow ===
    const { scrollW, clientW } = await page.evaluate(() => ({
      scrollW: document.documentElement.scrollWidth,
      clientW: document.documentElement.clientWidth,
    }));
    console.log(`\n[GLOBAL] scrollWidth=${scrollW}, clientWidth=${clientW}, overflow=${scrollW - clientW}px`);
    expect(scrollW).toBeLessThanOrEqual(clientW + 2);

    // === HOME ===
    await page.screenshot({ path: "tests/screenshots/01-home.png" });
    const navCount = await page.evaluate(() => document.querySelectorAll('a[href^="#"]').length);
    console.log(`[HOME] Nav links: ${navCount}`);
    expect(navCount).toBeGreaterThanOrEqual(6);

    // Hamburger button visible on mobile
    const hamburgerVisible = await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      for (const btn of buttons) {
        const label = btn.getAttribute('aria-label') || '';
        if (label.includes('menu')) {
          const style = window.getComputedStyle(btn);
          return style.display !== 'none' && style.visibility !== 'hidden';
        }
      }
      return false;
    });
    console.log(`[HOME] Hamburger button visible: ${hamburgerVisible}`);
    expect(hamburgerVisible).toBe(true);

    // === PROFIL ===
    await scrollTo(page, "#profil");
    await page.waitForTimeout(600);
    await page.screenshot({ path: "tests/screenshots/02-profil.png" });

    const profilData = await page.evaluate(() => {
      const canvas = document.querySelector('section#profil canvas');
      const vw = document.documentElement.clientWidth;
      return {
        canvasWidth: canvas ? Math.round(canvas.getBoundingClientRect().width) : null,
        viewport: vw,
        fits: canvas ? canvas.getBoundingClientRect().width <= vw + 2 : true,
      };
    });
    console.log(`[PROFIL] Canvas: ${profilData.canvasWidth}px (viewport: ${profilData.viewport}px)`);
    expect(profilData.fits).toBe(true);

    // === PROJECTS ===
    await scrollTo(page, "#projects");
    await page.waitForTimeout(600);
    await page.screenshot({ path: "tests/screenshots/03-projects.png" });

    const projectsData = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const cards = document.querySelectorAll('.sticky');
      const results: number[] = [];
      cards.forEach(c => results.push(Math.round(c.getBoundingClientRect().width)));
      // Check carousel arrows
      const arrow = document.querySelector('button[aria-label="Image suivante"]');
      const arrowOpacity = arrow ? parseFloat(window.getComputedStyle(arrow).opacity) : -1;
      return { cardWidths: results, viewport: vw, arrowOpacity };
    });
    console.log(`[PROJECTS] ${projectsData.cardWidths.length} sticky cards, widths: ${projectsData.cardWidths.join(', ')}px`);
    console.log(`[PROJECTS] Carousel arrow opacity: ${projectsData.arrowOpacity}`);
    projectsData.cardWidths.forEach(w => expect(w).toBeLessThanOrEqual(clientW + 5));
    expect(projectsData.arrowOpacity).toBeGreaterThan(0);

    // Small project cards
    await scrollTo(page, ".break-inside-avoid");
    await page.waitForTimeout(400);
    await page.screenshot({ path: "tests/screenshots/04-projects-small.png" });

    // === WORKS ===
    await scrollTo(page, "#works");
    await page.waitForTimeout(600);
    await page.screenshot({ path: "tests/screenshots/05-works.png" });

    const worksData = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      // Mobile timeline (lg:hidden)
      const timeline = document.querySelector('.border-l-2');
      return {
        timelineWidth: timeline ? Math.round(timeline.getBoundingClientRect().width) : null,
        viewport: vw,
        fits: timeline ? timeline.getBoundingClientRect().width <= vw + 5 : true,
      };
    });
    console.log(`[WORKS] Mobile timeline: ${worksData.timelineWidth}px`);
    expect(worksData.fits).toBe(true);

    // === SKILLS ===
    await scrollTo(page, "#skills");
    await page.waitForTimeout(600);
    await page.screenshot({ path: "tests/screenshots/06-skills.png" });

    const skillsData = await page.evaluate(() => {
      const cards = document.querySelectorAll('section#skills .rounded-2xl');
      if (cards.length < 2) return { stacked: true, count: cards.length };
      const r1 = cards[0].getBoundingClientRect();
      const r2 = cards[1].getBoundingClientRect();
      return {
        stacked: r2.top >= r1.bottom - 10,
        count: cards.length,
        card1Bottom: Math.round(r1.bottom),
        card2Top: Math.round(r2.top),
      };
    });
    console.log(`[SKILLS] ${skillsData.count} cards, stacked vertically: ${skillsData.stacked}`);

    // === CONTACT ===
    await scrollTo(page, "#contact");
    await page.waitForTimeout(600);
    await page.screenshot({ path: "tests/screenshots/07-contact.png" });

    const contactData = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const section = document.querySelector('#contact');
      const email = section?.querySelector('a[href*="mailto"]');
      return {
        sectionWidth: section ? Math.round(section.getBoundingClientRect().width) : null,
        emailRight: email ? Math.round(email.getBoundingClientRect().right) : null,
        viewport: vw,
        emailFits: email ? email.getBoundingClientRect().right <= vw + 10 : true,
      };
    });
    console.log(`[CONTACT] Email right edge: ${contactData.emailRight}px (viewport: ${contactData.viewport}px)`);
    expect(contactData.emailFits).toBe(true);

    // === FULL PAGE ===
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    await page.screenshot({ path: "tests/screenshots/08-fullpage.png", fullPage: true });

    // === FINAL: Find any remaining overflows ===
    const overflows = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const results: string[] = [];
      document.querySelectorAll('*').forEach(el => {
        const rect = (el as HTMLElement).getBoundingClientRect();
        if (rect.right > vw + 5 && rect.height > 0 && rect.width > 10) {
          const tag = el.tagName.toLowerCase();
          const id = el.id ? `#${el.id}` : '';
          results.push(`${tag}${id} → right=${Math.round(rect.right)}px, w=${Math.round(rect.width)}px`);
        }
      });
      return [...new Set(results)].slice(0, 10);
    });

    if (overflows.length > 0) {
      console.log(`\n⚠️  OVERFLOWING ELEMENTS:`);
      overflows.forEach(o => console.log(`   ${o}`));
    } else {
      console.log(`\n✅ No overflowing elements!`);
    }

    console.log(`\n📸 Screenshots saved to tests/screenshots/`);
  });
});
