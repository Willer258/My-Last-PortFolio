import { test, expect, Page, devices } from "@playwright/test";

const BASE = "http://localhost:3000";

async function waitForApp(page: Page) {
  await page.goto(BASE, { waitUntil: "load" });
  await page.waitForFunction(
    () => !document.querySelector('.cursor-none'),
    { timeout: 25000 }
  );
  await page.waitForTimeout(1500);
}

// Scroll progressively to a section — gives IntersectionObserver time to fire
async function scrollTo(page: Page, selector: string) {
  const targetY = await page.evaluate((s) => {
    const el = document.querySelector(s);
    return el ? window.scrollY + el.getBoundingClientRect().top - 100 : 0;
  }, selector);

  const currentY = await page.evaluate(() => window.scrollY);
  const steps = 5;
  const delta = (targetY - currentY) / steps;

  for (let i = 1; i <= steps; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), currentY + delta * i);
    await page.waitForTimeout(150);
  }
}

test.describe("Animations Check — Desktop 1280px", () => {
  test.use({ viewport: { width: 1280, height: 800 }, timeout: 90000 });

  test("Projects section — sticky cards render and animate", async ({ page }) => {
    await waitForApp(page);
    await scrollTo(page, "#projects");
    await page.waitForTimeout(1000);
    await page.screenshot({ path: "tests/screenshots/anim-projects-1.png" });

    // Check sticky cards exist and have content
    const projectData = await page.evaluate(() => {
      const cards = document.querySelectorAll('.sticky');
      const results: any[] = [];
      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const h3 = card.querySelector('h3');
        const style = window.getComputedStyle(card);
        results.push({
          index: i,
          visible: rect.height > 0 && rect.width > 0,
          title: h3?.textContent?.trim() || 'no title',
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          top: Math.round(rect.top),
          opacity: style.opacity,
          display: style.display,
          position: style.position,
        });
      });
      return results;
    });

    console.log("\n=== PROJECTS — Sticky Cards ===");
    projectData.forEach(c => {
      console.log(`  Card ${c.index}: "${c.title}" | ${c.width}x${c.height} | top=${c.top} | opacity=${c.opacity} | display=${c.display} | position=${c.position} | visible=${c.visible}`);
    });

    expect(projectData.length).toBeGreaterThanOrEqual(1);
    // At least the first card should be visible
    expect(projectData[0].visible).toBe(true);
    expect(projectData[0].height).toBeGreaterThan(100);

    // Check small project cards (masonry)
    const smallCards = await page.evaluate(() => {
      const cards = document.querySelectorAll('.break-inside-avoid');
      return {
        count: cards.length,
        firstVisible: cards.length > 0 ? cards[0].getBoundingClientRect().height > 0 : false,
      };
    });
    console.log(`  Small cards: ${smallCards.count} found, first visible: ${smallCards.firstVisible}`);

    // Scroll through projects to see sticky behavior
    await page.evaluate(() => {
      const cards = document.querySelectorAll('.sticky');
      if (cards.length > 1) cards[1].scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(800);
    await page.screenshot({ path: "tests/screenshots/anim-projects-2.png" });

    // Check ScrollReveal animations — do elements have opacity > 0?
    const revealData = await page.evaluate(() => {
      const section = document.querySelector('#projects');
      if (!section) return { error: 'section not found' };
      // Check all motion.div children for opacity
      const motionDivs = section.querySelectorAll('[style]');
      let hiddenCount = 0;
      let visibleCount = 0;
      motionDivs.forEach(el => {
        const style = window.getComputedStyle(el);
        const opacity = parseFloat(style.opacity);
        if (opacity < 0.1) hiddenCount++;
        else visibleCount++;
      });
      return { hiddenCount, visibleCount, total: motionDivs.length };
    });
    console.log(`  ScrollReveal elements: ${revealData.visibleCount} visible, ${revealData.hiddenCount} hidden, ${revealData.total} total`);
  });

  test("Works/Experiences section — timeline and cards render", async ({ page }) => {
    await waitForApp(page);
    await scrollTo(page, "#works");
    await page.waitForTimeout(1500);
    await page.screenshot({ path: "tests/screenshots/anim-works-1.png" });

    const worksData = await page.evaluate(() => {
      const section = document.querySelector('#works');
      if (!section) return { error: 'section not found' };

      // Desktop layout (lg:grid)
      const desktopGrid = section.querySelector('.lg\\:grid');
      const mobileTimeline = section.querySelector('.lg\\:hidden');

      // Check desktop grid visibility
      let desktopVisible = false;
      if (desktopGrid) {
        const style = window.getComputedStyle(desktopGrid);
        desktopVisible = style.display !== 'none';
      }

      // Check mobile timeline visibility
      let mobileVisible = false;
      if (mobileTimeline) {
        const style = window.getComputedStyle(mobileTimeline);
        mobileVisible = style.display !== 'none';
      }

      // Find all work experience cards
      const workCards: any[] = [];
      const stickyEl = section.querySelector('.sticky');
      const stickyStyle = stickyEl ? window.getComputedStyle(stickyEl) : null;

      // Check the title (section-accent)
      const titleEl = section.querySelector('.section-accent');
      const titleVisible = titleEl ? window.getComputedStyle(titleEl).opacity !== '0' : false;

      // Check experience items with their content
      section.querySelectorAll('[class*="space-y"]').forEach((container) => {
        const children = container.children;
        for (let i = 0; i < children.length; i++) {
          const child = children[i] as HTMLElement;
          const style = window.getComputedStyle(child);
          const rect = child.getBoundingClientRect();
          const h3 = child.querySelector('h3');
          const hasContent = child.textContent && child.textContent.trim().length > 10;
          workCards.push({
            tag: child.tagName,
            visible: rect.height > 0,
            opacity: style.opacity,
            transform: style.transform,
            title: h3?.textContent?.trim().substring(0, 40) || '',
            hasContent,
            height: Math.round(rect.height),
          });
        }
      });

      // Check ScrollReveal wrappers — are they stuck at opacity 0?
      const stuckAtZero: string[] = [];
      section.querySelectorAll('div').forEach(el => {
        const s = window.getComputedStyle(el);
        if (s.opacity === '0' && el.children.length > 0) {
          const text = el.textContent?.substring(0, 50) || '';
          if (text.trim()) stuckAtZero.push(text.trim());
        }
      });

      return {
        desktopVisible,
        mobileVisible,
        titleVisible,
        stickyPosition: stickyStyle?.position,
        workCardCount: workCards.length,
        workCards: workCards.slice(0, 8),
        stuckAtZero: stuckAtZero.slice(0, 5),
      };
    });

    console.log("\n=== WORKS/EXPERIENCES ===");
    console.log(`  Desktop grid visible: ${worksData.desktopVisible}`);
    console.log(`  Mobile timeline visible: ${worksData.mobileVisible}`);
    console.log(`  Title visible: ${worksData.titleVisible}`);
    console.log(`  Sticky sidebar position: ${worksData.stickyPosition}`);
    console.log(`  Work cards found: ${worksData.workCardCount}`);
    worksData.workCards?.forEach((c: any, i: number) => {
      console.log(`    Card ${i}: h=${c.height} | opacity=${c.opacity} | transform=${c.transform?.substring(0, 40)} | title="${c.title}" | visible=${c.visible}`);
    });
    if (worksData.stuckAtZero?.length) {
      console.log(`  ⚠️ Elements stuck at opacity 0:`);
      worksData.stuckAtZero.forEach((t: string) => console.log(`    - "${t}"`));
    } else {
      console.log(`  ✅ No elements stuck at opacity 0`);
    }

    // Scroll down within works to trigger more reveals
    await page.evaluate(() => {
      const works = document.querySelector('#works');
      if (works) {
        const cards = works.querySelectorAll('[class*="space-y"] > *');
        if (cards.length > 2) cards[2].scrollIntoView({ behavior: 'instant' });
      }
    });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: "tests/screenshots/anim-works-2.png" });

    // Re-check after scroll
    const afterScroll = await page.evaluate(() => {
      const section = document.querySelector('#works');
      if (!section) return {};
      const stuckAtZero: string[] = [];
      section.querySelectorAll('div').forEach(el => {
        const s = window.getComputedStyle(el);
        if (s.opacity === '0' && el.children.length > 0 && el.getBoundingClientRect().height > 0) {
          const text = el.textContent?.substring(0, 50) || '';
          if (text.trim()) stuckAtZero.push(text.trim());
        }
      });
      return { stuckAtZero: stuckAtZero.slice(0, 5) };
    });

    if (afterScroll.stuckAtZero?.length) {
      console.log(`\n  ⚠️ After scroll — still stuck at opacity 0:`);
      afterScroll.stuckAtZero.forEach((t: string) => console.log(`    - "${t}"`));
    } else {
      console.log(`\n  ✅ After scroll — all elements visible`);
    }
  });

  test("All sections — check for animation failures", async ({ page }) => {
    await waitForApp(page);

    const sections = ['#home', '#profil', '#projects', '#works', '#skills', '#contact'];

    for (const section of sections) {
      await scrollTo(page, section);
      await page.waitForTimeout(1200);

      const sectionData = await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (!el) return { id: sel, exists: false };

        // Count elements stuck at opacity 0
        let stuckCount = 0;
        let totalAnimated = 0;
        el.querySelectorAll('[style*="opacity"]').forEach(child => {
          totalAnimated++;
          const s = window.getComputedStyle(child);
          if (parseFloat(s.opacity) < 0.1 && (child as HTMLElement).offsetHeight > 0) {
            stuckCount++;
          }
        });

        // Count elements with transform that hasn't resolved
        let stuckTransform = 0;
        el.querySelectorAll('[style*="transform"]').forEach(child => {
          const s = window.getComputedStyle(child);
          const t = s.transform;
          // Check for translateY stuck at high values (not animated in)
          if (t && t !== 'none') {
            const match = t.match(/matrix.*,\s*([-\d.]+)\)/);
            if (match && Math.abs(parseFloat(match[1])) > 30) {
              stuckTransform++;
            }
          }
        });

        return {
          id: sel,
          exists: true,
          height: Math.round(el.getBoundingClientRect().height),
          stuckOpacity: stuckCount,
          stuckTransform,
          totalAnimated,
        };
      }, section);

      const status = sectionData.stuckOpacity === 0 && sectionData.stuckTransform === 0 ? '✅' : '⚠️';
      console.log(`${status} ${sectionData.id}: h=${sectionData.height} | stuckOpacity=${sectionData.stuckOpacity} | stuckTransform=${sectionData.stuckTransform} | totalAnimated=${sectionData.totalAnimated}`);
    }
  });
});

// Mobile check — separate file would be cleaner but inline for now
test.describe("Animations Check — Mobile 390px", () => {
  test.use({ viewport: { width: 390, height: 844 }, timeout: 90000 });

  test("Projects + Works animations on mobile", async ({ page }) => {
    await waitForApp(page);

    // Projects
    await scrollTo(page, "#projects");
    await page.waitForTimeout(1200);
    await page.screenshot({ path: "tests/screenshots/anim-projects-mobile.png" });

    const projectsMobile = await page.evaluate(() => {
      const section = document.querySelector('#projects');
      if (!section) return { exists: false };
      const cards = section.querySelectorAll('.sticky');
      const stuckOpacity = Array.from(section.querySelectorAll('[style*="opacity"]')).filter(el => {
        return parseFloat(window.getComputedStyle(el).opacity) < 0.1 && (el as HTMLElement).offsetHeight > 0;
      }).length;
      return {
        exists: true,
        stickyCards: cards.length,
        firstCardHeight: cards.length > 0 ? Math.round(cards[0].getBoundingClientRect().height) : 0,
        stuckOpacity,
      };
    });
    console.log(`\n[MOBILE PROJECTS] ${projectsMobile.stickyCards} sticky cards, first h=${projectsMobile.firstCardHeight}, stuckOpacity=${projectsMobile.stuckOpacity}`);

    // Works
    await scrollTo(page, "#works");
    await page.waitForTimeout(1200);
    await page.screenshot({ path: "tests/screenshots/anim-works-mobile.png" });

    const worksMobile = await page.evaluate(() => {
      const section = document.querySelector('#works');
      if (!section) return { exists: false };
      const timeline = section.querySelector('.border-l-2');
      const stuckOpacity = Array.from(section.querySelectorAll('[style*="opacity"]')).filter(el => {
        return parseFloat(window.getComputedStyle(el).opacity) < 0.1 && (el as HTMLElement).offsetHeight > 0;
      }).length;
      return {
        exists: true,
        timelineVisible: timeline ? window.getComputedStyle(timeline).display !== 'none' : false,
        timelineHeight: timeline ? Math.round(timeline.getBoundingClientRect().height) : 0,
        stuckOpacity,
      };
    });
    console.log(`[MOBILE WORKS] timeline visible=${worksMobile.timelineVisible}, h=${worksMobile.timelineHeight}, stuckOpacity=${worksMobile.stuckOpacity}`);
  });
});
