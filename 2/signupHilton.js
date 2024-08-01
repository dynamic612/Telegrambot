const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { executablePath } = require('puppeteer');
var userAgent = require('user-agents');
puppeteer.use(StealthPlugin());


(async function SignupHilton(data) {

    // Launch a new browser instance
    const browser = await puppeteer.launch({ headless: false, executablePath: executablePath() }); // Set headless to true to run without UI  
    const page = await browser.newPage();
    await page.setUserAgent(userAgent.random().toString());
    // Navigate to the signup page  
    await page.goto('https://www.hilton.com/en/hilton-honors/join/?OCODE=OHWBW', { timeout: 150000 }); // Replace with the actual signup URL

    await page.waitForSelector(".form-input");
    const firstName = 'xpath/' + '/html/body/div[1]/div/main/div/div/div/form/div[1]/label/input';
    const lastName = 'xpath/' + '/html/body/div[1]/div/main/div/div/div/form/div[2]/label/input';
    const phoneSel = 'xpath/' + '/html/body/div[1]/div/main/div/div/div/form/div[3]/div[2]/label/span[2]/select';
    const phoneInput = 'xpath/' + '/html/body/div[1]/div/main/div/div/div/form/div[3]/div[2]/label/span[2]/input';
    const email = 'xpath/' + '/html/body/div[1]/div/main/div/div/div/form/div[4]/label/input';
    const city = 'xpath/' + '/html/body/div[1]/div/main/div/div/div/form/div[5]/label/select';
    const address = 'xpath/' + '/html/body/div[1]/div/main/div/div/div/form/div[6]/label/input';
    const zipcode = 'xpath/' + '/html/body/div[1]/div/main/div/div/div/form/div[8]/label/input';
    const password = 'xpath/' + '/html/body/div[1]/div/main/div/div/div/form/div[9]/label/input';
    const passwordConfirm = 'xpath/' + '/html/body/div[1]/div/main/div/div/div/form/div[10]/label/input';


    await page.waitForSelector('.form-input');
    await page.type(password, 'Smith1234', { delay: "100" });
    await page.type(passwordConfirm, 'Smith1234', { delay: "100" });
    await page.type(firstName, 'Smith', { delay: "100" });
    await page.type(lastName, 'Smith', { delay: "100" });
    await page.type(phoneInput, '234244533', { delay: "100" });
    await page.type(email, 'rosennj@yahoo.com', { delay: "100" });
    await page.type(address, '4731 E Olympic Blvd', { delay: "100" });
    await page.type(zipcode, '90022', { delay: "100" });

    // Phone Selection
    await page.waitForSelector('select[name="phone\\.phoneCountry"]'); // Adjust the selector if needed
    // Get the select element handle
    const selectPhone = await page.$('select[name="phone\\.phoneCountry"]');
    if (!selectPhone) {
        throw new Error('Select element not found');
    }

    const options = await selectPhone.$$('option');
    // Specify the text of the option you want to select
    const visibleText = 'United Kingdom'; // Change this to the option you want to select
    //if(data.Country == 'United States') visibleText += ' of America';

    for (const option of options) {
        const textOrigin = await option.evaluate(el => el.textContent.trim());
        const text = textOrigin.split(' ').slice(1).join(' ');
        if (text === visibleText) {
            await new Promise(resolve => setTimeout(resolve, 5000));
            console.log("country: ", text);
            await option.evaluate(el => el.selected = true); // Select the option
            await selectPhone.evaluate(el => el.dispatchEvent(new Event('change', { bubbles: true }))); // Trigger change event
            break;

        }
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    // Country Selection
    await page.waitForSelector('.form-select'); // Adjust the selector if needed

    const countrySelect = await page.$('select[name="country"]');
    if (!countrySelect) {
        throw new Error('Select element not found');
    }

    // Get all option elements
    const countryOption = await countrySelect.$$('option');

    // Specify the text of the option you want to select
    const visibleText1 = 'United Kingdom'; // Change this to the option you want to select
    //if(data.Country == 'United States') visibleText += ' of America';
    // Loop through options to find the one with the specified text
    for (const option of countryOption) {
        const text = await option.evaluate(el => el.textContent.trim());
        if (text === visibleText1) {
            await option.evaluate(el => el.selected = true); // Select the option
            await countrySelect.evaluate(el => el.dispatchEvent(new Event('change', { bubbles: true }))); // Trigger change event
            break;
        }
    }


    await page.waitForSelector('button')
    await Promise.all([
        page.click('button[type="submit"]'), // Replace with the correct selector for the submit button  
        page.waitForNavigation({ waitUntil: 'networkidle0' }), // Wait for the navigation after form submission  
    ]);

    await browser.close();

})();

// module.exports = {SignupHilton};