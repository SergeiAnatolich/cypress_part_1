Cypress.Commands.add("login", (mail, password) => {
  cy.visit("localhost:3000");
  cy.contains("Log in").click();
  cy.get("#mail").type(mail);
  cy.get("#pass").type(password);
  cy.contains("Submit").click();
});

Cypress.Commands.add("addBook", (title, description, authors) => {
  cy.contains("Add new").click();
  cy.get("#title").type(title);
  cy.get("#description").type(description);
  cy.get("#authors").type(authors);
  cy.contains("Submit").click();
});