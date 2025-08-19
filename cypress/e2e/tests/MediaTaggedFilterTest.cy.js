import BasePage from "../pages/BasePage";
import { default as MediaTaggedFilterPage } from "../pages/MediaTaggedFilterPage";

const filterData = require("../../fixtures/mediaTaggedFilter.json"); // chú ý path từ e2e/tests

// Tách options ngay tại load file
const recordedByFilter = filterData.Filter.find(f => f.label === 'Recorded By' && f.type === 'select');
const recordedByOptions = recordedByFilter ? recordedByFilter.options : [];

const caseNumberFilter = filterData.Filter.find(f => f.label === 'Case Number' && f.type === 'input');
const caseNumberOptions = caseNumberFilter ? caseNumberFilter.options : [];

describe("Verify that the user can input and search using parameters", { tags: ['@Media', '@regression'] }, () => {

    let basePage;

    before(() => {
        cy.clearAllCookies();
        cy.login();
        basePage = new BasePage();
        cy.allure().description("Setup: Login and initialize BasePage");
    });

    beforeEach(() => {
        MediaTaggedFilterPage.open();
        cy.allure().step("Open Media Tagged Filter page");
    });

    // ----- Recorded By -----
    recordedByOptions.forEach(option => {
        it(`filters by Recorded By = ${option.value}`, function () {
            cy.allure().description(`Verify filtering by 'Recorded By' with value: ${option.value}`);
            cy.allure().severity("critical");

            MediaTaggedFilterPage.selectFilterValue('Recorded By', option.value);
            MediaTaggedFilterPage.applyFilter();
            MediaTaggedFilterPage.verifyResultGridHas(option.value);
            MediaTaggedFilterPage.resetFilter();
        });
    });

    // ----- Case Number -----
    caseNumberOptions.forEach(option => {
        it(`filters by Case Number = ${option.value}`, function () {
            cy.allure().description(`Verify filtering by 'Case Number' with value: ${option.value}`);
            cy.allure().severity("critical");

            MediaTaggedFilterPage.enterTextFieldValue('Case Number', option.value);
            MediaTaggedFilterPage.applyFilter();
            MediaTaggedFilterPage.clickDetailView();
            MediaTaggedFilterPage.verifyResultTagDetailHas(option.value);
            MediaTaggedFilterPage.clickButtonBack();
            MediaTaggedFilterPage.resetFilter();
        });
    });
});
