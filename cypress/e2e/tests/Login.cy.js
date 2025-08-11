import SharedElements from "../pages/SharedElements";
import BasePage from "../pages/BasePage";
import LoginPage from "../pages/LoginPage";

describe("Success and Fail login flow", { tags: ['@Login', '@regression'] }, () => {

    let basePage;

    before(() => {
        basePage = new BasePage();
    })

    beforeEach(() => {
        cy.fixture('users.json').as('users')
    })

    
    it("should login successfully with valid credentials", {tags: '@smoke'}, function () {

        LoginPage
            .loginWithUI(this.users.validUser.email, this.users.validUser.password)

        SharedElements.spanHeading
            .should('contains.text', 'Media');
    })

    it("should fail to login with invalid credentials", {tags: '@smoke'}, function () {

        LoginPage
            .loginWithUI(this.users.invalidUser.email, this.users.invalidUser.password)

        LoginPage.alertMsg
            .should('contains.text', 'Wrong email or password');
    })

    it.skip("should perform login and logout", function () {

        LoginPage
            .loginWithUI(this.users.validUser.email, this.users.validUser.password)

        SharedElements.spanHeading
            .should('contains.text', 'Media');

        LoginPage.logoutwithUI();

        SharedElements.spanHeading
            .should('contains.text', 'Sign in to your Account');
    })
})