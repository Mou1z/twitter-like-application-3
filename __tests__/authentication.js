const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');

let driver = null;

beforeAll(async () => {

    let chromeDriverPath = path.resolve('C:/Users/AIMS TECH/Desktop/twitter-like-application-3/chromedriver.exe');
    let service = new chrome.ServiceBuilder(chromeDriverPath);

    let options = new chrome.Options();
    options.addArguments('--disable-search-engine-choice-screen');
    options.addArguments('--lang=en-GB');

    driver = await new Builder()
        .forBrowser('chrome')
        .setChromeService(service)
        .setChromeOptions(options)
        .build();

});

afterAll(() => {
    driver.quit();
});

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};

describe('authentication tests', () => {
    describe('registration system', () => {
        test('users can successfully register', async () => {

            // 1. Go to the login page
            driver.get('http://localhost:3000');

            // 2. Click "Register here" hyperlink
            let registerLink = await driver.findElement(By.id('register-link'));
            registerLink.click();

            // 3. Wait till Registration page is loaded
            await driver.wait(until.elementLocated(By.xpath('/html/body/div/h1')));
            let h1Element = driver.findElement(By.xpath('/html/body/div/h1'));
            await driver.wait(until.elementTextIs(h1Element, 'Register'));

            // 4. Enter "testuser1" in username field
            let usernameField = await driver.findElement(By.id('username-input'));
            usernameField.sendKeys("testuser1");

            // 5. Enter "examplePassword123" in password field
            let passwordField = await driver.findElement(By.id('password-input'));
            passwordField.sendKeys("examplePassword123");

            // 6. Click "Register"
            let registerBtn = await driver.findElement(By.id('register-btn'));
            registerBtn.click();

            // 7. Verify that the user is redirected to the Login page
            await driver.wait(until.elementLocated(By.xpath('/html/body/div/h1')));
            h1Element = driver.findElement(By.xpath('/html/body/div/h1'));

            expect(await h1Element.getText()).toBe("Login");

        }, 10000);
    });

    describe('login system', () => {
        test('users can successfully login with correct credentials', async () => {
            
            // 1. Go to the login page
            driver.get('http://localhost:3000');
            
            // 2. Enter "testuser1" in the username field
            let usernameField = await driver.findElement(By.id('username-input'));
            usernameField.sendKeys('testuser1');
            
            // 3. Enter "examplePassword123" in the password field
            let passwordField = await driver.findElement(By.id('password-input'));
            passwordField.sendKeys('examplePassword123');
            
            // 4. Click "Login"
            let loginBtn = await driver.findElement(By.xpath('/html/body/div/form/button'));
            loginBtn.click();
            
            // 5. Verify that the application takes the user to the welcome page (also known as the dashboard)
            await driver.wait(until.elementLocated(By.xpath('/html/body/div/h1')));

            let h1Element = driver.findElement(By.xpath('/html/body/div/h1'));
            let h1Text = await h1Element.getText();

            expect(h1Text).toBe('Welcome, testuser1');
        });

    }, 10000);
});