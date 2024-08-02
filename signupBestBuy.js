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

    try {
        await page.goto('https://www.bestbuy.com/', { waitUntil: 'networkidle0' }); // Replace with the actual signup URL
        await page.goto('https://www.bestbuy.com/identity/global/createAccount', { waitUntil: 'networkidle0' });
        await page.keyboard.press('Tab', { delay: "100" });
        await page.keyboard.press('Tab', { delay: "100" });

        await page.keyboard.press('Enter');

        await page.waitForSelector('#firstName');
        await page.type('#firstName', 'Harry');
        await page.type('#lastName', 'Poter');
        await page.type('#email', 'sdfser321sd@gmail.com');
        await page.type('#fld-p1', '90022@PPPDSsdd');
        await page.type('#reenterPassword', '90022@PPPDSsdd');
        await page.type('#phone', '2345342345');

        const button = 'xpath/' + '/html/body/div[1]/div/section/main/div[2]/div/div/div[1]/div/div/div/div/div/form/div[8]/button';
        await Promise.all([
            await page.click(button),
            page.waitForNavigation({ timeout: 30000 })
        ]);
    } catch {
        console.error('An error occurred:', error)
        await browser.close();

    }


})();