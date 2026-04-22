import { test, expect, Page } from "@playwright/test";

const BASE = "http://localhost:3000";

const viewports = {
  mobileSmall: { width: 375, height: 812 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 800 },
};

// Wait for loading animation to complete naturally
async function gotoAndWait(page: Page) {
  await page.goto(BASE, { waitUntil: "load" });
  // Wait for loading animation (PopInText + slide) to complete
  // The loading overlay unmounts after ~8-12s on production
  await page.waitForFunction(
    () => {
      // Check if the loading overlay is gone from DOM
      const loadingEl = document.querySelector('.cursor-none');
      return !loadingEl;
    },
    { timeout: 25000 }
  );
  await page.waitForTimeout(1000);
}

test.describe("Responsive — Mobile Small (375px)", () => {
  test.use({ viewport: viewports.mobileSmall, timeout: 40000 });

  test("page loads and no major horizontal overflow", async ({ page }) => {
    await gotoAndWait(page);
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    // Allow some tolerance for scrollbars
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 30);
  });

  test("mobile bottom nav exists with links", async ({ page }) => {
    await gotoAndWait(page);
    const navLinks = page.locator('a[href^="#"]');
    const count = await navLinks.count();
    expect(count).toBeGreaterThanOrEqual(6);
  });

  test("hero section fits in viewport width", async ({ page }) => {
    await gotoAndWait(page);
    const hero = page.locator("section#home");
    const box = await hero.boundingBox();
    if (box) {
      expect(box.width).toBeLessThanOrEqual(375 + 5);
    }
  });

  test("sticky project cards don't overflow", async ({ page }) => {
    await gotoAndWait(page);
    await page.locator("#projects").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const cards = page.locator(".sticky");
    const cardCount = await cards.count();
    for (let i = 0; i < cardCount; i++) {
      const box = await cards.nth(i).boundingBox();
      if (box) {
        expect(box.width).toBeLessThanOrEqual(375 + 5);
      }
    }
  });

  test("contact email link visible and not overflowing", async ({ page }) => {
    await gotoAndWait(page);
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    // Use .last() since there are 2 mailto links (CTA button + email text)
    const emailLink = page.locator('a[href="mailto:wilfriedhouinlindjonon91@gmail.com"]').last();
    const box = await emailLink.boundingBox();
    if (box) {
      expect(box.x + box.width).toBeLessThanOrEqual(375 + 10);
    }
  });

  test("profil canvas fits container", async ({ page }) => {
    await gotoAndWait(page);
    await page.locator("#profil").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const canvas = page.locator("section#profil canvas");
    if (await canvas.count() > 0) {
      const box = await canvas.first().boundingBox();
      if (box) {
        expect(box.width).toBeLessThanOrEqual(375);
      }
    }
  });
});

test.describe("Responsive — Tablet (768px)", () => {
  test.use({ viewport: viewports.tablet, timeout: 40000 });

  test("no major horizontal overflow", async ({ page }) => {
    await gotoAndWait(page);
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 30);
  });

  test("sidebar nav is visible at md", async ({ page }) => {
    await gotoAndWait(page);
    const navLinks = page.locator('a[href^="#"]');
    const count = await navLinks.count();
    expect(count).toBeGreaterThanOrEqual(6);
  });
});

test.describe("Responsive — Desktop (1280px)", () => {
  test.use({ viewport: viewports.desktop, timeout: 40000 });

  test("sidebar nav visible with links", async ({ page }) => {
    await gotoAndWait(page);
    const navLinks = page.locator('a[href^="#"]');
    const count = await navLinks.count();
    expect(count).toBeGreaterThanOrEqual(6);
  });

  test("no major horizontal overflow", async ({ page }) => {
    await gotoAndWait(page);
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 30);
  });
});

test.describe("Cross-viewport — Carousel", () => {
  test.use({ viewport: viewports.mobileSmall, timeout: 40000 });

  test("carousel arrows are visible on mobile", async ({ page }) => {
    await gotoAndWait(page);
    await page.locator("#projects").scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    const arrows = page.locator('button[aria-label="Image suivante"]');
    if (await arrows.count() > 0) {
      const opacity = await arrows.first().evaluate((el: HTMLElement) =>
        window.getComputedStyle(el).opacity
      );
      expect(parseFloat(opacity)).toBeGreaterThan(0);
    }
  });
});

test.describe("Overflow detection", () => {
  test.use({ viewport: viewports.mobileSmall, timeout: 40000 });

  test("find overflow-causing elements", async ({ page }) => {
    await gotoAndWait(page);
    // Find which elements are wider than viewport
    const overflowingElements = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const result: string[] = [];
      document.querySelectorAll('*').forEach(el => {
        const rect = (el as HTMLElement).getBoundingClientRect();
        if (rect.width > vw + 5) {
          const tag = el.tagName.toLowerCase();
          const id = el.id ? `#${el.id}` : '';
          const cls = el.className && typeof el.className === 'string'
            ? `.${el.className.split(' ').slice(0, 3).join('.')}`
            : '';
          result.push(`${tag}${id}${cls} (${Math.round(rect.width)}px)`);
        }
      });
      return result.slice(0, 10);
    });
    console.log("Overflowing elements:", overflowingElements);
    // This test is diagnostic — it always passes
    expect(true).toBe(true);
  });
});
