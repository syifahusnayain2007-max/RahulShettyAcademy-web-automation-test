import { test, expect } from '../fixtures/auth.fixture';
import { MESSAGES } from '../constant/messages';
import { Products } from '../test-data/product-information';
import { DashboardPage } from '../Pages/Dasboard.page';

let dashboardpage: DashboardPage;
test.beforeEach(async ({ page }) => {
    dashboardpage = new DashboardPage(page)
    await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');

})

test('ensure products are filtered by keyword using search box filter', async ({ }) => {
    await dashboardpage.searchItem(Products.productName[0]);
    await dashboardpage.productNameList(Products.productName[0]).waitFor();
    //assertion
    await expect(dashboardpage.productNameList(Products.productName[0])).toContainText(Products.productName[0]);
})

test('ensure products are filtered correctly using price range filter', async ({ }) => {
    await dashboardpage.priceRangeFilter(Products.priceRange.minPrice, Products.priceRange.maxPrice);
    await dashboardpage.productNameList(Products.productName[0]).waitFor();
    //assertion
    await expect(dashboardpage.productNameList(Products.productName[1]) && dashboardpage.productNameList(Products.productName[0])).toBeVisible()
    await dashboardpage.pausePage();
})

test('ensure products are filtered correctly based on selected categories checkbox', async ({ }) => {
    //fashion checked
    await dashboardpage.selectFashionCategory();
    //assertion
    await expect(dashboardpage.productNameList(Products.productName[0]) && dashboardpage.productNameList(Products.productName[2])).not.toBeVisible()
    await expect(dashboardpage.alertPopUp).toHaveText(MESSAGES.noProductsAvailable);
    //electronics checked
    await dashboardpage.selectElectronicsCategory();
    //assertion
    await expect(dashboardpage.productNameList(Products.productName[0]) && dashboardpage.productNameList(Products.productName[2])).toBeVisible()

    //household checked
    await dashboardpage.selectHouseholdCategory();
    //assertion
    await expect(dashboardpage.productNameList(Products.productName[0]) && dashboardpage.productNameList(Products.productName[2])).not.toBeVisible()
    await expect(dashboardpage.alertPopUp).toHaveText(MESSAGES.noProductsAvailable);

})

test('ensure products are filtered correctly based on selected Sub Categories checkbox', async ({ }) => {
    //tshirts checked
    await dashboardpage.selectTShirtsCategory();
    //assertion
    await expect(dashboardpage.alertPopUp).toHaveText(MESSAGES.noProductsAvailable);

    //shirts checked
    await dashboardpage.selectShirtsCategory();
    //assertion
    await expect(dashboardpage.alertPopUp).toHaveText(MESSAGES.noProductsAvailable);

    //mobiles checked
    await dashboardpage.selectMobilesCategory();
    //assertion
    await expect(dashboardpage.productNameList(Products.productName[0]) && dashboardpage.productNameList(Products.productName[2])).toBeVisible()

})
test('ensure user can sign out account from dashboard page', async ({ }) => {
    await dashboardpage.clickSignOut();
    //assertion
    await expect(dashboardpage.logipagetitle).toBeVisible()
})

test('ensure user can add product to cart  from dashboard page', async ({ }) => {
    await dashboardpage.addProducttoCart(Products.productName[0]);
    //assertion CartCount
    await expect(dashboardpage.cartCountText).toHaveText('1');
    await dashboardpage.navigateToCartpage();
    //aseertion item is on Cart Page
    await expect(dashboardpage.itemNameOnCart).toHaveText("ADIDAS ORIGINAL")
})

test('ensure user can go to Cart Page from dashboard page',async({})=>{
    await dashboardpage.navigateToCartpage();
    //assertion message
    await expect(dashboardpage.noItemonCartText).toHaveText(MESSAGES.noProductsonCart);
})

test('ensure user can go to Order Page from dashboard page',async({})=>{
    await dashboardpage.navigateToOrdersPage();
    //assertion message
    await expect(dashboardpage.oderPageTitleText).toHaveText(MESSAGES.orderPageTitle)
})
test('ensure user can view products detail from dashboard page',async({})=>{
    await dashboardpage.viewProduct(Products.productName[0]);
//assertion productText on PDP
await expect(dashboardpage.adidasPDPText).toHaveText(Products.productName[0]);
})


