describe("Profile Password Change (Mocked)", () => {
  const mockUser = {
    id: 1,
    email: "test@example.com",
    username: "Test User",
    role: "user",
    token: "fake-jwt-token",
    address: {
      country: "France",
      city: "Paris",
      street: "Rue de Rivoli",
      postalCode: "75001",
    },
  };

  beforeEach(() => {
    // Intercept Login Request
    cy.intercept("POST", "**/auth", {
      statusCode: 200,
      body: {
        id: mockUser.id,
        email: mockUser.email,
        username: mockUser.username,
        role: mockUser.role,
        token: mockUser.token,
      },
    }).as("loginRequest");

    // Intercept Get User Request (happens after login on profile page)
    cy.intercept("GET", `**/users/${mockUser.email}`, {
      statusCode: 200,
      body: mockUser,
    }).as("getUserRequest");

    // Intercept Update Password Request
    cy.intercept("PUT", `**/users/${mockUser.email}/password`, {
      statusCode: 200,
      body: { message: "Mot de passe mis à jour avec succès" },
    }).as("updatePasswordRequest");

    // Visit login page
    cy.visit("/#/connexion");

    // Perform Login
    cy.get('input[data-cy="login-email"]').type(mockUser.email);
    cy.get('input[data-cy="login-password"]').type("currentPassword123");
    cy.get('button[data-cy="login-submit"]').should("not.be.disabled").click();

    // Wait for login to complete and redirection
    cy.wait("@loginRequest");
    cy.url({ timeout: 10000 }).should("include", "/profil");
  });

  it("should allow user to change password using mocked API", () => {
    // Wait for user data to be fetched
    cy.wait("@getUserRequest");

    // 1. Find the Password section
    cy.contains(".profile-page__section", "Mot de passe").within(() => {
      // 2. Click "Modifier" button (select the visible one)
      cy.get("button.profile-page__edit-btn").filter(":visible").click();

      // 3. Fill the form
      // Current password
      cy.get('input[name="currentPassword"]').type("currentPassword123");

      // New password
      cy.get('input[name="newPassword"]').type("newPassword123");

      // Confirm new password
      cy.get('input[name="confirmPassword"]').type("newPassword123");

      // 4. Submit form
      cy.get('button[type="submit"]').click();
    });

    // 5. Verify the API call was made with correct data
    cy.wait("@updatePasswordRequest").then((interception) => {
      expect(interception.request.body).to.deep.equal({
        currentPassword: "currentPassword123",
        newPassword: "newPassword123",
      });
    });

    // 6. Verify UI returns to view mode (form closed)
    cy.contains(".profile-page__section", "Mot de passe").within(() => {
      cy.get("button.profile-page__edit-btn").should("be.visible");
      // Should show masked password again
      cy.contains("••••••••").should("be.visible");
    });
  });
});
