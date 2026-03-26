import {test,expect} from '@playwright/test'
import { RegisterPage } from '../Pages/Register.page';
import { MESSAGES } from '../constant/messages';
import { userData } from '../test-data/account-information';
import { generateUser } from '../utils/dataGenerator';
import { User } from '../types/User';

let registerPage:RegisterPage;
let user : User;

test.beforeEach(async({page})=>
{
    registerPage = new RegisterPage(page)
    await page.goto('https://rahulshettyacademy.com/client/#/auth/register');
    await page.getByPlaceholder('enter your number').waitFor({state:'visible'})
    user = generateUser()
})


 test('Ensure user input valid phone number on registration page', async({})=>
{
    await registerPage.setUserPhone(process.env.USER_PHONE!);
    await registerPage.clicksubmitButton();
  const valuePhonenumber =  await registerPage.getValuePhone()
let hasError = false
if(!/^[0-9]+$/.test(valuePhonenumber))
//cek Phonenumber is a validnumber 
{

//assertion error message
await expect(registerPage.phoneFormatErrorMessage).toContainText(MESSAGES.invalidPhoneFormat);

hasError = true
}

//cek phonenumber is 10 digits
if(valuePhonenumber.length !== 10)
{
//assertion error messages
await expect(registerPage.phonedigitErrorMessage).toBeVisible();
await expect(registerPage.phonedigitErrorMessage).toHaveText(MESSAGES.invalidPhoneLength);
hasError = true
}
if (hasError) 
{
    return;
}

else{
console.log(MESSAGES.phoneApplied)
}
//assertion if user input valid phone number
await expect(registerPage.phoneFormatErrorMessage).toBeHidden();
await expect(registerPage.phonedigitErrorMessage).toBeHidden();
}) 


test("Ensure user can register using valid mandatory data",async ({})=>
{
await registerPage.setFirstName(user.firstName);
await registerPage.setLastName(user.lastName);
await registerPage.setUserEmail(user.email);
await registerPage.setUserPhone(process.env.USER_PHONE!);
await registerPage.setOccupation(userData.validUser.occupation);
await registerPage.selectGender(userData.validUser.gender);
await registerPage.setPassword(process.env.USER_PASSWORD!);
await registerPage.setConfPassword(process.env.USER_PASSWORD!);
await registerPage.setAgeConfirmation();
await registerPage.clicksubmitButton();

//assertion account succesfully created
await expect(registerPage.registerSuccessMessage).toHaveText(MESSAGES.accountCreated)

})

test("Ensure user can register account without selecting gender and occupation",async({})=>
{
await registerPage.setFirstName(user.firstName);
await registerPage.setLastName(user.lastName);
await registerPage.setUserEmail(user.email);
await registerPage.setUserPhone(process.env.USER_PHONE!);
await registerPage.setPassword(process.env.USER_PASSWORD!);
await registerPage.setConfPassword(process.env.USER_PASSWORD!);
await registerPage.setAgeConfirmation();
await registerPage.clicksubmitButton();

//assertion account succesfully created
await expect(registerPage.registerSuccessMessage).toHaveText(MESSAGES.accountCreated)
})

test("ensure user can not register  account using empty mandatory field",async({})=>
{
await registerPage.clicksubmitButton();
//assertion error messages
await expect(registerPage.errorMessageAll).toContainText(
  [ MESSAGES.invaliNameFormat,
  MESSAGES.emailEmpty,
  MESSAGES.phoneRequired,
  MESSAGES.invaliPasswrodFormat,
  MESSAGES.invaliConfPassFormat]);
await expect(registerPage.AgeErrorMessage).toContainText(MESSAGES.invalidCheckbox);

})

test("ensure user cannot register account using invalid phone number format",async({})=>
{
await registerPage.setFirstName(user.firstName);
await registerPage.setLastName(user.lastName);
await registerPage.setUserEmail(user.email);
await registerPage.setUserPhone(process.env.USER_INVPHONE!);
await registerPage.setOccupation(userData.validUser.occupation);
await registerPage.selectGender(userData.validUser.gender);
await registerPage.setPassword(process.env.USER_PASSWORD!);
await registerPage.setConfPassword(process.env.USER_PASSWORD!);
await registerPage.setAgeConfirmation();
await registerPage.clicksubmitButton();
//assertion error messages
await expect(registerPage.errorMessageAll).toContainText(MESSAGES.invalidPhoneFormat);

})

test("ensure user cannot register account using invalid email format",async({})=>
{
await registerPage.setFirstName(user.firstName);
await registerPage.setLastName(user.lastName);
await registerPage.setUserEmail(process.env.USER_INVEMAIL!);
await registerPage.setUserPhone(process.env.USER_PHONE!);
await registerPage.setOccupation(userData.validUser.occupation);
await registerPage.selectGender(userData.validUser.gender);
await registerPage.setPassword(process.env.USER_PASSWORD!);
await registerPage.setConfPassword(process.env.USER_PASSWORD!);
await registerPage.setAgeConfirmation();
await registerPage.clicksubmitButton();
//assertion error message
await expect(registerPage.errorMessageAll).toContainText(MESSAGES.InvalidEmailFormat);


})

test("ensure user cannot register account with an already registered email",async({})=>
{
await registerPage.setFirstName(user.firstName);
await registerPage.setLastName(user.lastName);
await registerPage.setUserEmail(process.env.USER_EMAIL!);
await registerPage.setUserPhone(process.env.USER_PHONE!);
await registerPage.setOccupation(userData.validUser.occupation);
await registerPage.selectGender(userData.validUser.gender);
await registerPage.setPassword(process.env.USER_PASSWORD!);
await registerPage.setConfPassword(process.env.USER_PASSWORD!);
await registerPage.setAgeConfirmation();
await registerPage.clicksubmitButton();
//assertion error message
await expect(registerPage.userExistMessage).toBeVisible();
await expect(registerPage.userExistMessage).toHaveText(' User already exisits with this Email Id! ')


})

test("ensure user cannot register using invalid Password format",async({})=>
{
await registerPage.setFirstName(user.firstName);
await registerPage.setLastName(user.lastName);
await registerPage.setUserEmail(user.email);
await registerPage.setUserPhone(process.env.USER_PHONE!);
await registerPage.setOccupation(userData.validUser.occupation);
await registerPage.selectGender(userData.validUser.gender);
await registerPage.setPassword(process.env.USER_INVPASSWORD!);
await registerPage.setConfPassword(process.env.USER_INVPASSWORD!);
await registerPage.setAgeConfirmation();
await registerPage.clicksubmitButton();
//assertion error message
await expect(registerPage.userExistMessage).toBeVisible();
await expect(registerPage.userExistMessage).toHaveText(' Please enter 1 Special Character, 1 Capital 1, Numeric 1 Small ');

})
test("ensure user cannot register with mismatch Password and Confirm Password",async({})=>
{
await registerPage.setFirstName(user.firstName);
await registerPage.setLastName(user.lastName);
await registerPage.setUserEmail(user.email);
await registerPage.setUserPhone(process.env.USER_PHONE!);
await registerPage.setOccupation(userData.validUser.occupation);
await registerPage.selectGender(userData.validUser.gender);
await registerPage.setPassword(process.env.USER_PASSWORD!);
await registerPage.setConfPassword(process.env.USER_INVPASSWORD!);
await registerPage.setAgeConfirmation();
await registerPage.clicksubmitButton();
//assertion error message
await expect(registerPage.errorMessageAll).toHaveText('Password and Confirm Password must match with each other.');
})

//this test should be on ER
test("ensure the password entered on \"password\" field should hide its visibilty",async({})=>
{
await registerPage.setPassword(process.env.USER_PASSWORD!);
await registerPage.setConfPassword(process.env.USER_PASSWORD!);
//assertion message
await expect(registerPage.txtPassword && registerPage.txtConfirmPassword).toHaveAttribute('type', 'password');
})

test("ensure user cannot register with phone number below minimum length",async({})=>
{
await registerPage.setFirstName(user.firstName);
await registerPage.setLastName(user.lastName);
await registerPage.setUserEmail(user.email);
await registerPage.setUserPhone(process.env.USER_INVPHONE!);
await registerPage.setOccupation(userData.validUser.occupation);
await registerPage.selectGender(userData.validUser.gender);
await registerPage.setPassword(process.env.USER_PASSWORD!);
await registerPage.setConfPassword(process.env.USER_PASSWORD!);
await registerPage.setAgeConfirmation();
await registerPage.clicksubmitButton();
//assertion error messages
await expect(registerPage.errorMessageAll).toContainText(MESSAGES.invalidPhoneLength);

})

test("ensure user cannot register with password below minimum length",async ({})=>
{
await registerPage.setFirstName(user.firstName);
await registerPage.setLastName(user.lastName);
await registerPage.setUserEmail(user.email);
await registerPage.setUserPhone(process.env.USER_INVPHONE!);
await registerPage.setOccupation(userData.validUser.occupation);
await registerPage.selectGender(userData.validUser.gender);
await registerPage.setPassword(process.env.USER_PASSWORD!);
await registerPage.setConfPassword(process.env.USER_PASSWORD!);
await registerPage.setAgeConfirmation();
await registerPage.clicksubmitButton();
//assertion error message
await expect(registerPage.errorMessageAll).toContainText(MESSAGES.invalidPhoneLength);
})

test("Ensure user can select only one option in the Gender radio button",async({})=>
{
await registerPage.setFirstName(user.firstName);
await registerPage.setLastName(user.lastName);
await registerPage.setUserEmail(user.email);
await registerPage.setUserPhone(process.env.USER_PHONE!);
await registerPage.setOccupation(userData.validUser.occupation);
await registerPage.selectGender(userData.validUser.gender);
await registerPage.setPassword(process.env.USER_PASSWORD!);
await registerPage.setConfPassword(process.env.USER_PASSWORD!);
await registerPage.setAgeConfirmation();
await registerPage.clicksubmitButton();

//assertion
await expect(registerPage.getsetGender(userData.validUser.gender2)).not.toBeChecked()
})

test("ensure user can select an option from \"Occupation\" dropdown",async({})=>
{
await registerPage.setFirstName(user.firstName);
await registerPage.setLastName(user.lastName);
await registerPage.setUserEmail(user.email);
await registerPage.setUserPhone(process.env.USER_PHONE!);
await registerPage.setOccupation(userData.validUser.occupation);
await registerPage.selectGender(userData.validUser.gender);
await registerPage.setPassword(process.env.USER_PASSWORD!);
await registerPage.setConfPassword(process.env.USER_PASSWORD!);
await registerPage.setAgeConfirmation();
await registerPage.clicksubmitButton();

await expect(registerPage.selectOccupation).toHaveValue("1: Doctor")
})