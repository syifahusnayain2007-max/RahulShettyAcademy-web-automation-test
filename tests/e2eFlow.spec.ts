import { test, expect } from '@playwright/test';
import { userData } from '../test-data/account-information';
import { Products } from '../test-data/product-information';
import { DashboardPage } from '../Pages/Dasboard.page';
import { LoginPage } from '../Pages/Login.page';
import { CartPage } from '../Pages/Cart.page';
import { OrderPage } from '../Pages/Order.page';
import { OrderHistoryPage } from '../Pages/OrderHistory.page';

let loginpage: LoginPage;
let dashboardpage: DashboardPage;
let cartpage: CartPage;
let orderpage: OrderPage;
let orderhistorypage: OrderHistoryPage;

test.beforeEach(async ({ page }) => {
    loginpage = new LoginPage(page);
    dashboardpage = new DashboardPage(page);
    cartpage = new CartPage(page);
    orderpage = new OrderPage(page);
    orderhistorypage = new OrderHistoryPage(page);
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#login').waitFor({ state: 'visible' });
})

test("ensure user can login, checkout products and check order details", async ({ }) => {
    //Login using valid credentials
    await loginpage.inputEmail(process.env.USER_EMAIL!);
    await loginpage.inputPassword(process.env.USER_PASSWORD!);
    await loginpage.clickLogin();
    //assertion login succesfully
    await expect(loginpage.dashboardPageTitle).toBeVisible();

    //add products to cart
    await (loginpage.dashboardPageTitle).waitFor({ state: 'visible' });
    await dashboardpage.addProducttoCart(Products.productName[0]);
    await (dashboardpage.cartCountText).waitFor({ state: 'visible' })
    await dashboardpage.addProducttoCart(Products.productName[2]);
    await (dashboardpage.cartCountText).waitFor({ state: 'visible' })

    //assertion CartCount
    await expect(dashboardpage.cartCountText).toHaveText('2');

    //navigate to Cart Page
    await dashboardpage.navigateToCartpage();

    //aseertion item is on Cart Page
    await expect(cartpage.productListText).toHaveCount(2)
    await cartpage.checkoutProducts()

    //OrderPage (assertion email order, select country)
    await expect(orderpage.emailOrder).toHaveText(process.env.USER_EMAIL!);
    await orderpage.selectCountry(userData.validUser.country);
    //assertion country
    await expect(orderpage.checkingCountry).toHaveValue(userData.validUser.country);
    await orderpage.placingOrder();

    //get orderdetails
    const orderIDText = await orderhistorypage.getorderIDNumber()

    //navigate to order history page
    await orderhistorypage.gotoOrderHistoryPage();
    await orderhistorypage.viewOrderDetails(orderIDText!);
    const summaryID = await orderhistorypage.orderSummaryID()
    //assertion orderID
    expect(orderIDText).toContain(summaryID)


})
