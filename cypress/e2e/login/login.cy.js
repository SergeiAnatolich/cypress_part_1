import selectors from "../../fixtures/locators";
import { faker } from '@faker-js/faker';
let user;
let userIndex;
before( () => {
  cy.fixture("user").then(function (fUser) {
    user = fUser;
  });
});

beforeEach( () => {
  userIndex = faker.datatype.number({min: 0, max: 1});
  cy.visit("/");
});

it("Should successfully login", (mail = user.validUser[userIndex].mail, password = user.validUser[userIndex].pass) => {
  cy.login(mail, password);
  cy.contains(`Добро пожаловать ${mail}`).should("be.visible");
});

it("Should not login with empty login", (mail = null, password = user.validUser[userIndex].pass) => {
  cy.login(mail, password);
  cy.get(selectors.mainPage.loginForm.loginInput)
    .then(($el) => $el[0].checkValidity())
    .should("be.false");
  cy.get(selectors.mainPage.loginForm.loginInput)
    .then(($el) => $el[0].validationMessage)
    .should("contain", "Заполните это поле.");
});

it("Should not login with empty password", (mail = user.validUser[userIndex].mail) => {
  cy.login(mail);
  cy.get(selectors.mainPage.loginForm.passwordInput)
    .then(($el) => $el[0].checkValidity())
    .should("be.false");
  cy.get(selectors.mainPage.loginForm.passwordInput)
    .then(($el) => $el[0].validationMessage)
    .should("contain", "Заполните это поле.");
});