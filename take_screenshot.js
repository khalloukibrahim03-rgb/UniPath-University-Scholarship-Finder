const { chromium } = require('playwright');
const { spawn } = require('child_process');

async function main() {
  const server = spawn('npm', ['run', 'start'], { stdio: 'ignore' });
  await new Promise((r) => setTimeout(r, 4000));

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  await page.goto('http://localhost:3000/admin', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/app/frontend-verification-admin.png', fullPage: true });

  await browser.close();
  server.kill('SIGTERM');
  console.log('Screenshot captured successfully.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
