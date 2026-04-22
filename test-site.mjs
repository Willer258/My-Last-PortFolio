import { chromium } from 'playwright';

const BASE = 'http://localhost:3001';
const SCREENSHOTS_DIR = '/tmp/portfolio-test';

async function testSite() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const errors = [];
  page.on('pageerror', (err) => errors.push(`PAGE ERROR: ${err.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`CONSOLE ERROR: ${msg.text()}`);
  });

  console.log('--- Loading page ---');
  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 30000 });

  // Wait for loading screen to disappear (showProverbs becomes false)
  console.log('--- Waiting for loading screen to finish ---');
  try {
    await page.waitForSelector('#home, #profil, [id="projects"]', { timeout: 20000 });
    console.log('✓ Main content loaded');
  } catch {
    console.log('✗ Loading screen did not disappear after 20s');
    await page.screenshot({ path: `${SCREENSHOTS_DIR}/stuck-loading.png`, fullPage: false });
  }

  // Screenshot: Hero
  await page.screenshot({ path: `${SCREENSHOTS_DIR}/01-hero.png`, fullPage: false });
  console.log('✓ Screenshot: hero');

  // Scroll to Profil
  await page.evaluate(() => document.querySelector('#profil')?.scrollIntoView({ behavior: 'instant' }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${SCREENSHOTS_DIR}/02-profil.png`, fullPage: false });
  console.log('✓ Screenshot: profil');

  // Scroll to Projects
  await page.evaluate(() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'instant' }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${SCREENSHOTS_DIR}/03-projects-top.png`, fullPage: false });
  console.log('✓ Screenshot: projects top');

  // Scroll down through sticky cards
  for (let i = 0; i < 4; i++) {
    await page.evaluate(() => window.scrollBy(0, 600));
    await page.waitForTimeout(500);
  }
  await page.screenshot({ path: `${SCREENSHOTS_DIR}/04-projects-sticky.png`, fullPage: false });
  console.log('✓ Screenshot: projects sticky scroll');

  // Scroll more to see stacking
  for (let i = 0; i < 4; i++) {
    await page.evaluate(() => window.scrollBy(0, 600));
    await page.waitForTimeout(500);
  }
  await page.screenshot({ path: `${SCREENSHOTS_DIR}/05-projects-stacked.png`, fullPage: false });
  console.log('✓ Screenshot: projects stacked');

  // Scroll to Works
  await page.evaluate(() => document.querySelector('#works')?.scrollIntoView({ behavior: 'instant' }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${SCREENSHOTS_DIR}/06-works.png`, fullPage: false });
  console.log('✓ Screenshot: works');

  // Scroll to Skills
  await page.evaluate(() => document.querySelector('#skills')?.scrollIntoView({ behavior: 'instant' }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${SCREENSHOTS_DIR}/07-skills.png`, fullPage: false });
  console.log('✓ Screenshot: skills');

  // Scroll to Contact
  await page.evaluate(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'instant' }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${SCREENSHOTS_DIR}/08-contact.png`, fullPage: false });
  console.log('✓ Screenshot: contact');

  // Check all sections exist
  const sections = ['#home', '#profil', '#projects', '#works', '#skills', '#contact'];
  for (const sel of sections) {
    const exists = await page.$(sel);
    console.log(`${exists ? '✓' : '✗'} Section ${sel} ${exists ? 'found' : 'MISSING'}`);
  }

  // Mobile test
  console.log('\n--- Mobile test (390x844) ---');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 30000 });
  try {
    await page.waitForSelector('#home, #profil', { timeout: 20000 });
  } catch {}
  await page.screenshot({ path: `${SCREENSHOTS_DIR}/09-mobile-hero.png`, fullPage: false });
  console.log('✓ Screenshot: mobile hero');

  await page.evaluate(() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'instant' }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${SCREENSHOTS_DIR}/10-mobile-projects.png`, fullPage: false });
  console.log('✓ Screenshot: mobile projects');

  // Report errors
  console.log('\n--- Errors ---');
  if (errors.length === 0) {
    console.log('✓ No JavaScript errors detected');
  } else {
    errors.forEach((e) => console.log(`  ✗ ${e}`));
  }

  await browser.close();
  console.log(`\nScreenshots saved to ${SCREENSHOTS_DIR}/`);
}

testSite().catch((e) => {
  console.error('Test failed:', e.message);
  process.exit(1);
});
