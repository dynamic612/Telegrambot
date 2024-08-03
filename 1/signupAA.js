const puppeteer = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
const { executablePath } = require('puppeteer');
const userAgent = require('user-agents');
puppeteer.use(pluginStealth());


async function SignupAA(data) {

    // Launch a new browser instance
    const browser = await puppeteer.launch({ headless: false, executablePath: executablePath() }); // Set headless to true to run without UI  
    const page = await browser.newPage();
    await page.setUserAgent(userAgent.random().toString())
    await page.setDefaultTimeout(50000);
    try {
        // Navigate to the signup page  
        await page.goto('https://www.aa.com/loyalty/enrollment/enroll'); // Replace with the actual signup URL
        await page.keyboard.press('Tab', { delay: 200 });
        await page.keyboard.press('Tab', { delay: 200 });
        await page.keyboard.press('Enter', { delay: 200 });


        // Type firstName and lastName
        await page.type('input[id="personalInformationForm.firstName"]', data.Firstname, { delay: "100" }); // Replace with the correct selector and value 
        await page.type('input[id="personalInformationForm.lastName"]', data.Lastname, { delay: "100" }); // Replace with the correct selector and value

        //Birthday
        await page.waitForSelector('select[id="personalInformationForm\\.dateOfBirth\\.month"]');
        const birthday = data.Birthday;
        const numbers = birthday.split('/').map(Number);

        //await page.waitForSelector('#personalInformationForm\\.dateOfBirth\\.month'); // Adjust the selector if needed
        await page.select('select[id="personalInformationForm\\.dateOfBirth\\.month"]', `${numbers[1]}`); // Replace with the correct selector and value
        await page.select('select[id="personalInformationForm\\.dateOfBirth\\.day"]', `${numbers[2]}`); // Replace with the correct selector and value
        await page.select('select[id="personalInformationForm\\.dateOfBirth\\.year"]', `${numbers[0]}`); // Replace with the correct selector and value


        //Select gender
        //await page.select('#personalInformationForm\\.gender', 'M'); // Replace with the correct selector and value 

        async function genderif(gender) {
            await page.select('#personalInformationForm\\.gender', gender[0]);
        }

        await genderif(data.Gender);

        // Country Selection
        await page.waitForSelector('#addressInformationForm\\.country'); // Adjust the selector if needed

        // Get the select element handle
        const selectHandle = await page.$('#addressInformationForm\\.country');
        if (!selectHandle) {
            throw new Error('Select element not found');
        }

        // Get all option elements
        const options = await selectHandle.$$('option');

        // Specify the text of the option you want to select
        const visibleText = data.Country; // Change this to the option you want to select
        // Loop through options to find the one with the specified text
        for (const option of options) {
            const text = await option.evaluate(el => el.textContent.trim());
            if (text === visibleText) {
                await option.evaluate(el => el.selected = true); // Select the option
                await selectHandle.evaluate(el => el.dispatchEvent(new Event('change', { bubbles: true }))); // Trigger change event
                break;
            }
        }

        // state Selection
        await page.waitForSelector('#addressInformationForm\\.usState'); // Adjust the selector if needed

        // Get the select element handle
        const selectHandle1 = await page.$('#addressInformationForm\\.usState');
        if (!selectHandle1) {
            throw new Error('Select element not found');
        }

        // Get all option elements
        const options1 = await selectHandle1.$$('option');

        // Specify the text of the option you want to select
        const visibleText1 = data.State; // Change this to the option you want to select

        // Loop through options to find the one with the specified text
        for (const option of options1) {
            const text = await option.evaluate(el => el.textContent.trim());
            if (text === visibleText1) {
                console.log(text);
                await option.evaluate(el => el.selected = true); // Select the option
                await selectHandle1.evaluate(el => el.dispatchEvent(new Event('change', { bubbles: true }))); // Trigger change event
                break;
            }
        }


        // phone Selection
        await page.waitForSelector('#emailPhoneForm\\.phones0\\.countryCode'); // Adjust the selector if needed

        const selectHandle2 = await page.$('#emailPhoneForm\\.phones0\\.countryCode');
        if (!selectHandle2) {
            throw new Error('Select element not found');
        }

        // Get all option elements
        const options2 = await selectHandle2.$$('option');

        // Specify the text of the option you want to select
        const visibleText2 = data.Country; // Change this to the option you want to select
        // Loop through options to find the one with the specified text
        for (const option of options2) {
            const text1 = await option.evaluate(el => el.textContent.trim());
            const text = text1.split('-').map(item => item.trim());
            if (text.includes(visibleText2)) {
                await option.evaluate(el => el.selected = true); // Select the option
                await selectHandle.evaluate(el => el.dispatchEvent(new Event('change', { bubbles: true }))); // Trigger change event
                break;
            }
        }


        await page.select('select[id="emailPhoneForm\\.phones0\\.type"]', 'CEL'); // Replace with the correct selector and value

        await page.type('input[id="addressInformationForm\\.city"]', data.City, { delay: "100" }); // Replace with the correct selector and value 
        await page.type('input[id="addressInformationForm\\.address1"]', data.Address, { delay: "100" }); // Replace with the correct selector and value 
        await page.type('input[id="addressInformationForm\\.postalCode"]', data.Zipcode, { delay: "100" }); // Replace with the correct selector and value 

        await page.type('#emailPhoneForm\\.email', data.Email, { delay: "100" }); // Replace with the correct selector and value
        await page.type('#emailPhoneForm\\.confirmEmail', data.Email, { delay: "100" }); // Replace with the correct selector and value 
        await page.type('#emailPhoneForm\\.phones0\\.number', data.Phone_Number, { delay: "100" }); // Replace with the correct selector and value 

        const agree = '/html/body/main/div/form/section[7]/div/div/div/label/span[2]';
        await page.waitForSelector('.control');
        await page.click('xpath/' + agree);

        await page.type('#yourAccountForm\\.password', data.Password, { delay: "100" }); // Replace with the correct selector and value 
        await page.type('#yourAccountForm\\.confirmPassword', data.Password, { delay: "100" }); // Replace with the correct selector and value 

        await page.waitForSelector('#continueButton');
        await page.click('#continueButton');
        await Promise.all([
            // Replace with the correct selector for the submit button  
            page.waitForNavigation({ waitUntil: 'networkidle0' })// Wait for the navigation after form submission  
        ]);

        await browser.close();
    } catch (error) {
        console.error('An error occurred:', error);
        await browser.close();
    }


};

module.exports = { SignupAA };