import { PathnamesApp } from "../../src/types/Pathnames";
import { Product } from "../../src/types/Product";

const mockProduct: Product = {
  id: "1",
  name: "Product A",
  price: 10,
  final_price: 10,
  category: "bavoirs",
  items_left: 10,
  images: ["img1.jpg"],
  main_image: "img1",
  description: { title: "Desc", text: ["Text"], advice: "Advice" },
  color: "red",
  discount: 0,
  material: "cotton",
  colors_available: [],
};

describe("Item Page - Add to Cart", () => {
  beforeEach(() => {
    // Mock category products
    cy.intercept("GET", "**/categories/bavoirs", {
      statusCode: 200,
      body: [mockProduct],
    }).as("getProducts");

    // Mock single product
    cy.intercept("GET", "**/products/1", {
      statusCode: 200,
      body: mockProduct,
    }).as("getProduct");

    // Visit a category page
    cy.visit(`/#${PathnamesApp.Bavoirs}`);

    // Wait for products
    cy.wait("@getProducts");
    cy.get(".card").should("have.length.gt", 0);

    // Click on the first product card
    cy.get(".card").first().click();

    // Wait for product details
    cy.wait("@getProduct");

    // Verify we are on an item page
    cy.url().should("include", "/bavoirs/1");
  });

  it("should add product to cart from item page", () => {
    // Check if "Add to cart" button exists and click it
    cy.get("button")
      .contains(/Ajouter au panier|Add to cart/i)
      .click();

    // Verify the button state changes or some feedback is shown
    // Let's check the cart badge in the header
    cy.get(".header .icon__count").should("contain", "1");

    // Also check if the button text changed to "Added" or similar if applicable
    // Or check if it says "Retirer du panier" (Remove from cart) if it toggles.
    // Based on common patterns, let's check if we can navigate to cart and see it there.

    cy.get(`[data-cy="header"] a[href="#${PathnamesApp.Panier}"]`).click();
    cy.url().should("include", PathnamesApp.Panier);
    cy.get(".checkout-card").should("have.length", 1);
  });
});
