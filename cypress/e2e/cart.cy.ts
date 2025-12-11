import { PathnamesApp } from "../../src/types/Pathnames";

describe("Cart functionality", () => {
  it("should add product to cart, update quantity, and remove it", () => {
    // 1. Visit a category page
    cy.visit(`/#${PathnamesApp.Bavoirs}`);

    // 2. Add the first product to the cart
    cy.get(".card")
      .first()
      .within(() => {
        cy.get("button.button_add-to-cart").click({ force: true });
        // Check for class instead of visibility if clipping occurs
        cy.get("button.button_add-to-cart").should("have.class", "selected");
        cy.contains("Dans le panier").should("exist");
      });

    // 3. Verify cart badge in header shows 1
    cy.get(`.header a[href="#${PathnamesApp.Panier}"] .icon__count`).should(
      "contain",
      "1"
    );

    // 4. Navigate to Cart page
    cy.get(`.header a[href="#${PathnamesApp.Panier}"]`).click();
    cy.url().should("include", PathnamesApp.Panier);

    // 5. Verify product is in the cart
    cy.get(".checkout-card").should("have.length", 1);

    // 6. Increase quantity
    cy.get(".checkout-card")
      .first()
      .within(() => {
        // Initial count should be 1
        cy.get(".button-more-less__count").should("contain", "1");

        // Click + button
        cy.get(".button-more-less--next").click();

        // Count should be 2
        cy.get(".button-more-less__count").should("contain", "2");
      });

    // 7. Decrease quantity
    cy.get(".checkout-card")
      .first()
      .within(() => {
        // Click - button
        cy.get(".button-more-less--prev").click();

        // Count should be 1 again
        cy.get(".button-more-less__count").should("contain", "1");
      });

    // 8. Remove product
    cy.get(".checkout-card")
      .first()
      .within(() => {
        cy.get(".button-remove").click();
      });

    // 9. Verify cart is empty
    cy.get(".checkout-card").should("not.exist");
    cy.contains("Votre panier est vide").should("be.visible");
  });
});
