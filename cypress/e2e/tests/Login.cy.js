import SharedElements from "../pages/SharedElements";
import BasePage from "../pages/BasePage";
import LoginPage from "../pages/LoginPage";

describe("Success and Fail login flow", { tags: ['@Login', '@regression'] }, () => {
    let basePage;

    before(() => {
        basePage = new BasePage();
    });

    beforeEach(() => {
        cy.fixture('users.json').as('users');
    });

    it("should login successfully with valid credentials", { tags: '@smoke' }, function () {
        cy.allure().description("Verify that user can login successfully with valid email & password");
        cy.allure().severity("critical");

        cy.allure().step("[CAPTURE] Step 1: Login with valid credentials", () => {
            LoginPage.loginWithUI(this.users.validUser.email, this.users.validUser.password);
        });

        cy.allure().step("Step 2: Verify landing page contains heading 'Media' [CAPTURE]", () => {
            SharedElements.spanHeading.should('contains.text', 'Media');
        });
    });

    it.skip("should fail to login with invalid credentials", { tags: '@smoke' }, function () {
        cy.allure().description("Verify that login fails with invalid email & password");
        cy.allure().severity("normal");

        cy.allure().step("Step 1: Attempt login with invalid credentials", () => {
            LoginPage.loginWithUI(this.users.invalidUser.email, this.users.invalidUser.password);
        });

        cy.allure().step("Step 2: Verify alert message is displayed", () => {
            LoginPage.alertMsg.should('contains.text', 'Wrong email or password');
        });
    });

    it.skip("should perform login and logout", function () {
        cy.allure().description("Verify user can login successfully and logout");
        cy.allure().severity("normal");

        cy.allure().step("Step 1: Login with valid credentials", () => {
            LoginPage.loginWithUI(this.users.validUser.email, this.users.validUser.password);
        });

        cy.allure().step("Step 2: Verify landing page contains heading 'Media'", () => {
            SharedElements.spanHeading.should('contains.text', 'Media');
        });

        cy.allure().step("Step 3: Perform logout", () => {
            LoginPage.logoutwithUI();
        });

        cy.allure().step("Step 4: Verify Sign in page is displayed", () => {
            SharedElements.spanHeading.should('contains.text', 'Sign in to your Account');
        });
    });
});