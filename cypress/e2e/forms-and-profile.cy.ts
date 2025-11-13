describe("Contact Form", () => {
  beforeEach(() => {
    cy.visit("/contact");
  });

  it("should display contact form", () => {
    cy.get("h1").should("contain", "Contact");
    cy.get('input[name="name"]').should("be.visible");
    cy.get('input[name="email"]').should("be.visible");
    cy.get('textarea[name="message"]').should("be.visible");
  });

  it("should show validation errors for empty fields", () => {
    cy.get('button[type="submit"]').click();

    cy.contains("Le nom est requis").should("be.visible");
    cy.contains("L'e-mail est requis").should("be.visible");
    cy.contains("Le message est requis").should("be.visible");
  });

  it("should validate email format", () => {
    cy.get('input[name="name"]').type("Jean Dupont");
    cy.get('input[name="email"]').type("invalid-email");
    cy.get('textarea[name="message"]').type("Test message");
    cy.get('button[type="submit"]').click();

    cy.contains("Veuillez saisir un e-mail valide").should("be.visible");
  });

  it("should validate message length", () => {
    cy.get('input[name="name"]').type("Jean Dupont");
    cy.get('input[name="email"]').type("jean@example.com");
    cy.get('textarea[name="message"]').type("Hi");
    cy.get('button[type="submit"]').click();

    cy.contains("Le message doit contenir au moins 10 caractères").should(
      "be.visible"
    );
  });

  it("should successfully submit contact form", () => {
    cy.intercept("POST", "/api/contact", {
      statusCode: 200,
      body: { message: "Message sent successfully" },
    }).as("contactRequest");

    cy.get('input[name="name"]').type("Jean Dupont");
    cy.get('input[name="email"]').type("jean.dupont@example.com");
    cy.get('textarea[name="message"]').type(
      "Ceci est un message de test pour le formulaire de contact"
    );
    cy.get('button[type="submit"]').click();

    cy.wait("@contactRequest");
    cy.contains("Message envoyé avec succès").should("be.visible");
  });

  it("should display contact information", () => {
    cy.contains("Téléphone").should("be.visible");
    cy.contains("E-mail").should("be.visible");
    cy.contains("Adresse").should("be.visible");
  });
});

describe("User Profile", () => {
  beforeEach(() => {
    // Mock de l'authentification
    cy.window().then((win: Window) => {
      win.localStorage.setItem("authToken", "fake-jwt-token");
      win.localStorage.setItem(
        "user",
        JSON.stringify({
          id: "1",
          name: "Jean Dupont",
          email: "jean.dupont@example.com",
          phone: "0612345678",
        })
      );
    });

    cy.visit("/profil");
  });

  it("should display user profile information", () => {
    cy.contains("Jean Dupont").should("be.visible");
    cy.contains("jean.dupont@example.com").should("be.visible");
    cy.contains("0612345678").should("be.visible");
  });

  it("should allow editing profile", () => {
    cy.contains("Modifier").click();

    cy.get('input[name="name"]').clear().type("Jean Martin");
    cy.get('input[name="phone"]').clear().type("0698765432");

    cy.intercept("PUT", "/api/user/profile", {
      statusCode: 200,
      body: {
        id: "1",
        name: "Jean Martin",
        email: "jean.dupont@example.com",
        phone: "0698765432",
      },
    }).as("updateProfile");

    cy.get('button[type="submit"]').click();
    cy.wait("@updateProfile");

    cy.contains("Jean Martin").should("be.visible");
  });

  it("should display order history", () => {
    cy.visit("/mes-commandes");

    cy.get(".order-card").should("exist");
  });

  it("should allow changing password", () => {
    cy.visit("/parametres");

    cy.get('input[name="currentPassword"]').type("oldpassword123");
    cy.get('input[name="newPassword"]').type("newpassword123");
    cy.get('input[name="confirmPassword"]').type("newpassword123");

    cy.intercept("PUT", "/api/user/password", {
      statusCode: 200,
      body: { message: "Password updated" },
    }).as("changePassword");

    cy.contains("button", "Changer le mot de passe").click();
    cy.wait("@changePassword");

    cy.contains("Mot de passe mis à jour").should("be.visible");
  });

  it("should logout user", () => {
    cy.get('[data-cy="user-menu"]').click();
    cy.contains("Déconnexion").click();

    cy.url().should("include", "/connexion");
    cy.window().then((win: Window) => {
      expect(win.localStorage.getItem("authToken")).to.be.null;
    });
  });
});
