let user;
let book;
before(() => {
  cy.fixture("user").then(function (fUser) {
    user = fUser;
  });
  cy.fixture("books").then(function (fBooks) {
    book = fBooks;
  });
});

beforeEach( () => {
  cy.visit("/")
});

it("Should successfully add the book", (
  mail = user.validUser[0].mail,
  password = user.validUser[0].pass,
  title = book.books[0].title, description = book.books[0].description,
  author = book.books[0].author
  ) => {
  cy.login(mail, password);
  cy.addBook(title, description, author);
  cy.contains("Books list").click();
  cy.get(".card-title")
    .then(($el) => $el[0].validationMessage)
    .should("contain", title);
});

it("Should successfully add the book to favorites on home page", (
  mail = user.validUser[0].mail,
  password = user.validUser[0].pass,
  title = book.books[1].title, description = book.books[1].description,
  author = book.books[1].author
  ) => {
  cy.login(mail, password);
  cy.addBook(title, description, author);
  cy.contains(title).contains("Add to favorite").click();
  cy.contains("Favorites").click();
  cy.contains(title).should("be.visible");
});

it("Should successfully delete the book from favorites", (
  mail = user.validUser[0].mail,
  password = user.validUser[0].pass,
  title = book.books[2].title,
  description = book.books[2].description,
  author = book.books[2].author
  ) => {
  cy.login(mail, password);
  cy.addBook(title, description, author);
  cy.contains(title).contains("Add to favorite").click();
  cy.contains("Favorites").click();
  cy.contains(title).contains("Delete from favorite").click();
  cy.contains("Books list").click();
  cy.contains(title).contains("Add to favorite").should("be.visible");
});
