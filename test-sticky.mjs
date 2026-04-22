import { chromium } from 'playwright';

const BASE = 'http://localhost:3001';
const DIR = '/tmp/portfolio-test/sticky';

async function test() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 30000 });

  // Wait for loading screen to fully disappear
  console.log('Waiting for content to load...');
  await page.waitForSelector('#projects', { timeout: 30000 });
  // Extra wait for animations
  await page.waitForTimeout(2000);
  console.log('✓ Content loaded');

  // Scroll to projects title
  await page.evaluate(() => {
    const el = document.querySelector('#projects');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${DIR}/01-projects-title.png` });
  console.log('✓ 01 - Projects section title');

  // Scroll down to see first sticky card
  await page.evaluate(() => window.scrollBy(0, 300));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${DIR}/02-first-card.png` });
  console.log('✓ 02 - First card visible');

  // Scroll more - first card should stick, second starts coming
  await page.evaluate(() => window.scrollBy(0, 500));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${DIR}/03-first-stuck-second-coming.png` });
  console.log('✓ 03 - First card stuck, second coming');

  // Keep scrolling - second card covers first
  await page.evaluate(() => window.scrollBy(0, 500));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${DIR}/04-second-covers-first.png` });
  console.log('✓ 04 - Second card covers first');

  // Continue - third card
  await page.evaluate(() => window.scrollBy(0, 500));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${DIR}/05-third-card.png` });
  console.log('✓ 05 - Third card');

  await page.evaluate(() => window.scrollBy(0, 500));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${DIR}/06-fourth-card.png` });
  console.log('✓ 06 - Fourth card');

  // Check sticky positions while scrolled into the section
  await page.evaluate(() => {
    const el = document.querySelector('#projects');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(300);
  // Scroll to middle of sticky area
  await page.evaluate(() => window.scrollBy(0, 800));
  await page.waitForTimeout(300);

  const diagnostics = await page.evaluate(() => {
    const cards = document.querySelectorAll('#projects .sticky');
    return Array.from(cards).map((c, i) => {
      const rect = c.getBoundingClientRect();
      const style = window.getComputedStyle(c);
      return {
        index: i,
        position: style.position,
        top: style.top,
        rectTop: Math.round(rect.top),
        rectBottom: Math.round(rect.bottom),
        isInViewport: rect.top < window.innerHeight && rect.bottom > 0,
        isStuckAtTop: Math.abs(rect.top - 200) < 5,
      };
    });
  });

  console.log('\n--- Sticky diagnostics (scrolled 800px into projects) ---');
  diagnostics.forEach(d => {
    console.log(`  Card ${d.index}: pos=${d.position} top=${d.top} rect.top=${d.rectTop}px stuck=${d.isStuckAtTop} visible=${d.isInViewport}`);
  });

  await page.screenshot({ path: `${DIR}/07-diagnostic-scroll.png` });

  await browser.close();
}

test().catch(e => { console.error(e.message); process.exit(1); });
