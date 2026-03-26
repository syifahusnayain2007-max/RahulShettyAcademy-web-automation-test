import {test,expect} from '@playwright/test';
import { MESSAGES } from '../constant/messages';
import { LoginPage } from '../Pages/Login.page';
import { User } from '../types/User';
import { generateUser } from '../utils/dataGenerator';

let loginpage:LoginPage;
let user : User;

test.beforeEach(async ({ page }) => {
    loginpage = new LoginPage(page);
    user = generateUser();
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#login').waitFor({ state: 'visible' });
})

test("ensure sure can login using valid credentials", async ({  }) => {
    await loginpage.inputEmail(process.env.USER_EMAIL!);
    await loginpage.inputPassword(process.env.USER_PASSWORD!);
    await loginpage.clickLogin();
    await expect(loginpage.dashboardPageTitle).toBeVisible();
})

test("Ensure user can access Forgot Password Page from Login Page", async ({  }) => {
    await loginpage.gotoForgotpasswordPage();
    await expect(loginpage.forgotPassPageTitle).toContainText("Enter New Password");
})

test("Ensure user can access Register Page from Login Page", async ({  }) => {
    await loginpage.gotoRegisterPage();
    await expect(loginpage.registerPageTitle).toContainText("Register");
})

test("Ensure user can not login with password and email field empty", async ({  }) => {
    await loginpage.clickLogin();
    await expect(loginpage.errorMessageEmail && loginpage.errorMessagePassw).toBeVisible();

})

test("ensure user can not login using unregistered email", async ({  }) => {
    await loginpage.inputEmail(user.email);
    await loginpage.inputPassword(process.env.USER_PASSWORD!);
    await loginpage.clickLogin();
    await expect(loginpage.alerMessageText).toContainText(MESSAGES.incorrectEmailPass)
})

test("ensure user can not login using invalid format email", async () => {
    await loginpage.inputEmail(process.env.USER_INVEMAIL!);
    await loginpage.inputPassword(process.env.USER_PASSWORD!);
    await loginpage.clickLogin();
    await expect(loginpage.errorMessageEmailFormat).toHaveText(MESSAGES.InvalidEmailFormat);
})

test("ensure user can not login using invalid password", async ({  }) => {
    await loginpage.inputEmail(process.env.USER_EMAIL!);
    await loginpage.inputPassword(process.env.USER_INVPASSWORD!);
    await loginpage.clickLogin();
    await expect(loginpage.alerMessageText).toContainText(MESSAGES.incorrectEmailPass)

})

test("Ensure user can not login with email field empty", async ({  }) => {
    await loginpage.inputPassword(process.env.USER_PASSWORD!);
    await loginpage.clickLogin();
    await expect(loginpage.errorMessageEmail).toHaveText(MESSAGES.emailEmpty);
})
test("Ensure user can not login with password field empty", async ({  }) => {
    await loginpage.inputEmail(process.env.USER_EMAIL!);
    await loginpage.clickLogin();
    await expect(loginpage.errorMessagePassw).toHaveText(MESSAGES.invaliPasswrodFormat);
})
test("ensure maximum number of unsuccesfull login attempt", async ({  }) => {
    await loginpage.inputEmail(process.env.USER_EMAIL!);
    await loginpage.inputPassword(process.env.USER_INVPASSWORD!);
    for (let i = 0; i <= 10; i++) {
        await loginpage.clickLogin();
;

        if (await loginpage.errorMessagePassw.isVisible()) {
            console.log("account locked")
        }

    }
})
