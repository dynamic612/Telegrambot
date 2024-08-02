const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { executablePath } = require('puppeteer');
var userAgent = require('user-agents');
puppeteer.use(StealthPlugin());


async function SignupChoice(data) {

    // Launch a new browser instance
    const browser = await puppeteer.launch({ headless: false, executablePath: executablePath() }); // Set headless to true to run without UI  
    const page = await browser.newPage();
    await page.setUserAgent(userAgent.random().toString());
    // Navigate to the signup page  
    await page.goto('https://www.ihg.com/rewardsclub/us/en/enrollment/join?scmisc=WEB-_-6C-_-GLO-_-EN-_-LOY-_-IHGRHome-_-Join-_-MB-_-NonMembers', { timeout: 60000 }); // Replace with the actual signup URL

    try {
        await page.waitForSelector('#firstName')
        await page.type('#firstName', data.Firstname, { delay: "100" });
        await page.type('#lastName', data.Lastname, { delay: "100" });
        await page.type('#email', data.Email, { delay: "100" });
        await page.type('#confirmEmail', data.Email, { delay: "100" });
        await page.type('#password', data.Password, { delay: "100" });
        await page.type('#confirmPassword', data.Password, { delay: "100" });


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


        await page.type('#address1', data.Address, { delay: "50" });
        await page.type('#city', data.City, { delay: "50" });

        // State Selection
        const visibleText1 = data.State;
        await page.waitForSelector('#stateList'); // Adjust the selector if needed

        // Get the select element handle
        const selectHandle1 = await page.$('#stateList');
        if (!selectHandle1) {
            throw new Error('Select element not found');
        }

        // Get all option elements
        const options1 = await selectHandle1.$$('option');
        for (const option of options1) {
            const text = await option.evaluate(el => el.textContent.trim());
            if (text === visibleText1) {
                await option.evaluate(el => el.selected = true); // Select the option
                await selectHandle1.evaluate(el => el.dispatchEvent(new Event('change', { bubbles: true }))); // Trigger change event
                break;
            }
        }

        await page.type('#zipCode', data.Zipcode, { delay: "50" });
        const check1 = 'xpath/' + '/html/body/div[1]/div/div/app-enrollment/div/app-enrollment/app-enrollment-view/div[1]/div[2]/div/div/app-terms-and-conditions/div/form/div[1]/div/div';
        const check2 = 'xpath/' + '/html/body/div[1]/div/div/app-enrollment/div/app-enrollment/app-enrollment-view/div[1]/div[2]/div/div/app-terms-and-conditions/div/form/div[2]/div/div';
        await page.click(check1);
        await page.click(check2);

        await Promise.all([
            await page.click('button[type="submit"]'), // Replace with the correct selector for the submit button  
            page.waitForNavigation({ waitUntil: 'networkidle0' }), // Wait for the navigation after form submission  
        ]);
        await browser.close();

    } catch (error) {
        console.error('An error occurred:', error);
        await browser.close();
    }
};

module.exports = { SignupChoice };