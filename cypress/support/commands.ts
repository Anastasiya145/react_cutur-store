/// <reference types="cypress" />

// Custom command for login
Cypress.Commands.add("login", (email: string, password: string) => {
  cy.visit("/connexion");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should("not.include", "/connexion");
});

// Custom command for logout
Cypress.Commands.add("logout", () => {
  cy.get('[data-cy="user-menu"]').click();
  cy.contains("Déconnexion").click();
  cy.url().should("include", "/");
});

// Custom command to add product to cart
Cypress.Commands.add("addToCart", (productId: string) => {
  cy.get(`[data-testid="add-to-cart-${productId}"]`).click();
});
