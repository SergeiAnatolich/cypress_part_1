const { defineConfig } = require('cypress')

module.exports = defineConfig({
  // retries: 2,
  viewportWidth: 1280,
  viewportHeight: 800,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/{e2e,integration}/{**, *}/*.cy.{js,jsx,ts,tsx}",
    // retries: 2,
    baseUrl: 'http://localhost:3000'
  },
});
