# Gadgets store

This application is designed as a single-page online store with various features for users. It allows users to explore products, add them to their cart or favorites, search for specific items, sort products according to their preferences, modify the quantity of products in their cart, and view detailed information about each product.

# [DEMO](https://anastasiya145.github.io/online-gadgets-catalog/)

To build the application, functional components and React Hooks are utilized, resulting in a more efficient and maintainable codebase. The components are designed in an abstract manner, ensuring they can be easily reused throughout the application. This approach contributes to the overall scalability and flexibility of the project.

To achieve a consistent and organized styling, Sass (SCSS) is employed. This provides a modular and structured approach to managing styles, making it easier to maintain and extend the application's appearance.

Moreover, the BEM methodology is adopted for naming and styling the components. This methodology ensures a consistent and clear structure in the codebase, making it more readable and understandable for developers collaborating on the project.

# Technologies I used

- React.js
- React Router(v6)
- React-Slick(Slick Slider)
- JSX
- TypeScript
- JavaScript
- Fetch, API
- Sass (SCSS)
- BEM methodology

## App

- The application is fully responsive and functions effectively on all screen sizes.
- Navigation is implemented using React Router.

## Home page

- The home page features product sliders are implemented as touch sliders, allowing users to drag and swipe them (for this I used Slick Slider). Additionally they can be scrolled by clicking on the arrow buttons. These sliders adapt to various screen sizes and adjust the number of displayed products accordingly. The product data is fetched from the server.

## Catalog pages

- Products are fetched from the server by category.
- Ability to sort products by name, price, and age is implemented.
- All sorting parameters are saved in the URL.

- Pagination is implemented. The number of products displayed on the page can be changed by the user.
- Search and filter products by name is implemented.
- Debounce function is used to prevent the server from being overloaded with requests.

## Product details page

- Product details are fetched from the server.
- User can pick a color and capacity of the product.
- Photos of the product can be changed by clicking on the thumbnails.
- User can add the product to the cart or favorites.

## Cart page

- User can change the quantity of products in the cart and remove products from the cart.
- Cart items count is shown near the Cart icon in the header.
- Total amount and quantity are calculated automatically.
- Cart items are saved in the local storage.

## Favorites page

- User can add products to favorites and remove them from favorites.
- Favorites count is shown near the Favorites icon in the header.
- Favorites are saved in the local storage.
