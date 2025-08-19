import BasePage from "../pages/BasePage";
import { default as MediaTaggedFilterPage } from "../pages/MediaTaggedFilterPage";

describe("Verify that the user can input and search using parameters", { tags: ['@Media', '@regression'] }, () => {

    let basePage;

    before(() => {
        cy.login();
        basePage = new BasePage();
        cy.allure().description("Setup: Login and initialize BasePage");
    });

    beforeEach(() => {
        MediaTaggedFilterPage.open();
        cy.fixture('mediaTaggedFilter.json').as('filterData');
        cy.allure().step("Open Media Tagged Filter page and load fixture");
    });
    
    it("filters by Recorded By", function () {
        cy.allure().description("Verify filtering by 'Recorded By' works correctly");
        cy.allure().severity("critical");

        cy.get('@filterData').then((data) => {
            const filter = data.Filter.find(f => f.label === 'Recorded By' && f.type === 'select');
            if (filter) {
                filter.options.forEach(option => {
                    cy.allure().step(`Testing Recorded By with value: ${option.value}`, () => {
                        MediaTaggedFilterPage.selectFilterValue('Recorded By', option.value);
                        MediaTaggedFilterPage.applyFilter();
                        MediaTaggedFilterPage.verifyResultGridHas(option.value);
                        MediaTaggedFilterPage.resetFilter();
                    });
                    cy.allureScreenshot(`screenshot-check`);
                });
            }
        });
    });

    it("filters by Case Number", function () {
        cy.allure().description("Verify filtering by 'Case Number' works correctly");
        cy.allure().severity("critical");

        cy.get('@filterData').then((data) => {
            const filter = data.Filter.find(f => f.label === 'Case Number' && f.type === 'input');
            if (filter) {
                filter.options.forEach(option => {
                    cy.allure().step(`Testing Case Number with value: ${option.value}`, () => {
                        MediaTaggedFilterPage.enterTextFieldValue('Case Number', option.value);
                        MediaTaggedFilterPage.applyFilter();
                        MediaTaggedFilterPage.clickDetailView();
                        MediaTaggedFilterPage.verifyResultTagDetailHas(option.value);
                        MediaTaggedFilterPage.clickButtonBack();
                        MediaTaggedFilterPage.resetFilter();
                    });
                    cy.allureScreenshot(`screenshot-check`);
                });
            }
        });
    });
});
