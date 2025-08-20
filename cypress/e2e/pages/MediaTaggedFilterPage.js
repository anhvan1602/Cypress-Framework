// cypress/support/pages/FilterPage.js
import BasePage from "./BasePage";
const routes = require('../config/routes');
import { ENDPOINT_PREFIX } from "../config/CONSTANTS";

class MediaTaggedFilterPage extends BasePage {
  // Elements
  get findAssetsBtn() { return cy.get('button').contains('Find assets'); }
  get clearFilterBtn() { return cy.get('button').contains('Clear Filter'); }
  get backBtn() { return cy.get('button').contains('Back'); }
  get detailViewLink() { return cy.get('a[id*="detail"]').first(); }
  get resultGrid() { return cy.get('div[class*="large-view"]'); }
  get resultTagDetail() { return cy.get('span[class*="tag"]'); }

  // Actions
  open() {
    return super.open(ENDPOINT_PREFIX + routes.MEDIATAGGED_ENDPOINT);
  }

  openFilter(tagName) {
    cy.contains(tagName).click();
  }

  selectFilterValue(labelText, value) {
    cy.contains("div[class*='form-control-label']", labelText)
      .within(() => {
        cy.get('.as-container').click();
      });
    cy.get('.as-dropdown-item').contains(value).click();
  }

  enterTextFieldValue(labelText, value) {
    cy.contains("div[class*='form-control-label']", labelText)
      .within(() => {
        cy.get('input.form-control').clear().type(value);
      });
  }

  selectCheckboxValue(labelText, value) {
    cy.contains("span[class*='sub']", labelText)
      .parent()
      .within(() => {
        cy.contains('span', value)
          .click();
      });
  }

  enterDateInput(key, value) {
  cy.contains('.form-label', key)
    .closest('.form-control-column')
    .within(() => {
      cy.get('.calendar').click();  
      cy.get('input')
      .should('be.visible')
      .clear()
      .type(value)
      .type('{enter}');
    });
}

  clickDetailView() {
    this.detailViewLink.click();
  }

  clickButtonBack() {
    this.backBtn.click();
  }

  applyFilter() {
    this.findAssetsBtn.click();
  }

  resetFilter() {
    this.clearFilterBtn.click();
  }

  verifyResultGridHas(value) {
    this.resultGrid.should('contain', value);
  }

  verifyResultTagDetailHas(value) {
    this.resultTagDetail.should('contain', value);
  }
  verifyGridRecordedTimeBetween(from, to) {
    const fromDate = new Date(from);
    const toDate   = new Date(to);

    cy.get("div[class*='large-view']").each($row => {
      const recordedTimeText = $row.find("a[class*='media-item-title']").text().trim();
      const recordedTime = new Date(recordedTimeText);

      expect(recordedTime >= fromDate && recordedTime <= toDate).to.be.true;
    });
  }
}

export default new MediaTaggedFilterPage();
