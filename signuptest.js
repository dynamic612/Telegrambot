const puppeteer = require('puppeteer');

(async function Signup() {

    // Launch a new browser instance
    const browser = await puppeteer.launch({ headless: false }); // Set headless to true to run without UI  
    const page = await browser.newPage();

    // Navigate to the signup page  
    await page.goto('https://trueblue.jetblue.com/enroll/sign-up'); // Replace with the actual signup URL  

    // Fill in the signup form  
    await page.type('input[id="fname"]', 'Steven'); // Replace with the correct selector and value 

    await page.type('input[id="lname"]', 'Jhon'); // Replace with the correct selector and value  
    await page.type('input[id="email"]', 'ytzdieskdf@outlook.com'); // Replace with the correct selector and value  
    await page.click('.phone-input');
    await page.type('.phone-input', '41232355');
    await page.click('#fname');

    // const birthday = data.Birthday;
    // const numbers = birthday.split('-').map(Number);

    await page.select('#bday1SelectDesktop', '2'); // Replace with the correct selector and value  
    await page.select('select#bday2SelectDesktop', '2'); // Replace with the correct selector and value  
    await page.select('select#bday3SelectDesktop', '1978');

    // Click the signup button  
    await Promise.all([
        page.click('button[type="submit"]'), // Replace with the correct selector for the submit button  
        page.waitForNavigation({ waitUntil: 'networkidle0' }), // Wait for the navigation after form submission  
    ]);

    const genderM = '/html/body/mp-root/div[1]/app-quick-enroll-process/div/mp-join-us/mp-enrollment-step2/div[2]/form/div/div[1]/div[2]/form-list/div/fieldset/div/form-list-item[2]/label';
    const genderF = '/html/body/mp-root/div[1]/app-quick-enroll-process/div/mp-join-us/mp-enrollment-step2/div[2]/form/div/div[1]/div[2]/form-list/div/fieldset/div/form-list-item[1]/label';


    await page.click('xpath/' + genderM);

    const address = '/html/body/mp-root/div[1]/app-quick-enroll-process/div/mp-join-us/mp-enrollment-step2/div[2]/form/div/div[2]/mp-address-section/loqate-form-input-select/div/input';
    await page.type('xpath/' + address, '4731 E Olympic Blvd', { delay: "100" });

    const city = '/html/body/mp-root/div[1]/app-quick-enroll-process/div/mp-join-us/mp-enrollment-step2/div[2]/form/div/div[2]/mp-address-section/form-input[2]/div/input';
    await page.type('xpath/' + city, 'Los Angeles');

    const zipcode = '/html/body/mp-root/div[1]/app-quick-enroll-process/div/mp-join-us/mp-enrollment-step2/div[2]/form/div/div[2]/mp-address-section/div/div/form-input/div/input';

    await page.type('xpath/' + zipcode, "90022");

    // Country Selection
    await page.waitForSelector('#countrySelectDesktop'); // Adjust the selector if needed

    // Get the select element handle
    const selectHandle = await page.$('#countrySelectDesktop');
    if (!selectHandle) {
        throw new Error('Select element not found');
    }

    // Get all option elements
    const options = await selectHandle.$$('option');

    // Specify the text of the option you want to select
    const visibleText = 'United States of America'; // Change this to the option you want to select

    // Loop through options to find the one with the specified text
    for (const option of options) {
        const text = await option.evaluate(el => el.textContent.trim());
        if (text === visibleText) {
            await option.evaluate(el => el.selected = true); // Select the option
            await selectHandle.evaluate(el => el.dispatchEvent(new Event('change', { bubbles: true }))); // Trigger change event
            break;
        }
    }

    // State Selection
    await page.waitForSelector('#stateSelectDesktop'); // Adjust the selector if needed

    // Get the select element handle
    const selectHandle1 = await page.$('#stateSelectDesktop');
    if (!selectHandle1) {
        throw new Error('Select element not found');
    }

    // Get all option elements
    const options1 = await selectHandle1.$$('option');

    // Specify the text of the option you want to select
    const visibleText1 = 'California'; // Change this to the option you want to select

    // Loop through options to find the one with the specified text
    for (const option of options1) {
        const text = await option.evaluate(el => el.textContent.trim());
        if (text === visibleText1) {
            await option.evaluate(el => el.selected = true); // Select the option
            await selectHandle1.evaluate(el => el.dispatchEvent(new Event('change', { bubbles: true }))); // Trigger change event
            break;
        }
    }

    // Click the signup button  
    await Promise.all([
        page.click('button[type="submit"]'), // Replace with the correct selector for the submit button  
        //page.waitForNavigation({ waitUntil: 'networkidle0' }), // Wait for the navigation after form submission  

    ]);


    await page.keyboard.press('Tab', {delay:"10000"});
    await page.keyboard.press('Tab', {delay:"100"});
    await page.keyboard.press('Tab', {delay:"100"});
    await page.keyboard.press('Tab', {delay:"100"});
    await page.keyboard.press('Tab', {delay:"100"});
    await page.keyboard.press('Tab', {delay:"100"});
    await page.keyboard.press('Tab', {delay:"100"});
    await page.keyboard.press('Tab', {delay:"100"});
    await page.keyboard.press('Tab', {delay:"100"});
    await page.keyboard.press('Tab', {delay:"100"});
    await page.keyboard.press('Tab', {delay:"100"});
    await page.keyboard.press('Tab', {delay:"100"});
    await page.keyboard.press('Tab', {delay:"100"});
    await page.keyboard.press('Tab', {delay:"100"});

    await page.keyboard.press('Enter');


    // const nextButton =  '/html/body/mp-root/div[1]/app-quick-enroll-process/div/mp-join-us/mp-enrollment-step2/div[2]/form/div/div[4]/div/form-button-submit-pending/button';
    // await page.click('xpath/' + nextButton);

    await Promise.all([
        page.click('button[type="submit"]'), // Replace with the correct selector for the submit button  
        page.waitForNavigation({ waitUntil: 'networkidle0' }), // Wait for the navigation after form submission  
    ]);
    await browser.close();
    
})();


// // Get the select element handle
    // const selectHandle = await page.$('select[name=phone\\.phoneCountry]');
    // if (!selectHandle) {
    //     throw new Error('Select element not found');
    // }

    // // Get all option elements
    // const options = await selectHandle.$$('option');

    // // Specify the text of the option you want to select
    // const visibleText = 'United Kingdom'; // Change this to the option you want to select
    // //if(data.Country == 'United States') visibleText += ' of America';
    // // Loop through options to find the one with the specified text
    // for (const option of options) {
    //     const textOrigin = await option.evaluate(el => el.textContent.trim());
    //     const text = textOrigin.split(' ').slice(1).join(' ');
    //     if (text === visibleText) {
    //         console.log("country", text);
    //         await option.evaluate(el => el.selected = true); // Select the option
    //         await selectHandle.evaluate(el => el.dispatchEvent(new Event('change', { bubbles: true }))); // Trigger change event
    //         break;

    //     }
    // }
