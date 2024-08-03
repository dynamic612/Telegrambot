const puppeteer = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
const { executablePath } = require('puppeteer');
const { timeout } = require('puppeteer');
var userAgent = require('user-agents');

puppeteer.use(pluginStealth());


async function SignupFont(data) {

    // Launch a new browser instance
    const browser = await puppeteer.launch({ headless: false, executablePath: executablePath() }); // Set headless to true to run without UI  
    const page = await browser.newPage();
    await page.setUserAgent(userAgent.random().toString())
    await page.setDefaultTimeout(50000);

    try {
        await page.goto('https://fontainebleaulasvegas-kiosk.lushrewards.com/register?_gl=1%2a1liiw08%2a_gcl_aw%2aR0NMLjE3MjI2NzIzNzEuQ2p3S0NBandxcmUxQmhBcUVpd0E3ZzlRaHFzMEhna0VPRTdRTnFBVGRHRzJ6X0FaUkRDXzE2TWdQUnd4eXE4akhaUFFJX1B4Y3ZmaXhCb0NFMGtRQXZEX0J3RQ..%2a_gcl_au%2aMTczOTc4MTcwMC4xNzIyNjcyMzcw%2a_ga%2aMTc0NjkyMzUzNy4xNzIyNjcyMzcw%2a_ga_Y0CXFCH98J%2aMTcyMjY3MjM3MC4xLjAuMTcyMjY3MjM3MC42MC4wLjA.', { waitUntil: 'networkidle0' });
       
        const firstName = 'xpath/' + '/html/body/div[1]/div/div/div[3]/form/div[1]/div[1]/input';
        const lastName = 'xpath/' + '/html/body/div[1]/div/div/div[3]/form/div[1]/div[2]/input'
        const email ='xpath/' + '/html/body/div[1]/div/div/div[3]/form/div[2]/div[1]/input'

        await page.type(firstName, data.Firstname);
        await page.type(lastName, data.Lastname);
        await page.type(email, data.Email);
        const numbers = data.Birthday.split('/').trim(String);
        await page.type('#inputtedDate', numbers[1]);
        await page.type('#inputtedDate', numbers[2]);
        await page.type('#inputtedDate', numbers[0]);

        await page.waitForSelector('#country'); // Adjust the selector if needed

        // Get the select element handle
        const selectHandle = await page.$('#country');
        if (!selectHandle) {
            throw new Error('Select element not found');
        }
        const options = await selectHandle.$$('option');
        const visibleText = data.Country; // Change this to the option you want to select

        for (const option of options) {
            const text = await option.evaluate(el => el.textContent.trim());
            if (text === visibleText) {
                await option.evaluate(el => el.selected = true); // Select the option
                await selectHandle.evaluate(el => el.dispatchEvent(new Event('change', { bubbles: true }))); // Trigger change event
                break;
            }
        }

        const zipcode = 'xpath/' + '/html/body/div[1]/div/div/div[3]/form/div[3]/div[2]/input';
        const password = 'xpath/' + '/html/body/div[1]/div/div/div[3]/form/div[4]/div[1]/input';
        const passwordC = 'xpath/' + '/html/body/div[1]/div/div/div[3]/form/div[4]/div[2]/input';

        await page.type(zipcode, data.Zipcode);
        await page.type(password, data.Password);
        await page.type(passwordC, data.Password);

        await page.click('#flexCheckChecked');
        const button = 'xpath/' + '/html/body/div[1]/div/div/div[3]/form/div[6]/button';

        await Promise.all([
            await page.click(button),
            page.waitForNavigation({ timeout: 30000 })

        ]);
        await browser.close();
    } catch(error) {
        console.error('An error occurred:', error)
        await browser.close();

    }

};

 module.exports = { SignupFont };