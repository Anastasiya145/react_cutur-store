import { PathnamesForNav } from "../../src/types/Pathnames";
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

describe("Category Page functionality", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/categories/*", {
      statusCode: 200,
      body: [mockProduct],
    }).as("getCategoryProducts");
  });

  // Define the categories we want to test dynamically from the router config
  const categories = Object.entries(PathnamesForNav)
    .filter(([key]) => key !== "Accueil")
    .map(([key, value]) => ({
      name: key,
      path: value,
      title: key,
    }));

  categories.forEach((category) => {
    it(`should navigate to ${category.name} from Home Page via category card`, () => {
      cy.visit("/#");

      // Scroll to ensure elements are loaded/visible
      cy.get(".header").scrollIntoView().should("be.visible");

      // Find the category card by href and click it
      // Using force: true just in case of overlays/animations
      cy.get(`.category-card[href="#${category.path}"]`).click({ force: true });

      // Verify URL
      // Handle URL encoding for special characters
      cy.url().should(
        "satisfy",
        (url: string) =>
          url.includes(category.path) || url.includes(encodeURI(category.path))
      );

      // Verify Page Title
      // Use regex for case-insensitive match
      cy.get(".page__title").contains(new RegExp(category.title, "i"));

      // Verify that products are displayed (at least one)
      cy.get(".card").should("have.length.gt", 0);
    });
  });

  it("should navigate through all categories via header menu", () => {
    cy.visit("/#");

    categories.forEach((category) => {
      // Click on the navigation item
      cy.get(`[data-cy="header"] .nav__item[href="#${category.path}"]`).click();

      // Verify URL
      cy.url().should(
        "satisfy",
        (url: string) =>
          url.includes(category.path) || url.includes(encodeURI(category.path))
      );

      // Verify title to ensure page load
      cy.get(".page__title").contains(new RegExp(category.title, "i"));
    });
  });
});
