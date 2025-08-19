import BasePage from "./BasePage";
const routes = require('../config/routes');
import { ENDPOINT_PREFIX } from "../config/CONSTANTS";

class LoginPage extends BasePage{

    get loginInputDems() { return cy.get('input[name="userEmail"]'); }
    get loginBtnDems() { return cy.get('button').contains('Sign in'); }
    get loginInputAuth0() { return cy.get('input[id="username"]').clear(); }
    get passwordInputAuth0() { return cy.get('input[id="password"]'); }
    get loginBtnAuth0() { return cy.get('button').contains('Continue'); }
    get alertMsg() { return cy.get('span'); }

    //Logout
    get userInfo() { return cy.get('div[title="User information"]'); }
    get singoutBtn() { return cy.contains('Sign out'); }

    open() {
        //cy.visit('?route=login?redirect=/');   //Prefixes the baseUrl
        //cy.visit(Cypress.env('URL'));   //loads the URL from env object in cypress.config.js
        //return super.open(ENDPOINT_PREFIX + routes.LOGIN_ENDPOINT)
        cy.visit('')
    }

    loginWithUI(email, password) {
        this.open();
        this.loginInputDems.type(email)
        this.loginBtnDems.click()
        this.loginInputAuth0.type(email)
        this.passwordInputAuth0.type(password)
        this.loginBtnAuth0.click()
    }
    logoutwithUI() {
        this.userInfo.click();
        this.singoutBtn.click();
    }

}


export default new LoginPage();

