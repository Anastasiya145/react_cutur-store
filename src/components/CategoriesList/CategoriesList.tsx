import React, { useEffect, useState } from "react";
import { Category } from "../../types/Category";
import { CategoryCard } from "../CategoryCard/CategoryCard";
import "./categoriesList.scss";
import { getCategories } from "../../api/fetchData";
import { Loader } from "../Loader/Loader";

export const CategoriesList: React.FC = () => {
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadCategories() {
    setIsLoading(true);

    try {
      const categoriesFromServer = await getCategories();

      setCategoriesList(categoriesFromServer);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ul className="product-category">
      {categoriesList.map((category) => (
        <CategoryCard
          key={`${category.name}-${category.id}`}
          data-cy="categoryLinksContainer"
          category={category}
        />
      ))}
    </ul>
  );
};
