import React, { useState } from "react";
import "./filterSelect.scss";
import { useSearchParams, useNavigate } from "react-router-dom";
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
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState(startValue);
  const navigate = useNavigate();

  const handleChangeValue = (selectedValue: string) => {
    setValue(selectedValue);

    // Построение новых параметров URL
    const newSearchParams = getSearchParams(selectedValue);

    // Навигация к новому URL
    navigate({
      pathname: window.location.pathname,
      search: newSearchParams,
    });
  };

  const getSearchParams = (params: string) => {
    if (searchParamsKey === "itemsOnPage") {
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
        placeholder="Выберите опцию"
      />
    </div>
  );
};
