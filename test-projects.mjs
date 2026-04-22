import { chromium } from 'playwright';

const DIR = '/tmp/portfolio-test/projects';

async function test() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3001', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForSelector('#projects', { timeout: 25000 });
  await page.waitForTimeout(2000);

  // Scroll to projects
  await page.evaluate(() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'instant', block: 'start' }));
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${DIR}/01-projects-top.png` });

  // Measure sticky cards
  const cards = await page.evaluate(() => {
    const stickyCards = document.querySelectorAll('#projects .sticky');
    return Array.from(stickyCards).map((c, i) => {
      const rect = c.getBoundingClientRect();
      return {
        index: i,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        viewportWidth: window.innerWidth,
        widthPercent: Math.round((rect.width / window.innerWidth) * 100),
      };
    });
  });

  console.log('--- Sticky project cards dimensions ---');
  cards.forEach(c => {
    console.log(`  Card ${c.index}: ${c.width}x${c.height}px (${c.widthPercent}% of viewport)`);
  });

  // Measure small project cards
  const smallCards = await page.evaluate(() => {
    const all = document.querySelectorAll('#projects .break-inside-avoid');
    return Array.from(all).map((c, i) => {
      const rect = c.getBoundingClientRect();
      return { index: i, width: Math.round(rect.width), height: Math.round(rect.height) };
    });
  });

  console.log('\n--- Small project cards ---');
  smallCards.forEach(c => {
    console.log(`  Card ${c.index}: ${c.width}x${c.height}px`);
  });

  // Scroll through and screenshot each sticky card
  for (let i = 0; i < cards.length; i++) {
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(400);
  }
  await page.screenshot({ path: `${DIR}/02-mid-scroll.png` });

  await page.evaluate(() => window.scrollBy(0, 1000));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${DIR}/03-stacked.png` });

  await browser.close();
}

test().catch(e => { console.error(e.message); process.exit(1); });
