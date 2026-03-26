import { Locator, Page } from "@playwright/test";

export class OrderHistoryPage {
    page: Page;
    private readonly orderID: Locator;
    private readonly orderTable: Locator;
    private readonly orderHistoryButton: Locator;
    private readonly orderIDCheckout: Locator;
    private readonly table: Locator;
    constructor(page: Page) {
        this.page = page
        this.orderID = page.locator(".em-spacer-1 .ng-star-inserted").nth(1);
        this.table = page.locator("tbody")
        this.orderTable = page.locator("tbody tr");
        this.orderHistoryButton = page.locator("button[routerlink*='myorders']");
        this.orderIDCheckout = page.locator(".col-text")
    }
    async gotoOrderHistoryPage() {
        await this.orderHistoryButton.click();

    }
    async viewOrderDetails(orderIDText: string) {
        await this.table.waitFor({ state: 'visible' })
        for (let i = 0; i < await this.orderTable.count(); i++) {
            const allorderIDText = await this.orderTable.locator('th').nth(i).textContent();
            if (orderIDText.includes(allorderIDText!)) {
                await this.orderTable.nth(i).locator('button').first().click();
                break;
            }
        }

    }
    async orderSummaryID() {
        return await this.orderIDCheckout.textContent()
    }
    async getorderIDNumber() {
        return await this.orderID.textContent()
    }
}