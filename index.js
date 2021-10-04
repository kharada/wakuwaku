var params = require('./parameters');
const puppeteer = require('puppeteer');

(async () => {
    // If headless is false, you can see what is going on your browser.
    const browser = await puppeteer.launch({
        executablePath : params.executablePath,
        headless:true
    });
    const page = await browser.newPage();
    page.setViewport({width:1200, height:800});

    // Parameters.
    const email = params.username;
    const passwd = params.password;
    const dateYetInputClass = 'bexbri';
    const uncheckInputSelector = 'label.gGJwqH';
    const closeButtonSelector = 'button.eQxfSF';

    // Date and Dummy Steps.
    let targetDate = new Date().getDate();
    let steps = 10000 + Math.floor(1000 * Math.random());

    try {

        // Open pepup.
        await page.goto('https://pepup.life/users/sign_in');

        // Here is Login page.
        await page.type('#sender-email', email);
        await page.type('#user-pass', passwd);
        await page.click('input[type="submit"]');

        // Here is Top page.
        await page.waitFor(3000); // wait for login completed.
        await page.goto('https://pepup.life/scsk_mileage_campaigns');
        await page.waitFor(1000);

        // Here is daily input page.
      
        // Life style (Other Food)
        xpath = `//button[contains(., '` + targetDate + `') and contains(@class,'` + dateYetInputClass + `')]`;
        await page.waitForXPath(xpath);
        await (await page.$x(xpath))[4].click();
        await page.waitForSelector(uncheckInputSelector);
        const labels = await page.$$(uncheckInputSelector);
        for(const label of labels){
            await label.click();
        }
        await page.click(closeButtonSelector);

        // Life style (Drink Alchole?)
        xpath = `//button[contains(., '` + targetDate + `') and contains(@class,'` + dateYetInputClass + `')]`;
        await page.waitForXPath(xpath);
        await (await page.$x(xpath))[3].click();
        await page.waitForSelector(uncheckInputSelector);
        await page.click(uncheckInputSelector);
        await page.click(closeButtonSelector);

        // Sleeping custom.
        xpath = `//button[contains(., '` + targetDate + `') and contains(@class,'` + dateYetInputClass + `')]`;
        await page.waitForXPath(xpath);
        await (await page.$x(xpath))[2].click();
        await page.waitForSelector(uncheckInputSelector);
        await page.click(uncheckInputSelector);
        await page.click(closeButtonSelector);

        // Sleeping time.
        xpath = `//button[contains(., '` + targetDate + `') and contains(@class,'` + dateYetInputClass + `')]`;
        await page.waitForXPath(xpath);
        await (await page.$x(xpath))[1].click();
        await page.waitForSelector('input[name="vitalInput"]');
        await page.click('input[name="vitalInput"]');
        await page.type('input[name="vitalInput"]', '7');
        await page.click('button[type="submit"]');
        await page.waitFor(3000);

        // Step count.
        xpath = `//button[contains(., '` + targetDate + `') and contains(@class,'` + dateYetInputClass + `')]`;
        await page.waitForXPath(xpath);
        await (await page.$x(xpath))[0].click();
        await page.waitForSelector('input[name="vitalInput"]');
        await page.click('input[name="vitalInput"]');
        await page.type('input[name="vitalInput"]', steps + '');
        await page.click('button[type="submit"]');
        await page.waitFor(3000);

        // Click the other checkboxes.
        xpath = `//span[contains(text(), '日々の記録')]`;
        await page.waitForXPath(xpath);
        await (await page.$x(xpath))[0].click();
        await page.waitFor(3000);
        xpath = `//input[not (@checked) and @type = 'checkbox']/..`;
        await page.waitForXPath(xpath);
        const otherLabels =  await page.$x(xpath);
        for(const item of otherLabels){
            await item.click();
        }

        console.log('Successfully completed');

    } catch (error) {
        console.error(error);
    } finally {
        // Finish and Close the browser.
        await browser.close();
    }
  })();
