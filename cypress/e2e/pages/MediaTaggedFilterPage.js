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
        cy.get('input', { timeout: 5000 })
          .should('be.visible')
          .type(value).type('{enter}');
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
    this.resultGrid.each($row => {
      cy.wrap($row).should('contain.text', value);
    });
  }

  verifyResultTagDetailHas(value) {
    this.resultTagDetail.should('contain', value);
  }
  verifyGridRecordedTimeBetween(from, to) {
    const fromDate = new Date(from);
    const toDate   = new Date(to);

    cy.get("div[class*='large-view']").each($row => {
      const recordedTimeText = $row.find("a[class*='media-item-title']").text().trim();
      // example: "03/09/2025 4:59:00 PM"

      const recordedDate = new Date(recordedTimeText);

      // normalize to 0h00
      fromDate.setHours(0,0,0,0);
      toDate.setHours(0,0,0,0);
      // recordedDate.setHours(0,0,0,0);

      expect(recordedDate >= fromDate && recordedDate <= toDate,
      `recordedDate ${recordedDate.toDateString()} should be between ${fromDate.toDateString()} and ${toDate.toDateString()}`
      ).to.be.true;
    });
  }
}

export default new MediaTaggedFilterPage();
