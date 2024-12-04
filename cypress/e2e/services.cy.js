// cypress/e2e/services.cy.js

describe('Services Component', () => {
    beforeEach(() => {
      cy.visit('/pages/services'); // Make sure this URL corresponds to the correct path in your app
    });
  
    it('should render the service cards', () => {
      // Assert that all 8 service cards are rendered
      cy.get('.grid .relative').should('have.length', 8);
    });
  
    it('should toggle the active state when a service card is clicked', () => {
      // Get the first service card
      cy.get('.grid .relative').first().click();
  
      // Assert that the first card has the scale-105 class indicating it is active
      cy.get('.grid .relative').first().should('have.class', 'scale-105');
  
      // Click the same card again to toggle off
      cy.get('.grid .relative').first().click();
  
      // Assert that the first card no longer has the scale-105 class
      cy.get('.grid .relative').first().should('not.have.class', 'scale-105');
    });
  
   
  
    it('should show the correct service title and description on click', () => {
      // Click the first card
      cy.get('.grid .relative').first().click();
  
      // Assert that the title is correct
      cy.get('.grid .relative').first().contains('Personalized Trip Planning');
  
      // Assert that the description is visible (assuming the description text is shown when active)
      cy.get('.grid .relative').first().contains('Create customized travel itineraries based on your preferences with ease.');
    });
  });
  