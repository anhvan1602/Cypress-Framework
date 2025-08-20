import BasePage from "../pages/BasePage";
import { default as MediaTaggedFilterPage } from "../pages/MediaTaggedFilterPage";

const filterData = require("../../fixtures/mediaTaggedFilter.json"); // chú ý path từ e2e/tests

const recordedByFilter = filterData.Filter.find(f => f.label === 'Recorded By' && f.type === 'select');
const recordedByOptions = recordedByFilter ? recordedByFilter.options : [];

const caseNumberFilter = filterData.Filter.find(f => f.label === 'Case Number' && f.type === 'input');
const caseNumberOptions = caseNumberFilter ? caseNumberFilter.options : [];

const incidentNumberFilter = filterData.Filter.find(f => f.label === 'Incident Number' && f.type === 'input');
const incidentNumberOptions = incidentNumberFilter ? incidentNumberFilter.options : [];

const evidentiaryFilter = filterData.Filter.find(f => f.label === 'Evidentiary' && f.type === 'checkbox');
const evidentiaryOptions = evidentiaryFilter ? evidentiaryFilter.options : [];

const recordedTimeFilter = filterData.Filter.find(f => f.label === 'Recorded Time' && f.type === 'input-range');
const recordedTimeRanges = recordedTimeFilter ? recordedTimeFilter.ranges : [];

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
            cy.allure().severity("normal");

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
            cy.allure().severity("normal");

            MediaTaggedFilterPage.enterTextFieldValue('Case Number', option.value);
            MediaTaggedFilterPage.applyFilter();
            MediaTaggedFilterPage.clickDetailView();
            MediaTaggedFilterPage.verifyResultTagDetailHas(option.value);
            MediaTaggedFilterPage.clickButtonBack();
            MediaTaggedFilterPage.resetFilter();
        });
    });

    // ----- Incident Number -----
    incidentNumberOptions.forEach(option => {
        it(`filters by Incident Number = ${option.value}`, function () {
            cy.allure().description(`Verify filtering by 'Incident Number' with value: ${option.value}`);
            cy.allure().severity("normal");

            MediaTaggedFilterPage.enterTextFieldValue('Incident Number', option.value);
            MediaTaggedFilterPage.applyFilter();
            MediaTaggedFilterPage.clickDetailView();
            MediaTaggedFilterPage.verifyResultTagDetailHas(option.value);
            MediaTaggedFilterPage.clickButtonBack();
            MediaTaggedFilterPage.resetFilter();
        });
    });

    // ----- Evidentiary -----
    evidentiaryOptions.forEach(option => {
        it(`filters by Evidentiary = ${option.value}`, function () {
            cy.allure().description(`Verify filtering by 'Evidentiary' with value: ${option.value}`);
            cy.allure().severity("normal");

            MediaTaggedFilterPage.selectCheckboxValue('Evidentiary', option.value);
            MediaTaggedFilterPage.applyFilter();
            // Map Yes -> true, No -> false
            const expectedValue = option.value === "Yes" ? true : false;
            MediaTaggedFilterPage.verifyResultGridHas(`Evidentiary: ${expectedValue}`);
            MediaTaggedFilterPage.resetFilter();
        });
    });

    // ----- Recorded Time -----
    recordedTimeRanges.forEach(range => {
        it.skip(`filters by Recorded Time range: ${range.from} - ${range.to}`, function () {
            cy.allure().description(`Verify filtering by 'Recorded Time' between ${range.from} and ${range.to}`);

            MediaTaggedFilterPage.enterDateInput("From", range.from);
            MediaTaggedFilterPage.enterDateInput("To", range.to);

            MediaTaggedFilterPage.applyFilter();

            MediaTaggedFilterPage.verifyGridRecordedTimeBetween(range.from, range.to);

            MediaTaggedFilterPage.resetFilter();
        });
    });
});
