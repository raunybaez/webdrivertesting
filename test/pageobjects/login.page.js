import Page from './page'
import testData from '../data/testdata'

class LoginPage extends Page {

    get username() { return $('input[name="username"]'); }
    get password() { return $('input[name="password"]'); }
    get submitBtn() { return $('form button[type="submit"]'); }
    get globalError() { return $('.animated'); }
    get userPwdMsg() { return $('.auth0-lock-error-msg');}
    get forgotPwdLink() {return $('*=password?');}
    get email() {return $('.auth0-lock-input');}
    get resetPwd() {return $('.auth0-lock-header-welcome > div');}
    get navLinks() {return $('.nav-bar-content');}
    get oktaUsername() {return $('#okta-signin-username');}
    get oktaPassword() {return $('#okta-signin-password');}
    get oktaSubmitBtn() {return $('#okta-signin-submit');}
    get logoutBtn() {return $('#ember19');}

    open() {
        super.open('login');
        return this;
    }
    
    /**
     * Enter the username and password to login
     * @param {String} text username to be entered
     * @param {String} text password to be entered
     */

    login(){
        this.username.setValue(testData.userName)
        this.password.setValue(testData.password)
        this.submit()
        this.navLinks.waitForExist()
    }
    
    logout(){
        browser.url('logout');
        return this;
    }

    submit() {
        this.submitBtn.click();
    }

    getErrorMsg(){
        this.globalError.waitForExist({timeout: 20000});
        return this.globalError.getText();
        return this;
    }
}

export default new LoginPage();