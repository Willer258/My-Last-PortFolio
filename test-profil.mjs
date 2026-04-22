import { chromium } from 'playwright';

const DIR = '/tmp/portfolio-test/profil';

async function test() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3001', { waitUntil: 'networkidle', timeout: 30000 });

  // Wait longer for loading screen to disappear
  console.log('Waiting for loading to finish...');
  await page.waitForFunction(() => {
    return !!document.querySelector('#profil') && !document.querySelector('[class*="z-loading"]');
  }, { timeout: 40000 });
  await page.waitForTimeout(3000);
  console.log('✓ Loading done');

  // Scroll to profil
  await page.evaluate(() => document.querySelector('#profil')?.scrollIntoView({ behavior: 'instant', block: 'start' }));
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${DIR}/01-start.png` });
  console.log('✓ 01 - Start (text dim)');

  // Incremental scroll
  await page.evaluate(() => window.scrollBy(0, 150));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${DIR}/02-scroll-150.png` });
  console.log('✓ 02 - +150px');

  await page.evaluate(() => window.scrollBy(0, 200));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${DIR}/03-scroll-350.png` });
  console.log('✓ 03 - +350px');

  await page.evaluate(() => window.scrollBy(0, 200));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${DIR}/04-scroll-550.png` });
  console.log('✓ 04 - +550px');

  await page.evaluate(() => window.scrollBy(0, 250));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${DIR}/05-scroll-800.png` });
  console.log('✓ 05 - +800px (should be fully revealed)');

  // Mobile
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForFunction(() => !!document.querySelector('#profil'), { timeout: 40000 });
  await page.waitForTimeout(3000);
  await page.evaluate(() => document.querySelector('#profil')?.scrollIntoView({ behavior: 'instant', block: 'start' }));
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${DIR}/06-mobile.png` });
  await page.evaluate(() => window.scrollBy(0, 300));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${DIR}/07-mobile-scrolled.png` });
  console.log('✓ 06-07 - Mobile');

  await browser.close();
}

test().catch(e => { console.error(e.message); process.exit(1); });
