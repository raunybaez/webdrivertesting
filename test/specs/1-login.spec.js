import LoginPage from '../pageobjects/login.page'
import loginPage from '../pageobjects/login.page';
const utilities= require("../../support/utils/Utilities");

describe('login form', () => {
    it('should deny access with blocked account', () => {
        LoginPage.open();
        LoginPage.username.setValue('foo');
        LoginPage.password.setValue('bar');
        LoginPage.submit();
        expect(LoginPage.globalError).toHaveText('YOUR ACCOUNT HAS BEEN BLOCKED AFTER MULTIPLE CONSECUTIVE LOGIN ATTEMPTS.', { wait: 20000 });
    });
    
    it('should deny access with wrong credentials', () => {
        LoginPage.open();
        LoginPage.username.setValue('foooooo' + utilities.getRandomInt(50));
        LoginPage.password.setValue('baaarr');
        LoginPage.submit();
        expect(LoginPage.globalError).toHaveText('WRONG USERNAME OR PASSWORD.', { wait: 20000 });
    });
    
    it('should error on a missing email', function () {
        LoginPage.open();
        LoginPage.password.setValue('bar');
        LoginPage.submit();
        expect(LoginPage.userPwdMsg).toHaveText('Can\'t be blank', { wait: 20000 });
    });
    
    it('should error on an invalid email', function () {
        LoginPage.open();
        LoginPage.username.setValue('@@@$$$%%%%');
        LoginPage.submit();
        expect(LoginPage.userPwdMsg).toHaveText('Invalid', { wait: 20000 });
    });

    it('should error on missing password', function () {
        LoginPage.open();
        LoginPage.username.setValue('foo');
        LoginPage.submit();
        expect(LoginPage.userPwdMsg).toHaveText('Can\'t be blank', { wait: 20000 });
    });

    it('should allow password reset', () => {
        LoginPage.open();
        LoginPage.forgotPwdLink.click();
        browser.pause(1000);
        LoginPage.resetPwd.waitForExist({ wait: 5000 });
        LoginPage.email.setValue('abc@abc.com');
        LoginPage.submit();
        expect(LoginPage.globalError).toHaveText('WE\'VE JUST SENT YOU AN EMAIL TO RESET YOUR PASSWORD.', { wait: 20000 });
    });

    it('should allow access with correct credentials', () => {
        LoginPage.open();
        loginPage.login();
        LoginPage.logout();
    });

    it('should allow access with Okta SSO credentials', () => {
        LoginPage.open();
        LoginPage.username.setValue('test@biobright.abc');
        //expect(LoginPage.password).toExist();
        LoginPage.submit();
        LoginPage.oktaUsername.waitForExist();
        LoginPage.oktaUsername.setValue('dev-user@biobright.com');
        LoginPage.oktaPassword.setValue('aug_waif6eam2FAUT');
        LoginPage.oktaSubmitBtn.click();
        LoginPage.navLinks.waitForExist();
        LoginPage.logout();
    });
});