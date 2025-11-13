describe("Checkout Process", () => {
  beforeEach(() => {
    // Настроить localStorage с товарами в корзине
    cy.window().then((win: Window) => {
      win.localStorage.setItem(
        "cart",
        JSON.stringify([
          {
            id: "1",
            name: "iPhone 15 Pro",
            price: 1099,
            count: 1,
            image: "/img/products/iphone-15-pro.jpg",
            color: "Titanium Natural",
          },
        ])
      );
    });

    cy.visit("/panier");
  });

  it("should display cart with items", () => {
    cy.contains("iPhone 15 Pro").should("be.visible");
    cy.contains("1099").should("be.visible");
  });

  it("should navigate to checkout from cart", () => {
    cy.contains("Passer la commande").click();
    cy.url().should("include", "/commander");
  });

  describe("Checkout Steps", () => {
    beforeEach(() => {
      cy.visit("/commander");
    });

    it("should display shipping form as first step", () => {
      cy.get("h2").should("contain", "Livraison");
      cy.get('input[name="firstName"]').should("be.visible");
      cy.get('input[name="lastName"]').should("be.visible");
      cy.get('input[name="email"]').should("be.visible");
      cy.get('input[name="phone"]').should("be.visible");
    });

    it("should show validation errors on shipping form", () => {
      cy.contains("button", "Suivant").click();

      cy.contains("Le prénom est requis").should("be.visible");
      cy.contains("Le nom est requis").should("be.visible");
      cy.contains("L'e-mail est requis").should("be.visible");
    });

    it("should validate email format", () => {
      cy.get('input[name="email"]').type("invalid-email");
      cy.contains("button", "Suivant").click();

      cy.contains("Veuillez saisir un e-mail valide").should("be.visible");
    });

    it("should validate phone number format", () => {
      cy.get('input[name="phone"]').type("123");
      cy.contains("button", "Suivant").click();

      cy.contains("Le numéro de téléphone doit contenir 10 chiffres").should(
        "be.visible"
      );
    });

    it("should validate postal code", () => {
      cy.get('input[name="postalCode"]').type("99999");
      cy.contains("button", "Suivant").click();

      cy.contains("Code postal invalide").should("be.visible");
    });

    it("should proceed to confirmation step with valid data", () => {
      cy.get('input[name="firstName"]').type("Jean");
      cy.get('input[name="lastName"]').type("Dupont");
      cy.get('input[name="email"]').type("jean.dupont@example.com");
      cy.get('input[name="phone"]').type("0612345678");
      cy.get('input[name="address"]').type("123 Rue de la Paix");
      cy.get('input[name="city"]').type("Paris");
      cy.get('input[name="postalCode"]').type("75001");

      cy.contains("button", "Suivant").click();

      // Проверить, что перешли на шаг подтверждения
      cy.contains("Confirmation").should("be.visible");
    });

    it("should display confirmation details", () => {
      // Заполнить форму доставки
      cy.get('input[name="firstName"]').type("Jean");
      cy.get('input[name="lastName"]').type("Dupont");
      cy.get('input[name="email"]').type("jean.dupont@example.com");
      cy.get('input[name="phone"]').type("0612345678");
      cy.get('input[name="address"]').type("123 Rue de la Paix");
      cy.get('input[name="city"]').type("Paris");
      cy.get('input[name="postalCode"]').type("75001");

      cy.contains("button", "Suivant").click();

      // Проверить отображение данных
      cy.contains("Jean Dupont").should("be.visible");
      cy.contains("jean.dupont@example.com").should("be.visible");
      cy.contains("123 Rue de la Paix").should("be.visible");
    });

    it("should allow editing shipping info from confirmation", () => {
      // Заполнить и перейти к подтверждению
      cy.get('input[name="firstName"]').type("Jean");
      cy.get('input[name="lastName"]').type("Dupont");
      cy.get('input[name="email"]').type("jean.dupont@example.com");
      cy.get('input[name="phone"]').type("0612345678");
      cy.get('input[name="address"]').type("123 Rue de la Paix");
      cy.get('input[name="city"]').type("Paris");
      cy.get('input[name="postalCode"]').type("75001");
      cy.contains("button", "Suivant").click();

      // Вернуться к редактированию
      cy.contains("button", "Modifier").click();
      cy.get('input[name="firstName"]').should("have.value", "Jean");
    });

    it("should proceed to payment step", () => {
      // Заполнить форму доставки
      cy.get('input[name="firstName"]').type("Jean");
      cy.get('input[name="lastName"]').type("Dupont");
      cy.get('input[name="email"]').type("jean.dupont@example.com");
      cy.get('input[name="phone"]').type("0612345678");
      cy.get('input[name="address"]').type("123 Rue de la Paix");
      cy.get('input[name="city"]').type("Paris");
      cy.get('input[name="postalCode"]').type("75001");
      cy.contains("button", "Suivant").click();

      // Подтвердить и перейти к оплате
      cy.contains("button", "Passer au paiement").click();
      cy.contains("Paiement").should("be.visible");
    });

    it("should show validation errors on payment form", () => {
      // Перейти к оплате
      cy.get('input[name="firstName"]').type("Jean");
      cy.get('input[name="lastName"]').type("Dupont");
      cy.get('input[name="email"]').type("jean.dupont@example.com");
      cy.get('input[name="phone"]').type("0612345678");
      cy.get('input[name="address"]').type("123 Rue de la Paix");
      cy.get('input[name="city"]').type("Paris");
      cy.get('input[name="postalCode"]').type("75001");
      cy.contains("button", "Suivant").click();
      cy.contains("button", "Passer au paiement").click();

      // Попытаться завершить заказ без заполнения
      cy.contains("button", "Confirmer la commande").click();

      cy.contains("Le numéro de carte est requis").should("be.visible");
      cy.contains("La date d'expiration est requise").should("be.visible");
    });
  });

  describe("Order Summary", () => {
    beforeEach(() => {
      cy.visit("/commander");
    });

    it("should display order summary", () => {
      cy.contains("Résumé de la commande").should("be.visible");
      cy.contains("iPhone 15 Pro").should("be.visible");
      cy.contains("1099").should("be.visible");
    });

    it("should calculate total correctly", () => {
      // Общая сумма должна включать доставку (5.99€ если меньше 50€)
      cy.contains("Total").should("be.visible");
      cy.contains("1104.99").should("be.visible");
    });

    it("should show free shipping for orders over 50€", () => {
      // Добавить больше товаров через localStorage
      cy.window().then((win: Window) => {
        win.localStorage.setItem(
          "cart",
          JSON.stringify([
            {
              id: "1",
              name: "iPhone 15 Pro",
              price: 1099,
              count: 1,
            },
          ])
        );
      });

      cy.reload();

      cy.contains("Gratuite").should("be.visible");
      cy.contains("1099").should("be.visible"); // Без стоимости доставки
    });

    it("should show hint for free shipping threshold", () => {
      // Корзина с товаром менее 50€
      cy.window().then((win: Window) => {
        win.localStorage.setItem(
          "cart",
          JSON.stringify([
            {
              id: "2",
              name: "iPhone Case",
              price: 29.99,
              count: 1,
            },
          ])
        );
      });

      cy.reload();

      cy.contains("Plus que").should("be.visible");
      cy.contains("20.01").should("be.visible");
    });
  });
});
