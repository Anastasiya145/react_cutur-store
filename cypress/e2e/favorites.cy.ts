import { PathnamesApp } from "../../src/types/Pathnames";

describe("Favorites functionality", () => {
  it("should add products to favorites and display them on the favorites page", () => {
    // 1. Visit a category page
    cy.visit(`/#${PathnamesApp.Bavoirs}`);

    // Array to store the IDs of the products we add to favorites
    const productsToAdd: string[] = [];

    // 2. Select the first two products
    cy.get(".card")
      .each(($card, index) => {
        if (index < 2) {
          // Get the href attribute to extract the product ID
          const href = $card.attr("href");
          if (href) {
            const parts = href.split("/");
            const productId = parts[parts.length - 1];
            productsToAdd.push(productId);

            // Click the heart icon (add to favorites)
            // We use { force: true } to ensure we can click it even if there are hover effects or overlays
            cy.wrap($card)
              .find('button[data-cy="addToFavorite"]')
              .click({ force: true });
          }
        }
      })
      .then(() => {
        // 3. Navigate to the Favorites page using the header icon
        // With HashRouter, the href will contain the hash
        cy.get(`.header a[href="#${PathnamesApp.Favoris}"]`).click();

        // 4. Verify we are on the favorites page
        cy.url().should("include", PathnamesApp.Favoris);

        // 5. Verify that the selected products are present on the favorites page
        productsToAdd.forEach((id) => {
          cy.get(`.card[href*="${id}"]`).should("exist");
        });
      });
  });
});
