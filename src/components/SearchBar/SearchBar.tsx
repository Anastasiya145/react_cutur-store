import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { getSearchWith } from "../../helpers/searchHelper";
import { useDebounce } from "../../helpers/hooks/useDebounce";
import "./searchBar.scss";
import { IconClose } from "../Icons/IconClose";
import { IconSearch } from "../Icons/IconSearch";
import classNames from "classnames";

export const SearchBar: React.FC = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [appliedQuery, setAppliedQuery] = useState("");
  const debounceSearch = useDebounce(appliedQuery, 500) || null;
  const pathnameNormalized = pathname.substring(1);
  const [isSearchOpened, setIsSearchOpened] = useState(false);

  useEffect(() => {
    if (isSearchOpened) {
      setSearchParams(getSearchWith(searchParams, { query: debounceSearch }));
    }
    // eslint-disable-next-line
  }, [debounceSearch]);

  const handleClearSearchInput = () => {
    setAppliedQuery("");
    setSearchParams(getSearchWith(searchParams, { query: null }));
    setIsSearchOpened(false);
  };

  useEffect(() => {
    handleClearSearchInput();
    // eslint-disable-next-line
  }, [pathname]);

  const handleChangeSearchInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setAppliedQuery(ev.target.value);
  };

  const openSearch = () => setIsSearchOpened(true);

  return (
    <div
      className={classNames("search-bar", {
        "search-bar_opened": isSearchOpened,
      })}
    >
      {!isSearchOpened && (
        <button className="search-bar__icon" type="button" onClick={openSearch}>
          <IconSearch style={{ width: 20, height: 20 }} className="icon__img" />
        </button>
      )}
      {isSearchOpened && (
        <>
          <input
            className="search-bar__input"
            type="text"
            placeholder={`Search in ${pathnameNormalized}`}
            value={appliedQuery}
            onChange={handleChangeSearchInput}
            autoFocus
          />
          <button
            className="search-bar__button"
            type="button"
            onClick={handleClearSearchInput}
          >
            <IconClose />
          </button>
        </>
      )}
    </div>
  );
};
