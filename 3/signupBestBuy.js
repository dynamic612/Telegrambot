const puppeteer = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
const { executablePath } = require('puppeteer');
const { timeout } = require('puppeteer');
var userAgent = require('user-agents');

puppeteer.use(pluginStealth());


async function SignupBestBuy(data) {

    // Launch a new browser instance
    const browser = await puppeteer.launch({ headless: false, executablePath: executablePath() }); // Set headless to true to run without UI  
    const page = await browser.newPage();
    await page.setUserAgent(userAgent.random().toString())
    await page.setDefaultTimeout(50000);

    try {
        await page.goto('https://www.bestbuy.com/', { waitUntil: 'networkidle0' }); // Replace with the actual signup URL
        await page.goto('https://www.bestbuy.com/identity/global/createAccount', { waitUntil: 'networkidle0' });
        await page.waitForSelector('#firstName');
        await page.type('#firstName', data.Firstname);
        await page.type('#lastName', data.Lastname);
        await page.type('#email', data.Email);
        await page.type('#fld-p1', data.Password);
        await page.type('#reenterPassword', data.Password);
        await page.type('#phone', data.Phone_Number);

        const button = 'xpath/' + '/html/body/div[1]/div/section/main/div[2]/div/div/div[1]/div/div/div/div/div/form/div[8]/button';
        await Promise.all([
            await page.click(button),
            page.waitForNavigation({ timeout: 30000 })

        ]);
        await browser.close();
    } catch (error) {
        console.error('An error occurred:', error)
        await browser.close();

    }

};

module.exports = { SignupBestBuy };