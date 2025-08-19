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

// Cypress.Commands.add("allureScreenshot", (name = "screenshot-result") => {
//     cy.screenshot(name, { capture: "runner" }).then(() => {
//         const screenshotPath = `cypress/screenshots/${Cypress.spec.name}/${name}.png`;
//         cy.readFile(screenshotPath, 'base64').then((imgData) => {
//             cy.allure().fileAttachment(name, imgData, "image/png");
//         });
//     });
// });

// cypress/support/commands.js
Cypress.Commands.add("allureScreenshot", (name = "screenshot-result") => {
  const safeName = name.replace(/[^a-zA-Z0-9-_]/g, "_");

  const now = new Date();
  const timestamp = now.toISOString().replace(/[-:T.Z]/g, "").slice(0, 14); 

  const fileName = `${safeName}_${timestamp}.png`;
  const screenshotsFolder = Cypress.config("screenshotsFolder");
  const specName = Cypress.spec.name.replace(/\\/g, "/");

  const screenshotPath = `${screenshotsFolder}/${specName}/${fileName}`;

  cy.screenshot(`${specName}/${safeName}_${timestamp}`).then(() => {
    cy.readFile(screenshotPath, "base64", { timeout: 20000 }).then((imgData) => {
      cy.allure().fileAttachment(fileName, imgData, "image/png");
    });
  });
});










