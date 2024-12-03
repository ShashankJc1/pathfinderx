describe('Sidebar Navigation', () => {
    it('navigates between pages and highlights the active link', () => {
      cy.visit('/dashboard'); // Open the dashboard page
  
      // Navigate to Profile page
      cy.get('a').contains('Profile').click();
      cy.url().should('include', '/dashboard/profile'); // Ensure URL is correct
      cy.get('.active').contains('Profile'); // Verify active link is highlighted
  
      // Navigate to Itinerary page
      cy.get('a').contains('Itinerary').click();
      cy.url().should('include', '/dashboard/itinerary'); // Ensure URL is correct
      cy.get('.active').contains('Itinerary'); // Verify active link is highlighted
    });
  });
  