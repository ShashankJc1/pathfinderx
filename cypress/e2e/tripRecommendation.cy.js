describe('Trip Recommendation API', () => {
    it('should generate a valid trip recommendation based on input data', () => {
      // Prepare test data
      const requestData = {
        travelType: 'Adventure',
        peopleCount: 4,
        countryPreference: 'Japan',
        days: 7,
      };
  
      // Send POST request to the /api endpoint (replace with your actual API route)
      cy.request({
        method: 'POST',
        url: '/api/generate-trip', // Make sure this matches your API route
        body: requestData,
        failOnStatusCode: false, // Prevent Cypress from failing the test on non-2xx responses
      }).then((response) => {
        // Assert that the response status code is 200
        expect(response.status).to.eq(200);

      });
    });
  });
  