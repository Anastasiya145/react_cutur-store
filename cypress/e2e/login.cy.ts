import { PathnamesApp } from "../../src/types/Pathnames";

describe("Login Page functionality", () => {
  it("should login user and show Home Page", () => {
    // Visit the login page (correct path is /connexion)
    cy.visit(`/#${PathnamesApp.Connexion}`);

    const loginData = {
      email: "asiva@ukr.net",
      password: "111111",
    };

    // Wait for the form to be visible
    cy.get("form.auth-page__form").should("be.visible");

    cy.get('input[data-cy="login-email"]').type(loginData.email);
    cy.get('input[data-cy="login-password"]').type(loginData.password);

    // Wait for button to be enabled before clicking
    cy.get('button[data-cy="login-submit"]').should("not.be.disabled").click();

    // Verify we are redirected to the profile page (increase timeout for slow APIs)
    cy.url({ timeout: 10000 }).should("include", PathnamesApp.Profil);

    // Scroll to header to ensure it's in view
    cy.get(".header").scrollIntoView().should("be.visible");

    cy.get('[data-cy="profile-email"]')
      .should("be.visible")
      .and("have.text", loginData.email);
  });
});
