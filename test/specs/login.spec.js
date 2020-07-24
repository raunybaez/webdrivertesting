import LoginPage from '../pageobjects/login.page'
import loginPage from '../pageobjects/login.page';
const utilities= require("../../support/utils/Utilities");

describe('login form', () => {
    it('should allow access with correct credentials', () => {
        LoginPage.open();
        loginPage.login();
        LoginPage.logout();
    });
});