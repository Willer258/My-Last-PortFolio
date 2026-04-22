import { test, expect, Page } from "@playwright/test";

const BASE = "http://localhost:3000";

async function waitForApp(page: Page) {
  await page.goto(BASE, { waitUntil: "load" });
  await page.waitForFunction(
    () => !document.querySelector('.cursor-none'),
    { timeout: 25000 }
  );
  await page.waitForTimeout(1000);
}

test.describe("Full page scroll — verify all ScrollReveals trigger", () => {
  test.use({ viewport: { width: 1280, height: 800 }, timeout: 120000 });

  test("scroll entire page and check for stuck elements", async ({ page }) => {
    await waitForApp(page);

    // Get total page height
    const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    console.log(`Total page height: ${totalHeight}px`);

    // Scroll through the ENTIRE page in 400px increments
    const step = 400;
    for (let y = 0; y < totalHeight; y += step) {
      await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
      await page.waitForTimeout(200);
    }
    // Ensure we hit the bottom
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(500);

    // Now scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);

    // Check each section for stuck elements
    const sections = ['#home', '#profil', '#projects', '#works', '#skills', '#contact'];

    console.log("\n=== After full page scroll ===");
    for (const sel of sections) {
      // Scroll to section to ensure it's in view for screenshot
      await page.evaluate((s) => document.querySelector(s)?.scrollIntoView(), sel);
      await page.waitForTimeout(300);

      const data = await page.evaluate((s) => {
        const section = document.querySelector(s);
        if (!section) return { id: s, exists: false, stuckOpacity: 0, total: 0 };

        let stuckOpacity = 0;
        let total = 0;
        const stuckTexts: string[] = [];

        section.querySelectorAll('*').forEach(el => {
          const style = window.getComputedStyle(el);
          const opacity = parseFloat(style.opacity);
          const hasContent = el.children.length > 0 || (el.textContent?.trim().length || 0) > 5;

          if (opacity < 0.1 && hasContent && (el as HTMLElement).offsetHeight > 10) {
            // Check if this is an animated element (has transform or opacity in style attribute)
            const inlineStyle = (el as HTMLElement).getAttribute('style') || '';
            if (inlineStyle.includes('opacity') || inlineStyle.includes('transform')) {
              stuckOpacity++;
              const text = el.textContent?.substring(0, 40)?.trim() || '';
              if (text && stuckTexts.length < 3) stuckTexts.push(text);
            }
          }
          if ((el as HTMLElement).getAttribute('style')?.includes('opacity')) total++;
        });

        return { id: s, exists: true, stuckOpacity, total, stuckTexts };
      }, sel);

      const icon = data.stuckOpacity === 0 ? '✅' : '⚠️';
      console.log(`${icon} ${data.id}: ${data.stuckOpacity} stuck / ${data.total} animated`);
      if (data.stuckTexts?.length) {
        data.stuckTexts.forEach((t: string) => console.log(`     stuck: "${t}"`));
      }
    }

    // Take final screenshots of projects and works
    await page.evaluate(() => document.querySelector('#projects')?.scrollIntoView());
    await page.waitForTimeout(500);
    await page.screenshot({ path: "tests/screenshots/scroll-projects.png" });

    await page.evaluate(() => document.querySelector('#works')?.scrollIntoView());
    await page.waitForTimeout(500);
    await page.screenshot({ path: "tests/screenshots/scroll-works.png" });
  });
});
