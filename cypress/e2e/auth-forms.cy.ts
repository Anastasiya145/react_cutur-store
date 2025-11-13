describe("Authentication Forms", () => {
  describe("Login Form", () => {
    beforeEach(() => {
      cy.visit("/connexion");
    });

    it("should display login form", () => {
      cy.get("h1").should("contain", "Connexion");
      cy.get('input[name="email"]').should("be.visible");
      cy.get('input[name="password"]').should("be.visible");
      cy.get('button[type="submit"]').should("be.visible");
    });

    it("should show validation errors for empty fields", () => {
      cy.get('button[type="submit"]').click();

      cy.contains("L'e-mail est requis").should("be.visible");
      cy.contains("Le mot de passe est requis").should("be.visible");
    });

    it("should show error for invalid email format", () => {
      cy.get('input[name="email"]').type("invalid-email");
      cy.get('input[name="password"]').type("password123");
      cy.get('button[type="submit"]').click();

      cy.contains("Veuillez saisir un e-mail valide").should("be.visible");
    });

    it("should show password when clicking visibility icon", () => {
      cy.get('input[name="password"]').should("have.attr", "type", "password");
      cy.get(".password-input__icon").click();
      cy.get('input[name="password"]').should("have.attr", "type", "text");
    });

    it("should navigate to register page", () => {
      cy.contains("Je n'ai pas de compte").click();
      cy.url().should("include", "/inscription");
    });

    it("should navigate to forgot password page", () => {
      cy.contains("Mot de passe oublié").click();
      cy.url().should("include", "/mot-de-passe-oublie");
    });

    it("should successfully login with valid credentials", () => {
      cy.intercept("POST", "/api/auth/login", {
        statusCode: 200,
        body: {
          user: { email: "test@example.com", name: "Test User" },
          token: "fake-jwt-token",
        },
      }).as("loginRequest");

      cy.get('input[name="email"]').type("test@example.com");
      cy.get('input[name="password"]').type("password123");
      cy.get('button[type="submit"]').click();

      cy.wait("@loginRequest");
      cy.url().should("not.include", "/connexion");
    });
  });

  describe("Register Form", () => {
    beforeEach(() => {
      cy.visit("/inscription");
    });

    it("should display registration form", () => {
      cy.get("h1").should("contain", "Inscription");
      cy.get('input[name="name"]').should("be.visible");
      cy.get('input[name="email"]').should("be.visible");
      cy.get('input[name="password"]').should("be.visible");
      cy.get('input[name="confirmPassword"]').should("be.visible");
    });

    it("should show validation errors for empty fields", () => {
      cy.get('button[type="submit"]').click();

      cy.contains("Le nom est requis").should("be.visible");
      cy.contains("L'e-mail est requis").should("be.visible");
    });

    it("should show error when passwords do not match", () => {
      cy.get('input[name="name"]').type("Test User");
      cy.get('input[name="email"]').type("test@example.com");
      cy.get('input[name="password"]').type("password123");
      cy.get('input[name="confirmPassword"]').type("password456");
      cy.get('button[type="submit"]').click();

      cy.contains("Les mots de passe ne correspondent pas").should(
        "be.visible"
      );
    });

    it("should successfully register with valid data", () => {
      cy.intercept("POST", "/api/auth/register", {
        statusCode: 201,
        body: {
          user: { email: "newuser@example.com", name: "New User" },
          token: "fake-jwt-token",
        },
      }).as("registerRequest");

      cy.get('input[name="name"]').type("New User");
      cy.get('input[name="email"]').type("newuser@example.com");
      cy.get('input[name="password"]').type("password123");
      cy.get('input[name="confirmPassword"]').type("password123");
      cy.get('button[type="submit"]').click();

      cy.wait("@registerRequest");
      cy.url().should("not.include", "/inscription");
    });
  });

  describe("Forgot Password Form", () => {
    beforeEach(() => {
      cy.visit("/mot-de-passe-oublie");
    });

    it("should display forgot password form", () => {
      cy.get("h1").should("contain", "Mot de passe oublié");
      cy.get('input[type="email"]').should("be.visible");
      cy.get('button[type="submit"]').should("be.visible");
    });

    it("should show validation error for empty email", () => {
      cy.get('button[type="submit"]').click();
      cy.contains("L'e-mail est requis").should("be.visible");
    });

    it("should show validation error for invalid email", () => {
      cy.get('input[type="email"]').type("invalid-email");
      cy.get('button[type="submit"]').click();
      cy.contains("Veuillez saisir un e-mail valide").should("be.visible");
    });

    it("should show success message after submitting valid email", () => {
      cy.intercept("POST", "/api/auth/forgot-password", {
        statusCode: 200,
        body: { message: "Email sent" },
      }).as("forgotPasswordRequest");

      cy.get('input[type="email"]').type("test@example.com");
      cy.get('button[type="submit"]').click();

      cy.wait("@forgotPasswordRequest");
      cy.contains("E-mail envoyé").should("be.visible");
    });

    it("should navigate back to login page", () => {
      cy.contains("Retour à la connexion").click();
      cy.url().should("include", "/connexion");
    });
  });
});
