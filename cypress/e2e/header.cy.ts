describe("Header Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display logo and main navigation", () => {
    // Проверка логотипа
    cy.get(".header__logo").should("be.visible");

    // Проверка навигационных ссылок
    cy.get(".nav").should("be.visible");
    cy.contains("iPhone").should("be.visible");
    cy.contains("Accessoires").should("be.visible");
  });

  it("should navigate to iPhone page when clicking iPhone link", () => {
    cy.contains("iPhone").click();
    cy.url().should("include", "/iphone");
    cy.get("h1").should("contain", "iPhone");
  });

  it("should open and close mobile menu on small screens", () => {
    // Изменить размер экрана на мобильный
    cy.viewport("iphone-x");

    // Меню должно быть скрыто
    cy.get(".nav").should("not.be.visible");

    // Кнопка меню должна быть видна
    cy.get(".header__menu-open-button").should("be.visible");

    // Открыть меню
    cy.get(".header__menu-open-button").click();
    cy.get(".header__menu").should("have.class", "header__menu_opened");

    // Закрыть меню
    cy.get(".header__menu-open-button").click();
    cy.get(".header__menu").should("not.have.class", "header__menu_opened");
  });

  it("should display cart and favorites icons", () => {
    cy.get('[data-cy="cart-icon"]').should("be.visible");
    cy.get('[data-cy="favorites-icon"]').should("be.visible");
  });

  it("should show cart count badge when items in cart", () => {
    // Добавить товар в корзину через localStorage
    cy.window().then((win) => {
      win.localStorage.setItem(
        "cart",
        JSON.stringify([{ id: "1", name: "iPhone 15", price: 999, count: 2 }])
      );
    });

    cy.reload();

    // Проверить бейдж с количеством
    cy.get(".icon__count").should("contain", "2");
  });

  it("should display search bar", () => {
    cy.get(".search-bar").should("be.visible");
    cy.get(".search-bar__input").should("be.visible");
  });

  it("should search for products", () => {
    cy.get(".search-bar__input").type("iPhone 15");
    cy.get(".search-bar__input").should("have.value", "iPhone 15");

    // Проверить, что поиск работает
    cy.get(".product-card").should("exist");
  });
});
