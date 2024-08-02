const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { executablePath } = require('puppeteer');
var userAgent = require('user-agents');
const { timeout } = require('puppeteer');
puppeteer.use(StealthPlugin());


async function SignupMarriott(data) {

  // Launch a new browser instance
  const browser = await puppeteer.launch({ headless: false, executablePath: executablePath() }); // Set headless to true to run without UI  
  const page = await browser.newPage();
  await page.setUserAgent(userAgent.random().toString());

  // Navigate to the signup page  
  await page.goto('https://www.marriott.com/', { timeout: 60000 }); // Replace with the actual signup URL
  await page.goto('https://www.marriott.com/loyalty/createAccount/createAccountPage1.mi', { timeout: 60000 })

  try {// Get the select element handle
    await page.waitForSelector('.selectric-wrapper')
    await page.click('.selectric-wrapper');
    // Use XPath with the variable to find the element  
    await page.evaluate(() => {
      const elements = document.querySelectorAll('li');
      elements.forEach((element) => {
        if (element.textContent.includes('United Kingdom')) {
          element.click();
        }
      });
    });

    await new Promise(resolve => setTimeout(resolve, 2000));

    await page.waitForSelector('#field-first-name')
    await page.type('#field-first-name', 'Smith', { delay: "100" });
    await page.type('#field-last-name', 'John', { delay: "100" });
    await page.type('#field-postal', '90022', { delay: "100" });
    await page.type('#field-email', 'sdfs234sdf@uolsd.sls', { delay: "100" });
    await page.type('#field-password', 'Password612', { delay: "100" });
    await page.type('#field-password-confirmation', 'Password612', { delay: "100" });



    await Promise.all([
      await page.click('#enroll-join'), // Replace with the correct selector for the submit button  
      page.waitForNavigation({ waitUntil: 'networkidle0' }), // Wait for the navigation after form submission  
    ]);

    await browser.close();
  } catch (error) {
    console.error('An error occurred:', error);
    await browser.close();
  }

};

module.exports = { SignupMarriott };