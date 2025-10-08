import React, { useState } from "react";
import "./filterSelect.scss";
import { useSearchParams } from "react-router-dom";
import { getSearchWith } from "../../helpers/searchHelper";
import { Select, SelectOption } from "../forms/Select/Select";

export type FilterSelectProps = {
  label: string;
  classModificator: string;
  options: string[];
  startValue: string;
  searchParamsKey: string;
};

export const FilterSelect: React.FC<FilterSelectProps> = ({
  label,
  classModificator,
  options,
  startValue,
  searchParamsKey,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(startValue);

  const handleChangeValue = (selectedValue: string) => {
    setValue(selectedValue);

    // Построение новых параметров URL
    const newSearchParams = getSearchParams(selectedValue);

    // Обновляем только параметры поиска (оставляем текущий путь)
    // getSearchWith возвращает строку без ведущего '?', setSearchParams
    // принимает URLSearchParams или объект, поэтому создаём объект
    setSearchParams(new URLSearchParams(newSearchParams));
  };

  const getSearchParams = (params: string) => {
    if (searchParamsKey === "itemsOnPage") {
      // if user selects 'All', remove the itemsOnPage param so ProductList
      // will treat it as showing all items (it falls back to products.length)
      if (params === "All") {
        return getSearchWith(searchParams, {
          page: "1",
          [searchParamsKey]: null,
        });
      }

      return getSearchWith(searchParams, {
        page: "1",
        [searchParamsKey]: params,
      });
    }

    return getSearchWith(searchParams, {
      [searchParamsKey]: params,
    });
  };

  // Преобразуем строковые опции в формат SelectOption
  const selectOptions: SelectOption[] = options.map((option) => ({
    value: option,
    label: option,
  }));

  return (
    <div className={`filter-select filter-select_${classModificator}`}>
      <Select
        label={label}
        options={selectOptions}
        value={value}
        onChange={handleChangeValue}
      />
    </div>
  );
};
