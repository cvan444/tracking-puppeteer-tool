const puppeteer = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth'); 
const { executablePath } = require('puppeteer');
const clipboardy = require('clipboardy');
const fs = require('fs');
puppeteer.use(pluginStealth());

//main puppeteer function, runs nums through site 
async function getTrackingInformation(trackingNumbers) {
  const browser = await puppeteer.launch({ headless: false, executablePath: executablePath() });
  const page = await browser.newPage();

  // Set the viewport size to 3/4 of the screen size
  const { width, height } = await page.evaluate(() => ({
    width: window.screen.availWidth,
    height: window.screen.availHeight,
  }));
  await page.setViewport({ width: width * 0.75, height: height * 0.75 });

  await page.goto(`https://t.17track.net/en#nums=${trackingNumbers}`);
  await page.waitForTimeout(500);
//loops through popup sequence
  for (let i = 1; i <= 4; i++) {
    const popupButtonSelector = `body > div.introjs-tooltipReferenceLayer > div > div.introjs-tooltipbuttons > a.introjs-button.introjs-nextbutton`;
    await page.waitForSelector(popupButtonSelector);
    await page.click(popupButtonSelector);
    await page.waitForTimeout(500);
  }

  await page.waitForTimeout(3000);

  const clickResultsButtonSelector = '#cl-summary';
  await page.waitForSelector(clickResultsButtonSelector);
  await page.click(clickResultsButtonSelector);

  await page.waitForTimeout(3000);
//copies clipboard data
  const clipboardTextData = await clipboardy.read();
  console.log("Text from clipboard:", clipboardTextData);

  await browser.close();

  return clipboardTextData;
}


//creates output file
function writeTrackingNumberFile(data, batchIndex) {
  const filename = `Output_${batchIndex}.txt`;
  fs.appendFileSync(filename, data); // Append data to the file instead of overwriting it
  console.log(`Saved batch ${batchIndex} to ${filename}`);
}

//iterates throguh 40 tracking 
async function processBatch(global_data, startIndex, endIndex, batchIndex) {
  let trackingNumbers = global_data.slice(startIndex, endIndex).join('');
  console.log("Start Index:", startIndex);
  console.log("End Index:", endIndex);
  console.log("Tracking Numbers:", trackingNumbers);

  const trackingData = await getTrackingInformation(trackingNumbers);

  writeTrackingNumberFile(trackingData, batchIndex);//makes individual files
}

//reads batch file 
async function main() {
  let global_data = fs.readFileSync("batchTest.txt", "utf-8").split("\n");
  let totalBlocks = Math.ceil(global_data.length / 40);

  for (let counterblock = 1; counterblock <= totalBlocks; counterblock++) {
    let startIndex = (counterblock - 1) * 40;
    let endIndex = counterblock * 40;
    await processBatch(global_data, startIndex, endIndex, counterblock);
  }

  //make da big file 
  let combinedData = '';
  for (let counterblock = 1; counterblock <= totalBlocks; counterblock++) {
    const filename = `Output_${counterblock}.txt`;
    const data = fs.readFileSync(filename, 'utf-8');
    combinedData += data + '\n';
  }

  writeTrackingNumberFile(combinedData, 'Main');
}

//catch errors 
main().catch(err => console.error(err));
