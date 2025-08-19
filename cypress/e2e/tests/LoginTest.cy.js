import SharedElements from "../pages/SharedElements";
import BasePage from "../pages/BasePage";
import LoginPage from "../pages/LoginPage";

describe("Success and Fail login flow", { tags: ['@Login', '@regression'] }, () => {
    let basePage;

    before(() => {
        basePage = new BasePage();
    });

    beforeEach(() => {
        cy.clearAllCookies();
        cy.fixture('users.json').as('users');
    });

    it("should login successfully with valid credentials", { tags: '@smoke' }, function () {
        cy.allure().description("Verify that user can login successfully with valid email & password");
        cy.allure().severity("critical");

        cy.allure().step("Step 1: Login with valid credentials");
        LoginPage.loginWithUI(this.users.validUser.email, this.users.validUser.password);

        cy.allure().step("Step 2: Verify landing page contains heading 'Media'");
        SharedElements.spanHeading.should('contain.text', 'Media');
        cy.allureScreenshot("screenshot-check");
    });

    it("should fail to login with invalid credentials", { tags: '@smoke' }, function () {
        cy.allure().description("Verify that login fails with invalid email & password");
        cy.allure().severity("normal");

        cy.allure().step("Step 1: Attempt login with invalid credentials");
        LoginPage.loginWithUI(this.users.invalidUser.email, this.users.invalidUser.password);

        cy.allure().step("Step 2: Verify alert message is displayed");
        LoginPage.alertMsg.should('contain.text', 'Wrong email or password');
        cy.allureScreenshot("screenshot-check");
    });
});
