const puppeteer = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
const { executablePath } = require('puppeteer');
const { timeout } = require('puppeteer');
var userAgent = require('user-agents');

puppeteer.use(pluginStealth());


async function SignupDelta(data) {

    // Launch a new browser instance
    const browser = await puppeteer.launch({ headless: false, executablePath: executablePath() }); // Set headless to true to run without UI  
    const page = await browser.newPage();
    await page.setUserAgent(userAgent.random().toString())

    await page.goto('https://www.delta.com/', { timeout: 90000 }); // Replace with the actual signup URL
    // Navigate to the signup page  

    await page.goto('https://www.delta.com/join-skymiles/', { timeout: 90000 });

    // await Promise.all([
    //     await page.waitForSelector('.sign-up'),// Adjust the selector if needed
    //     await page.click('.sign-up'),
    //     page.waitForNavigation({ timeout: 90000 })
    // ]);

    //Birthday
    const birthday = data.Birthday;
    const numbers = birthday.split('-').map(Number);
    await page.waitForSelector('#idp-month__selected');
    await page.click('#idp-month__selected'); // Replace with the correct selector and value
    await page.waitForSelector(`#monthoption-${numbers[1]}`);
    await page.click(`#monthoption-${numbers[1]}`); // Replace with the correct selector and value
    await page.click('#idp-date__selected'); // Replace with the correct selector and value
    await page.waitForSelector(`#monthoption-${numbers[2]}`);
    await page.click(`#monthoption-${numbers[2]}`); // Replace with the correct selector and value
    await page.click('#idp-year__selected'); // Replace with the correct selector and value
    await page.waitForSelector(`#yearoption-${numbers[0]}`);
    await page.click(`#yearoption-${numbers[0]}`); // Replace with the correct selector and value

    async function genderif(gender) {

        await page.waitForSelector('#idp-gender__selected');
        await page.click('#idp-gender__selected');
        if (gender == 'Male') {
            await page.click('#genderoption-1');
        } else if (gender == 'Female') {
            await page.click('#genderoption-2');
        }

    }

    genderif(data.Gender);

    // Type firstName and lastName
    await page.waitForSelector('.idp-input')
    const mName = 'xpath/' + '/html/body/idp-root/div[2]/idp-enrollment/idp-enrollment-page/idp-standard-enrollment/body/div[1]/idp-form/div/div[1]/fieldset/div/idp-form-fields/form/div[2]/idp-input/div/div/input';
    await page.type(mName, ' ', { delay: "3000" });
    const fName = 'xpath/' + '/html/body/idp-root/div[2]/idp-enrollment/idp-enrollment-page/idp-standard-enrollment/body/div[1]/idp-form/div/div[1]/fieldset/div/idp-form-fields/form/div[1]/idp-input/div/div/input';
    await page.type(fName, 'Wiilam', { delay: "100" });
    const lName = 'xpath/' + '/html/body/idp-root/div[2]/idp-enrollment/idp-enrollment-page/idp-standard-enrollment/body/div[1]/idp-form/div/div[1]/fieldset/div/idp-form-fields/form/div[3]/idp-input/div/div/input';
    await page.type(lName, 'Steve', { delay: "150" });
    await page.click(mName);
    await page.keyboard.press('Backspace');

    await Promise.all([
        await page.click('#basic-info-next'),
    ]);

    await page.waitForSelector('#idp-addresscountry__selected'); // Replace with the correct selector and value


    const searchText = data.Country;

    await page.click('#idp-addresscountry__selected'); // Replace with the correct selector and value
    // Use XPath with the variable to find the element  
    const element = await page.$(`li[data-label='${searchText}']`);

    if (element) {
        console.log('Element found:\n', await page.evaluate(el => el.outerHTML, element));
        await element.click();

    } else {
        console.log('Element not found.');
    }

    const searchText1 = data.State;
    await page.waitForSelector('#idp-countrySubdivisionCode__selected'); // Replace with the correct selector and value
    await page.click('#idp-countrySubdivisionCode__selected'); // Replace with the correct selector and value
    // Use XPath with the variable to find the element  
    const element1 = await page.$(`li[data-label='${searchText1}']`);

    if (element1) {
        console.log('State found:\n', await page.evaluate(el => el.outerHTML, element1));
        await element1.click();

    } else {
        console.log('State not found.');
    }



    const address = '/html/body/idp-root/div[2]/idp-enrollment/idp-enrollment-page/idp-standard-enrollment/body/div[1]/idp-form/div/div[2]/fieldset/div/idp-form-fields/form/fieldset[1]/div[2]/idp-input/div/div/input';

    await page.waitForSelector('.idp-input', { delay: "1000" });
    await page.type('xpath/' + address, data.Address, { delay: "100" });


    const city = 'xpath/' + '/html/body/idp-root/div[2]/idp-enrollment/idp-enrollment-page/idp-standard-enrollment/body/div[1]/idp-form/div/div[2]/fieldset/div/idp-form-fields/form/fieldset[1]/div[3]/idp-input/div/div/input';
    await page.type(city, data.City, { delay: "100" });


    const postcode = 'xpath/' + '/html/body/idp-root/div[2]/idp-enrollment/idp-enrollment-page/idp-standard-enrollment/body/div[1]/idp-form/div/div[2]/fieldset/div/idp-form-fields/form/fieldset[1]/div[5]/idp-input/div/div/input';
    await page.type(postcode, data.Zipcode, { delay: "100" })


    const phone = 'xpath/' + '/html/body/idp-root/div[2]/idp-enrollment/idp-enrollment-page/idp-standard-enrollment/body/div[1]/idp-form/div/div[2]/fieldset/div/idp-form-fields/form/fieldset[2]/div[2]/idp-input/div/div/input';
    await page.type(phone, data.Phone_Number, { delay: "100" });

    const email1 = 'xpath/' + '/html/body/idp-root/div[2]/idp-enrollment/idp-enrollment-page/idp-standard-enrollment/body/div[1]/idp-form/div/div[2]/fieldset/div/idp-form-fields/form/fieldset[3]/div[1]/idp-input/div/div/input';
    await page.type(email1, data.Email, { delay: "100" });

    const email2 = 'xpath/' + '/html/body/idp-root/div[2]/idp-enrollment/idp-enrollment-page/idp-standard-enrollment/body/div[1]/idp-form/div/div[2]/fieldset/div/idp-form-fields/form/fieldset[3]/div[2]/idp-input/div/div/input';
    await page.type(email2, data.Email, { delay: "100" });

    const check = '/html/body/idp-root/div[2]/idp-enrollment/idp-enrollment-page/idp-standard-enrollment/body/div[1]/idp-form/div/div[2]/fieldset/div/idp-form-fields/form/fieldset[3]/div[3]/div/idp-checkbox-standard/div/div/label/span[3]';
    await page.click('xpath/' + check);
    await page.keyboard.press('Tab', { delay: "1000" });
    await page.keyboard.press('Tab', { delay: "1000" });
    await page.keyboard.press('Enter', { delay: "1000" });

    await Promise.all([
        await page.click('#contact-info-next'),
    ]);

    await page.waitForSelector('.idp-input');
    await new Promise(resolve => setTimeout(resolve, 2000));
    const userName = 'xpath/' + '/html/body/idp-root/div[2]/idp-enrollment/idp-enrollment-page/idp-standard-enrollment/body/div[1]/idp-form/div/div[3]/fieldset/div/idp-form-fields/form/fieldset[1]/div/idp-input/div/div/input';
    await page.type(userName, data.Username);

    await page.waitForSelector('.idp-input');
    const password = 'xpath/' + '/html/body/idp-root/div[2]/idp-enrollment/idp-enrollment-page/idp-standard-enrollment/body/div[1]/idp-form/div/div[3]/fieldset/div/idp-form-fields/form/fieldset[2]/div[1]/div/idp-input/div/div/input';
    const passwordC = 'xpath/' + '/html/body/idp-root/div[2]/idp-enrollment/idp-enrollment-page/idp-standard-enrollment/body/div[1]/idp-form/div/div[3]/fieldset/div/idp-form-fields/form/fieldset[2]/div[2]/div/idp-input/div/div/input';
    await page.click(password);
    await page.type(password, data.Password, { delay: "100" });
    await page.type(passwordC, data.Password, { delay: "100" });


    const secQuestion1 = 'xpath/' + '/html/body/idp-root/div[2]/idp-enrollment/idp-enrollment-page/idp-standard-enrollment/body/div[1]/idp-form/div/div[3]/fieldset/div/idp-form-fields/form/fieldset[3]/div[1]/idp-dropdown/div/div';
    const secQuestion2 = 'xpath/' + '/html/body/idp-root/div[2]/idp-enrollment/idp-enrollment-page/idp-standard-enrollment/body/div[1]/idp-form/div/div[3]/fieldset/div/idp-form-fields/form/fieldset[3]/div[3]/idp-dropdown/div/div';
    await page.click(secQuestion1);
    await page.keyboard.press('ArrowDown')

    await page.click(secQuestion2);
    await page.keyboard.press('ArrowDown')

    const ans1 = 'xpath/' + '/html/body/idp-root/div[2]/idp-enrollment/idp-enrollment-page/idp-standard-enrollment/body/div[1]/idp-form/div/div[3]/fieldset/div/idp-form-fields/form/fieldset[3]/div[2]/idp-input/div/div/input';
    await page.waitForSelector(ans1);
    await page.type(ans1, data.Answer, { delay: "100" });
    const ans2 = 'xpath/' + '/html/body/idp-root/div[2]/idp-enrollment/idp-enrollment-page/idp-standard-enrollment/body/div[1]/idp-form/div/div[3]/fieldset/div/idp-form-fields/form/fieldset[3]/div[4]/idp-input/div/div/input';
    await page.type(ans2, data.Answer + '1', { delay: "100" });

    await Promise.all([
        await page.click('#login-info-submit'),
        page.waitForNavigation({ timeout: 50000 })
    ]);

    await browser.close();

};

module.exports = {SignupDelta};