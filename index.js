var params = require('./parameters');
const puppeteer = require('puppeteer');

(async () => {
    // If headless is false, you can see what is going on your browser.
    const browser = await puppeteer.launch({
        executablePath : params.executablePath,
        headless: false
    });
    const page = await browser.newPage();
    page.setViewport({width:1200, height:800});

    // Parameters.
    const email = params.username;
    const passwd = params.password;
    const dateYetInputClass = 'eEbFHs';
    const uncheckInputSelector = 'label.kZHBwN';
    const closeButtonSelector = 'button.faiZni';
    const periodDays = 7;
    const startDate = '';
    // const startDate = '2025-07-16T10:00'; // use if input for past dates.

    // Date
    let targetDates = [];
    let date = startDate == '' ? new Date() : new Date(startDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    for(let index = 0; index < periodDays; index++ ){
        targetDates.push(date.getDate());
        if(date.getDate() === 1){
            break;
        }
        date.setDate(date.getDate() - 1);
    }

    try {

        // Open pepup.
        await page.goto('https://pepup.life/users/sign_in');

        // Here is Login page.
        await page.type('#sender-email', email);
        await page.type('#user-pass', passwd);
        await page.waitFor(10000); // Click reCAPTCHA manually.
        await page.click('input[type="submit"]');

        // Type Auth Code manually.

        // Here is Top page.
        await page.waitForSelector('a[href="/scsk_mileage_campaigns"]');
        await page.click('a[href="/scsk_mileage_campaigns"]');

        for(let targetDate of targetDates){

            // Dummy Steps.
            let steps = 10000 + Math.floor(1000 * Math.random());

            // Here is daily input page.
            // Life style (Be clean)
            xpath = `//button[contains(., '` + targetDate + `') and contains(@class,'` + dateYetInputClass + `')]`;
            await page.waitForXPath(xpath);
            await (await page.$x(xpath))[6].click();
            await page.waitForSelector(uncheckInputSelector);
            await page.click(uncheckInputSelector);
            await page.click(closeButtonSelector);
            
            // Life style (Drink Alchole)
            xpath = `//button[contains(., '` + targetDate + `') and contains(@class,'` + dateYetInputClass + `')]`;
            await page.waitForXPath(xpath);
            await (await page.$x(xpath))[5].click();
            await page.waitForSelector(uncheckInputSelector);
            await page.click(uncheckInputSelector);
            await page.click(closeButtonSelector);
            
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

            // Life style (Breakfast)
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

        }

        // Click the other checkboxes.
        await page.goto('https://pepup.life/daily_records/diary/' + year + '/' + month + '/' + day);
        await page.waitFor(3000);

        for(let targetDate of targetDates){
            let date = "/daily_records/diary/" + year + "/" + month + "/" + targetDate;
            // daily records.
            xpath = `//a[contains(@href,'` + date  + `')]`;
            await page.waitForXPath(xpath);
            await (await page.$x(xpath))[0].click();
            await page.waitFor(3000);

            xpath = `//input[not (@checked) and @type = 'checkbox']/..`;
            const otherLabels =  await page.$x(xpath);
            for(const item of otherLabels){
                await item.click();
                await page.waitFor(100);
            }
        }        

        console.log('Successfully completed');

    } catch (error) {
        console.error(error);
    } finally {
        // Finish and Close the browser.
        await browser.close();
    }
  })();
