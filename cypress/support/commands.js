import selectors from "../fixtures/locators.json";

Cypress.Commands.add("login", (mail=null, password=null) => {
  cy.contains(selectors.mainPage.login).click();
  if(!mail) {
    cy.get(selectors.mainPage.loginForm.passwordInput).type(password);
  } else if(!password) {
    cy.get(selectors.mainPage.loginForm.loginInput).type(mail);
  } else {
    cy.get(selectors.mainPage.loginForm.loginInput).type(mail);
    cy.get(selectors.mainPage.loginForm.passwordInput).type(password);
  }
  cy.contains(selectors.mainPage.loginForm.submitButton).click();
});

Cypress.Commands.add("addBook", (title, description, authors) => {
  cy.contains(selectors.booksPage.addNew).click();
  cy.get(selectors.booksPage.title).type(title);
  cy.get(selectors.booksPage.description).type(description);
  cy.get(selectors.booksPage.authors).type(authors);
  cy.contains(selectors.booksPage.submitButton).click();
});