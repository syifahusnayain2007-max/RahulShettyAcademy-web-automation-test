import { Locator, Page } from '@playwright/test'

export class RegisterPage {

    private readonly page: Page;

    //Locators
    private readonly txtFirstName: Locator;
    private readonly txtLastName: Locator;
    private readonly txtUserEmail: Locator;
    private readonly txtUserPhone: Locator;
    readonly selectOccupation: Locator;
    readonly txtPassword: Locator;
    readonly txtConfirmPassword: Locator;
    private readonly ageConfirmation: Locator;
    private readonly submitButton: Locator;
    private readonly errorMessage: Locator;
    private readonly ageErrorMessage: Locator;
    readonly registerSuccessMessage: Locator;
    private readonly userExist: Locator;

    constructor(page: Page) {
        this.page = page;
        this.txtFirstName = page.locator("#firstName");
        this.txtLastName = page.locator("#lastName");
        this.txtUserEmail = page.locator("#userEmail");
        this.txtUserPhone = page.locator("#userMobile");
        this.selectOccupation = page.locator(".custom-select");
        this.txtPassword = page.getByPlaceholder('Passsword', { exact: true });
        this.txtConfirmPassword = page.getByPlaceholder('Confirm Passsword', { exact: true });
        this.ageConfirmation = page.locator(".col-md-1");
        this.submitButton = page.locator('input[type="submit"]');
        this.errorMessage = page.locator(".invalid-feedback");
        this.ageErrorMessage = page.getByText('Please check above checkbox');
        this.registerSuccessMessage = page.locator(".headcolor");
        this.userExist = page.locator("#toast-container");
    }

    async setFirstName(fname: string): Promise<void> {
        await this.txtFirstName.fill(fname);
    }
    async setLastName(lname: string): Promise<void> {
        await this.txtLastName.fill(lname);
    }
    async setUserEmail(email: string): Promise<void> {
        await this.txtUserEmail.fill(email);
    }
    async setUserPhone(phone: string): Promise<void> {
        await this.txtUserPhone.fill(phone);
    }
    async getValuePhone(): Promise<string> {
        return await this.txtUserPhone.inputValue();
    }
    async selectGender(gender: string) {
        await this.page.getByRole("radio", { name: `${gender}`, exact: true }).check();

    }
    async setOccupation(occupation: string): Promise<void> {
        await this.selectOccupation.selectOption(occupation)
    }

    async setPassword(password: string): Promise<void> {
        await this.txtPassword.fill(password);
    }
    async setConfPassword(confPassword: string): Promise<void> {
        await this.txtConfirmPassword.fill(confPassword)
    }
    async setAgeConfirmation() {
        await this.ageConfirmation.click();
    }
    async clicksubmitButton() {
        await this.submitButton.click();
    }
    getsetGender(gender: string) {
        return this.page.getByRole("radio", { name: `${gender}`, exact: true });
    }
    get registerSuccessText() {
        return this.registerSuccessMessage
    }
    get errorMessageAll() {
        return this.errorMessage
    }
    get nameBlank() {
        return this.errorMessage.filter({ hasText: "*First Name is required" })
    };
    get emailBlank() {
        return this.errorMessage.filter({ hasText: "*Email is required" })
    };

    get passwBlank() {
        return this.errorMessage.filter({ hasText: "*Password is required" })
    };

    get confpasswBlank() {
        return this.errorMessage.filter({ hasText: "Confirm Password is required" })
    };

    get phonenumberBlank() {
        return this.errorMessage.filter({ hasText: "*Phone Number is required" })
    };
    get phonedigitErrorMessage() {
        return this.errorMessage.filter({ hasText: "*Phone Number must be 10 digit" })
    }
    get phoneFormatErrorMessage() {
        return this.errorMessage.filter({ hasText: "*only numbers is allowed" })
    }
    ;
    get AgeErrorMessage() {
        return this.ageErrorMessage
    }
    get userExistMessage() {
        return this.userExist

    }
}