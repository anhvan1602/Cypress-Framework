class SharedElements {
  get h1Heading() {
    return cy.get('h1');
  }

  get spanHeading() {
    return cy.get('span');
  }
}

export default new SharedElements();
