let user;
before( () => {
  cy.fixture("user").then(function (fUser) {
    user = fUser;
  })
})

it("Should successfully login", (mail = user.validUser[0].mail, password = user.validUser[0].pass) => {
  cy.login(mail, password);
  cy.contains("Добро пожаловать test@test.com").should("be.visible");
});


it("Should not login with empty login", (password = user.validUser[0].pass) => {
  cy.visit("localhost:3000");
  cy.contains("Log in").click();
  cy.get("#pass").type(password);
  cy.contains("Submit").click();
  cy.get("#mail")
    .then(($el) => $el[0].checkValidity())
    .should("be.false");
  cy.get("#mail")
    .then(($el) => $el[0].validationMessage)
    .should("contain", "Заполните это поле.");
});

it("Should not login with empty password", (mail = user.validUser[0].mail) => {
  cy.visit("localhost:3000");
  cy.contains("Log in").click();
  cy.get("#mail").type(mail);
  cy.contains("Submit").click();
  cy.get("#pass")
    .then(($el) => $el[0].checkValidity())
    .should("be.false");
  cy.get("#pass")
    .then(($el) => $el[0].validationMessage)
    .should("contain", "Заполните это поле.");
});