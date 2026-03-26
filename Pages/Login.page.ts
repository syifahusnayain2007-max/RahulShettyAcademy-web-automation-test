import { Locator, Page } from "@playwright/test";

export class LoginPage {
    private readonly page: Page;
    //locators
    private readonly loginTitle: Locator;
    private readonly setEmail: Locator;
    private readonly setPassword: Locator;
    private readonly loginButton: Locator;
    private readonly registerButton: Locator;
    private readonly forgotpasswordButton: Locator;
    private readonly errorMessages: Locator;
    private readonly containerDashboardPage: Locator;
    private readonly alertMessage: Locator;
    private readonly registerPage: Locator;
    private readonly forgotpasswordPage: Locator;


    constructor(page: Page) {
        this.page = page
        this.loginTitle = page.locator("#login");
        this.setEmail = page.getByPlaceholder("email@example.com");
        this.setPassword = page.locator("#userPassword");
        this.loginButton = page.locator("#login");
        this.containerDashboardPage = page.locator(".container");
        this.forgotpasswordButton = page.getByRole("link", { name: "Forgot Password?" });
        this.registerButton = page.getByRole("link", { name: "Register" });
        this.registerPage = page.locator(".login-title");
        this.errorMessages = page.locator(".invalid-feedback");
        this.alertMessage = page.locator(".toast-container");
        this.forgotpasswordPage = page.locator(".text-center");
    }
    async inputEmail(email: string) {
        await this.setEmail.fill(email);
    }
    async inputPassword(password: string) {
        await this.setPassword.fill(password);
    }
    async clickLogin() {
        await this.loginButton.click();
    }
    async gotoRegisterPage() {
        await this.registerButton.click();
    }
    async gotoForgotpasswordPage() {
        await this.forgotpasswordButton.click();
    }
    //getter for assertion

    get loginTitleText() {
        return this.loginTitle
    }
    get errorMessageEmail() {
        return this.errorMessages.filter({ hasText: "Email is required" });
    }
    get errorMessageEmailFormat() {
        return this.errorMessages.filter({ hasText: "Enter Valid Email" });
    }
    get errorMessagePassw() {
        return this.errorMessages.filter({ hasText: "Password is required" });
    }
    get dashboardPageTitle() {
        return this.containerDashboardPage
    }
    get alerMessageText() {
        return this.alertMessage
    }
    get registerPageTitle() {
        return this.registerPage
    }
    get forgotPassPageTitle() {
        return this.forgotpasswordPage
    }
}