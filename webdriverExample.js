const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');

// Helper function to wait for a specified number of milliseconds
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

(async () => {
  let chromeDriverPath = path.resolve('C:/Users/AIMS TECH/Desktop/twitter-like-application-2/chromedriver.exe'); 

  let service = new chrome.ServiceBuilder(chromeDriverPath);

  let options = new chrome.Options();
  options.addArguments('--disable-search-engine-choice-screen');
  options.addArguments('--lang=en-GB');

  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeService(service)
    .setChromeOptions(options)
    .build();

  try {
    await driver.get('https://www.google.com');

    let btn_xpath = '/html/body/div[2]/div[2]/div[3]/span/div/div/div/div[3]/div[1]/button[2]'
    await driver.wait(until.elementLocated(By.xpath(btn_xpath)), 5000);
    let button = await driver.findElement(By.xpath(btn_xpath));
    await button.click();

    let searchBox = await driver.findElement(By.name('q'));
    await searchBox.sendKeys('cats', Key.RETURN);

    await driver.wait(until.elementLocated(By.linkText('Images')), 5000);

    let imagesLink = await driver.findElement(By.linkText('Images'));
    await imagesLink.click();

    await sleep(10000);
  } finally {
    await driver.quit();
  }
})();