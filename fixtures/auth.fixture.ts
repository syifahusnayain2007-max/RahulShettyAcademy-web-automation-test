import { test as base} from '@playwright/test'
export {expect} from '@playwright/test'

export const test = base.extend({
    page : async ({request,page},use)=>{
    const response = await request.post('https://rahulshettyacademy.com/api/ecom/auth/login',
    {
        data : {userEmail:process.env.USER_EMAIL,userPassword:process.env.USER_PASSWORD}
    })
      const responseBody = await response.json()
      await page.addInitScript(value=>{
        window.localStorage.setItem('token',value);
      },responseBody.token);

      await use(page);
    }
 
})