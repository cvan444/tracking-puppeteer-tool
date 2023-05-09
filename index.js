const puppeteer = require('puppeteer-extra') 

// Add stealth plugin and use defaults 
const pluginStealth = require('puppeteer-extra-plugin-stealth') 
const {executablePath} = require('puppeteer');

puppeteer.use(pluginStealth())


puppeteer.launch({ headless:false, executablePath: executablePath() }).then(async browser => {
    const page = await browser.newPage()

      // Set the viewport size to 3/4 of the screen size
  const {width, height} = await page.evaluate(() => ({
    width: window.screen.availWidth,
    height: window.screen.availHeight,
  }));
  await page.setViewport({width: width * 0.75, height: height * 0.75});


    await page.goto("https://t.17track.net/en#nums=92748903031571543475102857")

    await new Promise(r => setTimeout(r, 1000));

    //click popup1
    const popup1ButtonSelector = 'body > div.introjs-tooltipReferenceLayer > div > div.introjs-tooltipbuttons > a.introjs-button.introjs-nextbutton';
    await page.waitForSelector(popup1ButtonSelector);
    await page.click(popup1ButtonSelector);
    await new Promise(r => setTimeout(r, 1000));
    //click popup2
    const popup2ButtonSelector = 'body > div.introjs-tooltipReferenceLayer > div > div.introjs-tooltipbuttons > a.introjs-button.introjs-nextbutton';
    await page.waitForSelector(popup2ButtonSelector);
    await page.click(popup2ButtonSelector);
    await new Promise(r => setTimeout(r, 1000));
    //click popup3
    const popup3ButtonSelector = 'body > div.introjs-tooltipReferenceLayer > div > div.introjs-tooltipbuttons > a.introjs-button.introjs-nextbutton';
    await page.waitForSelector(popup3ButtonSelector);
    await page.click(popup3ButtonSelector);
    await new Promise(r => setTimeout(r, 1000));
    //click popup4
    const popup4ButtonSelector = 'body > div.introjs-tooltipReferenceLayer > div > div.introjs-tooltipbuttons > a.introjs-button.introjs-nextbutton';
    await page.waitForSelector(popup4ButtonSelector);
    await page.click(popup4ButtonSelector);
    await new Promise(r => setTimeout(r, 1000));


    //Click clear tracking  button
    const clickClearTrackingButtonSelector = '#jsTrackBox > div:nth-child(2) > div.yqi-new-tools-small.clearfix.inputBox-operation-on > button:nth-child(1)';
    await page.waitForSelector(clickClearTrackingButtonSelector);
    await page.click(clickClearTrackingButtonSelector);
    await new Promise(r => setTimeout(r, 1000));

    //select tracking input field

    const inputTrackingField = '#jsTrackBox > div:nth-child(1) > div > div.CodeMirror-scroll > div.CodeMirror-sizer > div > div > div > div.CodeMirror-code > div > pre';
    await page.waitForSelector(inputTrackingField);
    const inputField = await page.$(inputTrackingField);
    await new Promise(r => setTimeout(r, 1000));


    //Paste the 40 tracking numbers
    await inputField.type('92748903031571543475102857');

    //Click track (submit) button
    const clickTrackButtonSelector = '#yqiSmallTrackBtn';
    await page.waitForSelector(clickTrackButtonSelector);
    await page.click(clickTrackButtonSelector);
    await new Promise(r => setTimeout(r, 1000));


    //Click results button
    const clickResultsButtonSelector = '#cl-summary';
    await page.waitForSelector(clickResultsButtonSelector);
    await page.click(clickResultsButtonSelector);
    await new Promise(r => setTimeout(r, 1000));

    // Paste results into spreadsheet and grab the next 40 tracking #s and repeat this process




})

