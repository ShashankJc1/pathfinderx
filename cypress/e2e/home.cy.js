describe('Home Page', () => {
    it('loads the homepage and verifies key elements', () => {
      // Visit the homepage
      cy.visit('/');
  
      // Verify the main headline is present
      cy.contains('Discover Amazing Adventures').should('be.visible');
  
      // Verify the description text is present
      cy.contains('Embark on unforgettable journeys').should('be.visible');
  
      // Verify the "Book Your Trip" button is present and clickable
      cy.contains('Book Your Trip').should('be.visible').click();
  
      // Verify the "Watch Video" button is present
      cy.contains('Watch Video').should('be.visible');
  
      // Check for the "Next Destination" card
      cy.contains('Next Destination').should('be.visible');
  
      // Check for the destination details in the card
      cy.contains('Santorini, Greece').should('be.visible');
      cy.contains('2300 mi').should('be.visible');
      cy.contains('Sunny, 25°C').should('be.visible');
    });
  });
  