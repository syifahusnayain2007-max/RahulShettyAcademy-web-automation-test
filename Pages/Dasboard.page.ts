import { Locator, Page } from '@playwright/test'

export class DashboardPage {
    readonly page: Page;
    private readonly searchbox: Locator;
    private readonly listItem: Locator;
    private readonly minPrice: Locator;
    private readonly maxPrice: Locator;
    private readonly fashionCategory: Locator;
    private readonly electronicsCategory: Locator;
    private readonly householdCategory: Locator;
    private readonly tshirtCategory: Locator;
    private readonly shirtsCategory: Locator;
    private readonly mobilesCategory: Locator;
    private readonly signoutButton: Locator;
    private readonly loginpageTitle: Locator;
    private readonly addAdidasProduct: Locator;
    private readonly viewAdidasProduct: Locator;
    private readonly addIphoneProduct: Locator;

    private readonly cartButton: Locator;
    private readonly odersButton: Locator;
    private readonly orderPageTitle: Locator;
    private readonly adidasPDPtext: Locator;
    private readonly itemOnCart: Locator;
    private readonly noItemonCartMessage: Locator;
    private readonly alertMessage: Locator;


    constructor(page: Page) {
        this.page = page;
        this.searchbox = page.getByRole("textbox", { name: "search" });
        this.listItem = page.locator(".card-body");
        this.minPrice = page.getByRole("textbox", { name: "Min Price" });
        this.maxPrice = page.getByRole("textbox", { name: "Max Price" })
        this.fashionCategory = page.getByRole('checkbox').first();
        this.electronicsCategory = page.getByRole('checkbox').nth(1);
        this.householdCategory = page.getByRole('checkbox').nth(2);
        this.tshirtCategory = page.getByRole('checkbox').nth(3);
        this.shirtsCategory = page.getByRole('checkbox').nth(4);
        this.mobilesCategory = page.getByRole('checkbox').nth(6);
        this.signoutButton = page.locator('.fa-sign-out');
        this.loginpageTitle = page.locator("#login");
        this.cartButton = page.locator("[routerlink*='cart']");
        this.odersButton = page.locator("[routerlink*='myorders']");
        this.orderPageTitle = page.locator('div h1');
        this.addAdidasProduct = page.locator('.card-body', { hasText: "ADIDAS ORIGINAL" }).getByText("Add To Cart");
        this.addIphoneProduct = page.locator('.card-body', { hasText: "IPHONE 13 PRO" }).getByText("Add To Cart");

        this.viewAdidasProduct = page.locator('.card-body', { hasText: "ADIDAS ORIGINAL" }).getByText("View");
        this.noItemonCartMessage = page.locator('div h1', { hasText: 'No Products in Your Cart !' });
        this.itemOnCart = page.locator("li h3");
        this.alertMessage = page.locator('.toast-container');
        this.adidasPDPtext = page.locator('div h2');
    }
    async searchItem(item: string) {
        await this.searchbox.fill(item)
        await this.searchbox.press('Enter')
    }

    async priceRangeFilter(min: string, max: string) {
        await this.minPrice.fill(min);
        await this.maxPrice.fill(max);
        await this.maxPrice.press("Enter");

    }
    async selectFashionCategory() {
        await this.fashionCategory.click()
        await this.alertMessage.waitFor({ state: 'visible' })
    }
    async selectElectronicsCategory() {
        await this.fashionCategory.click()
        await this.electronicsCategory.click()

    }
    async selectHouseholdCategory() {
        await this.electronicsCategory.click()
        await this.householdCategory.click()
    }
    async selectTShirtsCategory() {
        await this.tshirtCategory.click();
    }
    async selectShirtsCategory() {
        await this.tshirtCategory.click();
        await this.shirtsCategory.click();
    }
    async selectMobilesCategory() {
        await this.shirtsCategory.click();
        await this.mobilesCategory.click();
    }
    async clickSignOut() {
        await this.signoutButton.click();
    }
    async addProducttoCart(productName: string) {
        await this.listItem.filter({ hasText: productName }).getByText('Add To Cart').click();
    }
    async navigateToCartpage() {
        await this.cartButton.click()
    }
    async navigateToOrdersPage() {
        await this.odersButton.click()
    }
    async viewProduct(productName: string) {
        await this.listItem.filter({ hasText: productName }).getByText('View').click();
    }
    get adidasPDPText() {
        return this.adidasPDPtext;
    }
    get oderPageTitleText() {
        return this.orderPageTitle;
    }

    get noItemonCartText() {
        return this.noItemonCartMessage;
    }
    get itemNameOnCart() {
        return this.itemOnCart;
    }
    get cartCountText() {
        return this.cartButton.locator('label');
    }
    get logipagetitle() {
        return this.loginpageTitle;
    }
    productNameList(productName: string) {
        return this.listItem.filter({ hasText: productName });
    }
    get alertPopUp() {
        return this.alertMessage;
    }
    async pausePage() {
        await this.page.pause()
    }
}


