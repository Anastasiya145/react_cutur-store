import { PathnamesApp, PathnamesForNav } from "../../src/types/Pathnames";

describe("Header Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should navigate to all category pages via header links", () => {
    // Iterate over all navigation items defined in PathnamesForNav
    // We need to cast the keys to get the correct type for indexing
    const navKeys = Object.keys(PathnamesForNav) as Array<
      keyof typeof PathnamesForNav
    >;

    navKeys.forEach((key) => {
      const path = PathnamesForNav[key];

      // Click the navigation link
      cy.get(".nav__item").contains(key).click();

      // Verify URL
      cy.url().should(
        "satisfy",
        (url: string) => url.includes(path) || url.includes(encodeURI(path))
      );

      // Verify active class on the link
      cy.get(".nav__item").contains(key).should("have.class", "selected");
    });
  });

  it("should navigate to Favorites and Cart via icons", () => {
    // Navigate to Favorites
    cy.get(`[data-cy="header"] a[href="#${PathnamesApp.Favoris}"]`).click();
    cy.url().should("include", PathnamesApp.Favoris);

    // Navigate to Cart
    cy.get(`[data-cy="header"] a[href="#${PathnamesApp.Panier}"]`).click();
    cy.url().should("include", PathnamesApp.Panier);
  });

  it("should navigate to Home via Logo", () => {
    // First go to another page
    cy.visit(`/#${PathnamesApp.Panier}`);

    // Click Logo
    cy.get('[data-cy="header"] .header__logo').click();

    // Verify URL is Home (root)
    // Note: Home path might be just / or /#/ depending on setup, usually /#/ in HashRouter
    cy.url().should("eq", Cypress.config().baseUrl + "/#/");
  });
});
