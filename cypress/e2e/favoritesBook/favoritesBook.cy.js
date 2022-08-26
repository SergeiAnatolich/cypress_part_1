import selectors from "../../fixtures/locators.json";
import { faker } from "@faker-js/faker";

let user, userIndex, mail, password, bookData;

before(() => {
  cy.fixture("user").then(function (fUser) {
    user = fUser;
  });
});

beforeEach(() => {
  userIndex = faker.datatype.number({ min: 0, max: 1 });
  (mail = user.validUser[userIndex].mail),
    (password = user.validUser[userIndex].pass),
    (bookData = {
      title: faker.company.name(),
      description: faker.lorem.sentences(1),
      author: faker.name.fullName(),
    }),
    cy.visit("/");
});

it("Should successfully add the book", () => {
  cy.login(mail, password);
  cy.addBook(bookData.title, bookData.description, bookData.author);
  cy.contains(selectors.booksPage.booksList).click();
  cy.get(selectors.booksPage.bookTitle)
    .then(($el) => $el[0].validationMessage)
    .should("contain", bookData.title);
});

it("Should successfully add the book to favorites on home page", () => {
  cy.login(mail, password);
  cy.addBook(bookData.title, bookData.description, bookData.author);
  cy.contains(bookData.title).contains(selectors.booksPage.addFavorite).click();
  cy.contains(selectors.booksPage.favorites).click();
  cy.contains(bookData.title).should("be.visible");
});

it("Should successfully delete the book from favorites", () => {
  cy.login(mail, password);
  cy.addBook(bookData.title, bookData.description, bookData.author);
  cy.contains(bookData.title).contains(selectors.booksPage.addFavorite).click();
  cy.contains(selectors.booksPage.favorites).click();
  cy.contains(bookData.title).contains(selectors.booksPage.delete).click();
  cy.contains(selectors.booksPage.booksList).click();
  cy.contains(bookData.title)
    .contains(selectors.booksPage.addFavorite)
    .should("be.visible");
});
