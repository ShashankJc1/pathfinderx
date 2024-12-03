describe('Flight Search', () => {
    it('performs a flight search and displays results', () => {
      cy.visit('/dashboard/search-flights'); // Go to the search flights page
  
      // Fill in search form
      cy.get('input[placeholder="Enter departure city"]').type('New York');
      cy.get('input[placeholder="Enter destination city"]').type('London');
      cy.get('input[type="date"]').first().type('2024-12-20'); // Departure date
      cy.get('button').contains('Search Flights').click();
  
      // Assert search results are displayed
      cy.contains('Price:').should('be.visible'); // Check for prices in results
      cy.contains('Duration:').should('be.visible'); // Check for duration
    });
  });
  