import { test, expect, Page } from "@playwright/test";

const BASE = "http://localhost:3000";

async function waitForApp(page: Page) {
  await page.goto(BASE, { waitUntil: "load" });
  await page.waitForFunction(() => !document.querySelector('.cursor-none'), { timeout: 25000 });
  await page.waitForTimeout(1000);
}

test.describe("Sticky behavior verification", () => {
  test.use({ viewport: { width: 1280, height: 800 }, timeout: 90000 });

  test("project cards stack with sticky positioning", async ({ page }) => {
    await waitForApp(page);

    // Scroll to projects
    await page.evaluate(() => document.querySelector('#projects')?.scrollIntoView());
    await page.waitForTimeout(500);

    // Get initial position of first sticky card
    const card1Before = await page.evaluate(() => {
      const card = document.querySelectorAll('.sticky')[0];
      if (!card) return null;
      const style = window.getComputedStyle(card);
      return {
        position: style.position,
        top: card.getBoundingClientRect().top,
      };
    });
    console.log(`[PROJECTS] Card 1 position: ${card1Before?.position}, top: ${Math.round(card1Before?.top || 0)}`);
    expect(card1Before?.position).toBe('sticky');

    // Scroll further into projects — card 1 should stick while card 2 comes up
    await page.evaluate(() => window.scrollBy(0, 600));
    await page.waitForTimeout(500);

    const afterScroll = await page.evaluate(() => {
      const cards = document.querySelectorAll('.sticky');
      const results: any[] = [];
      for (let i = 0; i < Math.min(cards.length, 4); i++) {
        const rect = cards[i].getBoundingClientRect();
        const style = window.getComputedStyle(cards[i]);
        results.push({
          index: i,
          top: Math.round(rect.top),
          position: style.position,
          isStuck: rect.top <= 120 + 5, // top-20 md:top-[120px]
        });
      }
      return results;
    });

    console.log(`\n[PROJECTS] After scrolling 600px:`);
    afterScroll.forEach(c => {
      console.log(`  Card ${c.index}: top=${c.top}px, position=${c.position}, stuck=${c.isStuck}`);
    });

    // First card should be stuck at the top
    expect(afterScroll[0]?.position).toBe('sticky');
    await page.screenshot({ path: "tests/screenshots/sticky-projects.png" });
  });

  test("works timeline sidebar is sticky", async ({ page }) => {
    await waitForApp(page);

    // Scroll to works
    await page.evaluate(() => document.querySelector('#works')?.scrollIntoView());
    await page.waitForTimeout(500);

    const stickyData = await page.evaluate(() => {
      const sticky = document.querySelector('#works .sticky');
      if (!sticky) return { exists: false };
      const style = window.getComputedStyle(sticky);
      return {
        exists: true,
        position: style.position,
        top: sticky.getBoundingClientRect().top,
      };
    });
    console.log(`\n[WORKS] Sticky sidebar: position=${stickyData.position}, top=${Math.round(stickyData.top || 0)}`);
    expect(stickyData.position).toBe('sticky');

    // Scroll further — sidebar should stay stuck
    await page.evaluate(() => window.scrollBy(0, 800));
    await page.waitForTimeout(500);

    const afterScroll = await page.evaluate(() => {
      const sticky = document.querySelector('#works .sticky');
      if (!sticky) return null;
      return {
        position: window.getComputedStyle(sticky).position,
        top: Math.round(sticky.getBoundingClientRect().top),
      };
    });
    console.log(`[WORKS] After scroll 800px: position=${afterScroll?.position}, top=${afterScroll?.top}`);
    expect(afterScroll?.position).toBe('sticky');

    await page.screenshot({ path: "tests/screenshots/sticky-works.png" });
  });

  test("no horizontal overflow after removing overflow-x-hidden", async ({ page }) => {
    await waitForApp(page);

    // Scroll through entire page
    const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < totalHeight; y += 500) {
      await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
      await page.waitForTimeout(100);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);

    const overflow = await page.evaluate(() => ({
      scrollW: document.documentElement.scrollWidth,
      clientW: document.documentElement.clientWidth,
    }));
    console.log(`\n[OVERFLOW] scrollWidth=${overflow.scrollW}, clientWidth=${overflow.clientW}, diff=${overflow.scrollW - overflow.clientW}`);
    // Allow small tolerance
    expect(overflow.scrollW).toBeLessThanOrEqual(overflow.clientW + 5);
  });
});
