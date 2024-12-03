describe('Login Flow', () => {
    it('logs in the user and redirects to the dashboard', () => {
      cy.visit('/pages/login'); // Navigate to the login page
  
      // Enter login credentials
      cy.get('input[name="email"]').type('testuser@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();
  
      // Assert successful login
      cy.url().should('include', '/dashboard'); // Ensure redirection
      cy.contains('Welcome to PathfinderX'); // Verify dashboard content
    });
  });
  