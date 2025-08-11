import BasePage from "../pages/BasePage";
import { default as MediaTaggedFilterPage } from "../pages/MediaTaggedFilterPage";

describe("Verify that the user can input and search using parameters", { tags: ['@Media', '@regression'] }, () => {

    let basePage;

    before(() => {
        cy.login();
        basePage = new BasePage();
    })

    beforeEach(() => {
        MediaTaggedFilterPage.open();
        cy.fixture('mediaTaggedFilter.json').as('filterData');
    })
    
    it("filters by Recorded By", function () {
        cy.get('@filterData').then((data) => {
            const filter = data.Filter.find(f => f.label === 'Recorded By' && f.type === 'select');
            if (filter) {
                filter.options.forEach(option => {
                    cy.log('Đang kiểm tra với value:', option.value);

                    MediaTaggedFilterPage.selectFilterValue('Recorded By', option.value);
                    MediaTaggedFilterPage.applyFilter();
                    MediaTaggedFilterPage.verifyResultGridHas(option.value);
                    MediaTaggedFilterPage.resetFilter();
                });
            }
        });
    });

    it("filters by Case Number", function () {
        cy.get('@filterData').then((data) => {
            const filter = data.Filter.find(f => f.label === 'Case Number' && f.type === 'input');
            if (filter) {
                filter.options.forEach(option => {
                    cy.log('Đang kiểm tra với value:', option.value);

                    MediaTaggedFilterPage.enterTextFieldValue('Case Number', option.value);
                    MediaTaggedFilterPage.applyFilter();
                    MediaTaggedFilterPage.clickDetailView();
                    MediaTaggedFilterPage.verifyResultTagDetailHas(option.value);
                    MediaTaggedFilterPage.clickButtonBack();
                    MediaTaggedFilterPage.resetFilter();
                });
            }
        });
    });
})