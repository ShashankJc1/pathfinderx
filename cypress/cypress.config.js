const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Update to your Next.js local development URL
    setupNodeEvents(on, config) {
      // Add custom event listeners if needed
    },
  },
});
