import { chromium } from 'playwright';

const BASE = 'http://localhost:3001';
const DIR = '/tmp/portfolio-test/layout';

async function test() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForSelector('#home', { timeout: 25000 });
  await page.waitForTimeout(2000);

  // Full page screenshot
  await page.screenshot({ path: `${DIR}/00-fullpage.png`, fullPage: true });
  console.log('✓ Full page screenshot');

  // Each section
  const sections = ['#home', '#profil', '#projects', '#works', '#skills', '#contact'];
  for (let i = 0; i < sections.length; i++) {
    const sel = sections[i];
    await page.evaluate((s) => document.querySelector(s)?.scrollIntoView({ behavior: 'instant', block: 'start' }), sel);
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${DIR}/${String(i + 1).padStart(2, '0')}-${sel.replace('#', '')}.png` });
    console.log(`✓ ${sel}`);
  }

  // Measure gaps between sections
  const gaps = await page.evaluate(() => {
    const sections = ['#home', '#profil', '#projects', '#works', '#skills', '#contact'];
    const results = [];
    for (let i = 0; i < sections.length; i++) {
      const el = document.querySelector(sections[i]);
      if (!el) { results.push({ section: sections[i], error: 'NOT FOUND' }); continue; }
      const rect = el.getBoundingClientRect();
      const scrollTop = window.scrollY + rect.top;
      const height = rect.height;
      results.push({ section: sections[i], top: Math.round(scrollTop), height: Math.round(height) });
    }
    return results;
  });

  console.log('\n--- Section positions & gaps ---');
  for (let i = 0; i < gaps.length; i++) {
    const g = gaps[i];
    const gap = i > 0 ? g.top - (gaps[i-1].top + gaps[i-1].height) : 0;
    console.log(`  ${g.section.padEnd(12)} top=${String(g.top).padStart(5)}px  h=${String(g.height).padStart(5)}px  gap=${String(Math.round(gap)).padStart(4)}px`);
  }

  await browser.close();
}

test().catch(e => { console.error(e.message); process.exit(1); });
