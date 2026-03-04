/* eslint-disable */
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://firstchristiansallianceoutreach.org/');
  const bgColor = await page.evaluate(() => {
    return window.getComputedStyle(document.body).backgroundColor;
  });
  console.log('BODY BG:' , bgColor);
  const elementorBg = await page.evaluate(() => {
    const el = document.querySelector('.elementor-page');
    return el ? window.getComputedStyle(el).backgroundColor : 'none';
  });
  console.log('ELEMENTOR BG:' , elementorBg);
  await browser.close();
})();
