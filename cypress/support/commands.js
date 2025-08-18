// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import LoginPage from "../e2e/pages/LoginPage"

Cypress.Commands.add('login', () => {
  cy.fixture('users.json').then((users) => {
    const email = users.validUser.email;
    const password = users.validUser.password;
    
    LoginPage.loginWithUI(email, password);
    cy.url().should('include', '/media/inbox');
  });
});


import '@shelex/cypress-allure-plugin';

const originalStep = Cypress.Allure.reporterRuntime?.step;

if (originalStep) {
  Cypress.Allure.reporterRuntime.step = function (name, ...args) {
    // Gọi step gốc để vẫn log vào Allure
    const result = originalStep.call(this, name, ...args);

    // Chỉ screenshot nếu step có chứa [CAPTURE]
    if (/\[CAPTURE\]/i.test(name)) {
      const screenshotName = name.replace(/[/\\?%*:|"<>]/g, '-');

      cy.screenshot(screenshotName, { capture: 'viewport' }).then(() => {
        const filePath = `cypress/screenshots/${Cypress.spec.name}/${screenshotName}.png`;
        cy.allure().fileAttachment(`${screenshotName}.png`, filePath, 'image/png');
      });
    }

    return result;
  };
}

