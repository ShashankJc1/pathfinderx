describe('Contact Us Page', () => {
    it('should submit the contact form successfully', () => {
      cy.visit('/pages/contact-us'); // Ensure this route is correct
  
      // Fill out the contact form
      cy.get('input[name="name"]').type('John Doe');
      cy.get('input[name="email"]').type('john@example.com');
      cy.get('input[name="phone"]').type('1234567890');
      cy.get('textarea[name="message"]').type('Test message');
      
      // Submit the form
      cy.get('form').submit();
  
      // Wait for the alert and check the alert message
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.contains('Thank you! We will get in touch soon.');
      });
    });
  });
  