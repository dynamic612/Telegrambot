const puppeteer = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
const { executablePath } = require('puppeteer');
const { timeout } = require('puppeteer');
var userAgent = require('user-agents');

puppeteer.use(pluginStealth());


(async function SignupOutback() {

    // Launch a new browser instance
    const browser = await puppeteer.launch({ headless: false, executablePath: executablePath() }); // Set headless to true to run without UI  
    const page = await browser.newPage();
    await page.setUserAgent(userAgent.random().toString())
    await page.setDefaultTimeout(100000);

    await page.goto('https://www.dine-rewards.com/', { waitUntil: 'networkidle0' }); // Replace with the actual signup URL
    // Navigate to the signup page  
    await page.keyboard.press('Tab', { delay: "100" });
    await page.keyboard.press('Tab', { delay: "100" });
    await page.keyboard.press('Tab', { delay: "100" });
    await page.keyboard.press('Enter');

    await page.keyboard.press('Tab', { delay: "1000" });
    await page.keyboard.press('Tab', { delay: "1000" });
    await page.keyboard.press('Tab', { delay: "1000" });
    await page.keyboard.press('Tab', { delay: "1000" });
    await page.keyboard.press('Tab', { delay: "1000" });
    await page.keyboard.press('Tab', { delay: "1000" });
    await page.keyboard.press('Tab', { delay: "2000" });
    await page.keyboard.press('Tab', { delay: "1000" });
    await page.keyboard.press('Tab', { delay: "1000" });

    await page.keyboard.press('Enter', {delay: "1000"});

    await page.waitForNavigation({ waitUntil: 'networkidle0'});
    await page.waitForSelector('#signup-email');

    await new Promise(resolve => setTimeout(resolve, 35000));

    await page.type('#signup-email', 'sdfser321sd@gmail.com', {delay:"1000"});
    await page.type('#signup-password', '90022P@ssword', {delay:"100"});
    await page.type('#confirm-password', '90022P@ssword', {delay:"100"});
    await page.type('#firstname', 'Harry', {delay:"100"});
    await page.type('#lastname', 'Poter', {delay:"100"});
    await page.type('#phonenumber','2345342345', {delay:"100"});
    await page.type('input[type="date"]', '06121984', {delay:"100"});

    // await page.click('#content');
   

    await Promise.all([
        await page.click('#btn-join-now'),
        page.waitForNavigation( {timeout:30000})
    ]);

    await browser.close();

})();