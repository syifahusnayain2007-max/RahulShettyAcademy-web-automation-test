import { Locator,Page } from "@playwright/test";

export class OrderPage {
    page:Page
    private readonly emailConfirmation:Locator;
    private readonly selectCountryUser:Locator;
        private readonly countryButton:Locator;
    private readonly placeOrderButton:Locator;

    constructor (page:Page){
    this.page = page
    this.emailConfirmation = page.locator(".mt-5 [type='text']").first();
    this.selectCountryUser = page.getByPlaceholder("Select Country");
    this.placeOrderButton = page.getByText("PLACE ORDER");
    this.countryButton = page.getByRole("button")
    }
async selectCountry(country:string){
    await this.selectCountryUser.pressSequentially(country,{delay:150});
    await this.countryButton.filter({hasText:country}).waitFor({state:"visible"});
    await this.countryButton.filter({hasText:country}).click();
}
async placingOrder(){
    await this.placeOrderButton.click()
}
get checkingCountry(){
    return this.selectCountryUser;
}
get emailOrder(){
    return this.emailConfirmation;
}
}