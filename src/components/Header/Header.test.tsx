import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as ReactRouterDom from "react-router-dom";
import { Header } from "./Header";
import { AppProvider } from "../../context/AppContextProvider";
import { AuthProvider } from "../../context/AuthContext";

// Mock react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
  useLocation: () => ({
    pathname: "/",
    search: "",
    hash: "",
    state: null,
  }),
}));

// Mock функция для рендера с контекстом
const renderWithContext = (component: React.ReactElement) => {
  return render(
    <ReactRouterDom.BrowserRouter>
      <AuthProvider>
        <AppProvider user={null}>{component}</AppProvider>
      </AuthProvider>
    </ReactRouterDom.BrowserRouter>
  );
};

describe("Header Component", () => {
  beforeEach(() => {
    // Очистить localStorage перед каждым тестом
    localStorage.clear();
  });

  test("renders logo and navigation", () => {
    renderWithContext(<Header />);

    // Проверка навигационных элементов
    expect(screen.getByText("iPhone")).toBeInTheDocument();
    expect(screen.getByText(/accessoires/i)).toBeInTheDocument();
  });

  test("displays cart icon", () => {
    renderWithContext(<Header />);

    // Иконка корзины должна быть видна
    const cartLinks = screen.getAllByRole("link", { name: /panier/i });
    expect(cartLinks.length).toBeGreaterThan(0);
  });

  test("shows cart count badge when items in cart", () => {
    // Добавить товары в localStorage
    localStorage.setItem(
      "cart",
      JSON.stringify([{ id: "1", name: "iPhone 15", price: 999, count: 2 }])
    );

    renderWithContext(<Header />);

    // Проверить, что отображается количество товаров
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  test("search bar is visible and functional", () => {
    renderWithContext(<Header />);

    const searchInput = screen.getByPlaceholderText(/rechercher/i);
    expect(searchInput).toBeInTheDocument();

    // Ввести текст в поиск
    fireEvent.change(searchInput, { target: { value: "iPhone 15" } });
    expect(searchInput).toHaveValue("iPhone 15");
  });

  test("favorites icon is displayed", () => {
    renderWithContext(<Header />);

    const favoriteLinks = screen.getAllByRole("link", { name: /favoris/i });
    expect(favoriteLinks.length).toBeGreaterThan(0);
  });
});
