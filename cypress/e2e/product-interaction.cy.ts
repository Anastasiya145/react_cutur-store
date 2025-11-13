describe("Product Interactions", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Product List", () => {
    beforeEach(() => {
      cy.visit("/iphone");
    });

    it("should display products", () => {
      cy.get(".product-card").should("have.length.greaterThan", 0);
    });

    it("should filter products by category", () => {
      cy.get(".filter-select").first().click();
      cy.contains("iPhone 15").click();

      cy.get(".product-card").each(($card) => {
        cy.wrap($card).should("contain", "iPhone 15");
      });
    });

    it("should sort products by price", () => {
      cy.get(".filter-select").eq(1).click();
      cy.contains("Prix croissant").click();

      // Проверить, что цены отсортированы
      cy.get(".product-price").then(($prices) => {
        const prices = $prices
          .toArray()
          .map((el) =>
            parseFloat(el.textContent?.replace(/[^\d.]/g, "") || "0")
          );
        const sorted = [...prices].sort((a, b) => a - b);
        expect(prices).to.deep.equal(sorted);
      });
    });

    it("should search products", () => {
      cy.get(".search-bar__input").type("iPhone 15 Pro");
      cy.get(".product-card").should("contain", "iPhone 15 Pro");
    });

    it("should paginate products", () => {
      // Перейти на вторую страницу
      cy.get(".pagination__item").contains("2").click();
      cy.url().should("include", "page=2");
    });
  });

  describe("Product Details", () => {
    beforeEach(() => {
      cy.visit("/iphone");
      cy.get(".product-card").first().click();
    });

    it("should display product details", () => {
      cy.get("h1").should("be.visible");
      cy.get(".product-price").should("be.visible");
      cy.get(".product__description").should("be.visible");
    });

    it("should select product color", () => {
      cy.get(".color-selector__item").first().click();
      cy.get(".color-selector__item")
        .first()
        .should("have.class", "color-selector__item--active");
    });

    it("should select product storage", () => {
      cy.get(".storage-selector__item").first().click();
      cy.get(".storage-selector__item")
        .first()
        .should("have.class", "storage-selector__item--active");
    });

    it("should add product to cart", () => {
      cy.get("button").contains("Ajouter au panier").click();

      // Проверить уведомление
      cy.contains("Produit ajouté au panier").should("be.visible");

      // Проверить, что бейдж корзины обновился
      cy.get(".icon__count").should("exist");
    });

    it("should add product to favorites", () => {
      cy.get('[data-cy="add-to-favorites"]').click();

      cy.contains("Ajouté aux favoris").should("be.visible");
    });

    it("should increment/decrement quantity", () => {
      cy.get('[data-cy="decrement-quantity"]').should("be.disabled");

      cy.get('[data-cy="increment-quantity"]').click();
      cy.get('[data-cy="quantity-value"]').should("contain", "2");

      cy.get('[data-cy="decrement-quantity"]').click();
      cy.get('[data-cy="quantity-value"]').should("contain", "1");
    });

    it("should show product images carousel", () => {
      cy.get(".swiper-slide").should("have.length.greaterThan", 1);

      // Переключить изображение
      cy.get(".swiper-button-next").click();
      cy.get(".swiper-slide-active").should("not.be", ":first-child");
    });
  });

  describe("Cart Management", () => {
    beforeEach(() => {
      // Добавить товар в корзину
      cy.window().then((win: Window) => {
        win.localStorage.setItem(
          "cart",
          JSON.stringify([
            {
              id: "1",
              name: "iPhone 15 Pro",
              price: 1099,
              count: 2,
              color: "Titanium Natural",
              storage: "256GB",
            },
          ])
        );
      });

      cy.visit("/panier");
    });

    it("should display cart items", () => {
      cy.contains("iPhone 15 Pro").should("be.visible");
      cy.contains("1099").should("be.visible");
      cy.contains("Titanium Natural").should("be.visible");
    });

    it("should update item quantity", () => {
      cy.get('[data-cy="increment-cart-item"]').click();
      cy.get('[data-cy="cart-item-quantity"]').should("contain", "3");

      // Проверить обновление суммы
      cy.contains("3297").should("be.visible");
    });

    it("should remove item from cart", () => {
      cy.get('[data-cy="remove-cart-item"]').click();
      cy.contains("Votre panier est vide").should("be.visible");
    });

    it("should calculate total correctly", () => {
      // 2 товара по 1099€
      cy.contains("2198").should("be.visible");
    });

    it("should show empty cart message", () => {
      cy.window().then((win: Window) => {
        win.localStorage.removeItem("cart");
      });

      cy.reload();
      cy.contains("Votre panier est vide").should("be.visible");
    });
  });

  describe("Favorites", () => {
    beforeEach(() => {
      cy.window().then((win: Window) => {
        win.localStorage.setItem(
          "favorites",
          JSON.stringify([
            {
              id: "1",
              name: "iPhone 15 Pro",
              price: 1099,
              image: "/img/products/iphone-15-pro.jpg",
            },
          ])
        );
      });

      cy.visit("/favoris");
    });

    it("should display favorite items", () => {
      cy.contains("iPhone 15 Pro").should("be.visible");
      cy.contains("1099").should("be.visible");
    });

    it("should remove item from favorites", () => {
      cy.get('[data-cy="remove-favorite"]').click();
      cy.contains("Vos favoris sont vides").should("be.visible");
    });

    it("should add favorite item to cart", () => {
      cy.get("button").contains("Ajouter au panier").click();

      // Перейти в корзину и проверить
      cy.visit("/panier");
      cy.contains("iPhone 15 Pro").should("be.visible");
    });
  });
});
