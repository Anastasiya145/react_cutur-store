import { PathnamesApp } from "../../src/types/Pathnames";
import { Product } from "../../src/types/Product";

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Product A",
    price: 10,
    final_price: 10,
    category: "bavoirs",
    items_left: 10,
    images: ["img1.jpg"],
    main_image: "img1",
    description: { title: "", text: [], advice: "" },
    color: "red",
    discount: 0,
    material: "cotton",
    colors_available: [],
  },
  {
    id: "2",
    name: "Product B",
    price: 20,
    final_price: 20,
    category: "bavoirs",
    items_left: 10,
    images: ["img2.jpg"],
    main_image: "img2",
    description: { title: "", text: [], advice: "" },
    color: "blue",
    discount: 0,
    material: "cotton",
    colors_available: [],
  },
  {
    id: "3",
    name: "Product C",
    price: 5,
    final_price: 5,
    category: "bavoirs",
    items_left: 10,
    images: ["img3.jpg"],
    main_image: "img3",
    description: { title: "", text: [], advice: "" },
    color: "green",
    discount: 0,
    material: "cotton",
    colors_available: [],
  },
  {
    id: "4",
    name: "Product D",
    price: 15,
    final_price: 15,
    category: "bavoirs",
    items_left: 10,
    images: ["img4.jpg"],
    main_image: "img4",
    description: { title: "", text: [], advice: "" },
    color: "yellow",
    discount: 0,
    material: "cotton",
    colors_available: [],
  },
  {
    id: "5",
    name: "Product E",
    price: 25,
    final_price: 25,
    category: "bavoirs",
    items_left: 10,
    images: ["img5.jpg"],
    main_image: "img5",
    description: { title: "", text: [], advice: "" },
    color: "black",
    discount: 0,
    material: "cotton",
    colors_available: [],
  },
];

describe("Category Page - Sort and Pagination", () => {
  beforeEach(() => {
    // Intercept the API call
    cy.intercept("GET", "**/categories/bavoirs", {
      statusCode: 200,
      body: mockProducts,
    }).as("getProducts");

    // Visit a category page
    cy.visit(`/#${PathnamesApp.Bavoirs}`);

    // Wait for the API call
    cy.wait("@getProducts");

    // Wait for products to load
    cy.get(".card").should("have.length.gt", 0);
  });

  it("should sort products", () => {
    // 1. Sort by Price Ascending (Cheapest)
    cy.get(".filter-select_sort .custom-select__button").click();
    cy.contains(".custom-select__option", "cheapest").click();

    cy.url().should("include", "sort=cheapest");

    // Verify first item is Product C (Price 5)
    cy.get(".card").first().contains("Product C");

    // 2. Sort by Price Descending (Expensive)
    cy.get(".filter-select_sort .custom-select__button").click();
    cy.contains(".custom-select__option", "expensive").click();
    cy.url().should("include", "sort=expensive");

    // Verify first item is Product E (Price 25)
    cy.get(".card").first().contains("Product E");

    // 3. Sort Alphabetically
    cy.get(".filter-select_sort .custom-select__button").click();
    cy.contains(".custom-select__option", "alphabetically").click();
    cy.url().should("include", "sort=alphabetically");

    // Verify first item is Product A
    cy.get(".card").first().contains("Product A");
  });

  it("should paginate products", () => {
    // 1. Change items per page to 4
    cy.get(".filter-select_items .custom-select__button").click();
    cy.contains(".custom-select__option", "4").click();

    cy.url().should("include", "itemsOnPage=4");

    // Verify only 4 items are shown
    cy.get(".card").should("have.length", 4);

    // 2. Go to next page
    cy.get('[data-cy="paginationRight"]')
      .last()
      .scrollIntoView()
      .click({ force: true });

    cy.url().should("include", "page=2"); // Verify 1 item is shown (5th product)
    cy.get(".card").should("have.length", 1);
    // Note: The order depends on the default sort.
    // If default sort is by ID or insertion order, it might be E.
    // Let's just check if we have 1 card.
  });
});
