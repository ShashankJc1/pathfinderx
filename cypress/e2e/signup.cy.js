describe('SignUp Page', () => {
  beforeEach(() => {
    cy.visit('/pages/signup'); // Adjust the route if necessary
  });

  it('should submit the form successfully when data is valid', () => {
    cy.get('input#name').type('John Doe');
    cy.get('input#email').type('john@example.com');
    cy.get('input#password').type('password123');
    cy.get('input#confirmPassword').type('password123'); // Matching password

    // Mock the API request for signup success
    cy.intercept('POST', '/api/signup', {
      statusCode: 200,
      body: { message: 'Signup successful!' },
    }).as('signupRequest');

    // Prevent navigation to the login page so we can check the success message
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alert'); // Mock alert
    });

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Wait for the API request to complete
    cy.wait('@signupRequest');

    // Check that the alert was triggered
    cy.get('@alert').should('have.been.calledOnceWith', 'Signup successful!');

    // Optionally, check that the page redirects to the login page
    cy.url().should('include', '/login'); // Ensure navigation occurred
  });
});
