import { Page,Locator } from '@playwright/test'

export class CartPage{
    readonly page:Page;
    private readonly checkoutButton:Locator;
        private readonly itemList:Locator;

    constructor(page:Page){
        this.page = page
        this.itemList = page.locator('li h3');
        this.checkoutButton = page.locator('li button',{hasText:'Checkout'});
    }
async checkoutProducts(){
    await this.checkoutButton.click();
}
get productListText(){
    return this.itemList;
}
}

