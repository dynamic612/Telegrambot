const puppeteer = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
const { executablePath } = require('puppeteer');
const { timeout } = require('puppeteer');
var userAgent = require('user-agents');

puppeteer.use(pluginStealth());


(async function SignupHyatt() {

    // Launch a new browser instance
    const browser = await puppeteer.launch({ headless: false, executablePath: executablePath() }); // Set headless to true to run without UI  
    const page = await browser.newPage();
    await page.setUserAgent(userAgent.random().toString())
    await page.setDefaultTimeout(50000);

    try {

        await page.goto('https://www.hyatt.com', { timeout: 30000 }); // Replace with the actual signup URL

        // await page.goto('https://www.hyatt.com/en-US/member/enroll?icamp=woh_enroll_overview', { timeout: 30000 }); // Replace with the actual signup URL
        await page.waitForSelector('input[name="firstName"]');
        await page.type('input[name="firstName"]', 'Harry');
        await page.type('input[name="lastName"]', 'Poter');
        await page.type('input[name="email"]', 'Poter');

        // Country Selection
        await page.waitForSelector('select[name="countryCode"]'); // Adjust the selector if needed

        //  // Get the select element handle
        //  const selectHandle = await page.$('#country0');
        //  if (!selectHandle) {
        //      throw new Error('Select element not found');
        //  }

        //  // Get all option elements
        //  const options = await selectHandle.$$('option');

        //  // Specify the text of the option you want to select
        //  const visibleText = 'United States'; // Change this to the option you want to select
        //  console.log(visibleText);
        //  // Loop through options to find the one with the specified text
        //  for (const option of options) {
        //      const text = await option.evaluate(el => el.textContent.trim());
        //      if (text === visibleText) {
        //          await option.evaluate(el => el.selected = true); // Select the option
        //          await selectHandle.evaluate(el => el.dispatchEvent(new Event('change', { bubbles: true }))); // Trigger change event
        //          break;
        //      }
        //  }
        await page.type('#emailAddress', 'contactkingjeweller@gmail.com', { delay: "100" });
        await page.type('input[type="password"]', '90022!PPPDSsdd', { delay: "100" });

        const button = 'xpath/' + '/html/body/div[3]/div/div/div[2]/form/div[12]/div[1]/button';
        await Promise.all([
            await page.click(button),
            page.waitForNavigation({ timeout: 30000 })

        ]);
        await browser.close();
    } catch {
        console.error('An error occurred:', error)
        await browser.close();

    }


})();