import { PathnamesApp } from "../../src/types/Pathnames";
import { Product } from "../../src/types/Product";
import { ConnectedUser } from "../../src/types/User";

const mockProduct: Product = {
  id: "1",
  name: "Product A",
  price: 10,
  final_price: 10,
  discount: 0,
  category: "bavoirs",
  items_left: 10,
  images: ["img1.jpg"],
  main_image: "img1.jpg",
  description: { title: "Desc", text: ["Text"], advice: "Advice" },
  color: "red",
  material: "cotton",
  colors_available: [],
};

const mockUser = {
  id: 1,
  email: "test@example.com",
  username: "Test User",
  role: "user",
  address: undefined,
};

const mockPostalCodes = [
  { postalCode: "75001", name: "Paris" },
  { postalCode: "69001", name: "Lyon" },
];

const mockLoginResponse = {
  id: 1,
  email: "test@example.com",
  username: "Test User",
  role: "user",
  token: "fake-token",
};

describe("Checkout and Profile Address Forms", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);

    cy.intercept("GET", "**/data/fr_postal_codes.json", {
      statusCode: 200,
      body: mockPostalCodes,
    }).as("getPostalCodes");

    cy.intercept("GET", "**/users/*", {
      statusCode: 200,
      body: mockUser,
    }).as("getUser");

    cy.intercept("GET", "**/products", {
      statusCode: 200,
      body: [mockProduct],
    }).as("getProducts");

    cy.intercept("GET", "**/products/1", {
      statusCode: 200,
      body: mockProduct,
    }).as("getProduct");

    cy.intercept("POST", "**/auth", {
      statusCode: 200,
      body: mockLoginResponse,
    }).as("login");

    cy.intercept("PUT", "**/users/*/address", {
      statusCode: 200,
      body: { message: "Address updated" },
    }).as("updateAddress");
  });

  describe("Checkout Process", () => {
    it("should fill shipping address and proceed to payment", () => {
      // 1. Login
      cy.visit(`/#${PathnamesApp.Connexion}`);
      cy.get('input[name="email"]').type("test@example.com");
      cy.get('input[name="password"]').type("password123");
      cy.get('button[type="submit"]').click();
      cy.wait("@login");
      cy.url().should("not.include", "login");

      // 2. Add item to cart
      cy.visit(`/#${PathnamesApp.Bavoirs}`);
      cy.get(".card").first().click();
      cy.get("button")
        .contains(/Ajouter au panier|Add to cart/i)
        .click();

      // 3. Go to Checkout
      cy.visit(`/#${PathnamesApp.Panier}`);
      cy.contains("button", "Passer la commande").click();

      // Verify we are on Checkout Page
      cy.url().should("include", PathnamesApp.Paiement);

      // 4. Fill Shipping Address
      // Country is disabled, defaults to France

      cy.get('input[name="shippingAddress.city"]').type("Paris");
      cy.wait("@getPostalCodes");
      cy.get('input[name="shippingAddress.postalCode"]').type("75001");
      cy.get('input[name="shippingAddress.street"]').type("10 Rue de Rivoli");
      cy.get('input[name="shippingAddress.apartment"]').type("12B");

      // 5. Proceed to next step (Shipping -> Confirmation)
      cy.get(".order-summary__checkout-btn").should("not.be.disabled").click();

      // 6. Verify Confirmation Step
      cy.contains("Confirmation de commande").should("be.visible");
      cy.contains("10 Rue de Rivoli").should("be.visible");

      // 7. Proceed to next step (Confirmation -> Payment)
      cy.get(".order-summary__checkout-btn").click();

      // 8. Verify Payment Step
      cy.contains("Paiement par carte").should("be.visible");
    });
  });

  describe("Profile Address Management", () => {
    it("should update user address in profile", () => {
      // 1. Login
      cy.visit(`/#${PathnamesApp.Connexion}`);
      cy.get('input[name="email"]').type("test@example.com");
      cy.get('input[name="password"]').type("password123");
      cy.get('button[type="submit"]').click();
      cy.wait("@login");
      cy.url().should("not.include", "login");

      // 2. Go to Profile
      cy.visit(`/#${PathnamesApp.Profil}`);
      cy.wait("@getUser");

      // 3. Open Address Edit Mode
      cy.contains(".profile-page__section", "Adresse de livraison")
        .find("button")
        .contains(/Modifier|Add Information/i)
        .click();

      // 4. Fill Address Form
      // Country is disabled

      cy.get('input[name="shippingAddress.city"]').clear().type("Lyon");
      cy.wait("@getPostalCodes");
      cy.get('input[name="shippingAddress.postalCode"]').clear().type("69001");
      cy.get('input[name="shippingAddress.street"]')
        .clear()
        .type("5 Place Bellecour");

      // 5. Save
      cy.get('button[type="submit"]').should("not.be.disabled").click();

      // 6. Verify API call
      cy.wait("@updateAddress").its("request.body").should("deep.include", {
        city: "Lyon",
        postalCode: "69001",
        street: "5 Place Bellecour",
        // country: "France" // Might be missing if disabled
      });

      // Verify view mode shows new address
      cy.contains("5 Place Bellecour").should("be.visible");
      cy.contains("69001 Lyon").should("be.visible");
    });
  });
});
