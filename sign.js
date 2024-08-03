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
    await page.setDefaultTimeout(50000);

    await page.goto('https://www.outback.com/rewards/', { waitUntil: 'networkidle0' }); // Replace with the actual signup URL
    //Navigate to the signup page  
    await page.keyboard.press('Tab', { delay: "100" });
    await page.keyboard.press('Tab', { delay: "100" });
    await page.keyboard.press('Tab', { delay: "100" });
    await page.keyboard.press('Tab', { delay: "100" });

    await page.keyboard.press('Enter', { delay: "100" })
 
    await page.waitForSelector('#email');
    await page.type('#email', 'sdfser321sd@gmail.com', {delay:"100"});
    await page.type('#zip-code', '90022P@ssword', {delay:"100"});
    await page.type('#first-name', 'Harry', {delay:"100"});
    await page.type('#last-name', 'Poter', {delay:"100"});
    await page.type('#phone-number','2345342345', {delay:"100"});

    const birthday = 'xpath/' + '/html/body/div[1]/div[1]/div[1]/div/div/div[2]/div/div[6]/div/input';
    await page.type(birthday, '06121985', {delay:"100"})

    await Promise.all([
        await page.click('#sign-up-button-secondary'),
        page.waitForNavigation( {timeout:30000})
    ]);

    await browser.close();

})();