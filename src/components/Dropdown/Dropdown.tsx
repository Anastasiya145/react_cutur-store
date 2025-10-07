import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import "./dropdown.scss";
import { Link, useSearchParams } from "react-router-dom";
import { getSearchWith } from "../../helpers/searchHelper";
import { IconArrowDown } from "../Icons/IconArrowDown";

export type Props = {
  label: string;
  classModificator: string;
  options: string[];
  startValue: string;
  searchParamsKey: string;
};

export const Dropdown: React.FC<Props> = ({
  label,
  classModificator,
  options,
  startValue,
  searchParamsKey,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState(startValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  // Закрытие выпадающего списка при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Закрытие выпадающего списка при нажатии Escape
  useEffect(() => {
    const handleEscapePress = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapePress);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapePress);
    };
  }, [isOpen]);

  const handleChangeValue = (option: string) => {
    setValue(option);
    setIsOpen(false);
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

  return (
    <div className={`dropdown dropdown_${classModificator}`} ref={dropdownRef}>
      <label htmlFor="dropdownSelect" className="dropdown__label">
        {label}
      </label>
      <button
        id="dropdownSelect"
        type="button"
        className={classNames("dropdown__select", {
          "dropdown__select--open": isOpen,
        })}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span>{value}</span>
        <IconArrowDown
          style={{ width: "18px", height: "18px" }}
          className={classNames("dropdown__arrow", {
            dropdown__arrow_opened: isOpen,
          })}
        />
      </button>

      {isOpen && (
        <ul className="dropdown__list" role="listbox">
          {options.map((option) => (
            <li
              key={option}
              className="dropdown__item"
              onClick={() => handleChangeValue(option)}
              role="option"
              aria-selected={option === value}
            >
              <Link
                to={{
                  search: getSearchParams(option),
                }}
                onClick={() => {
                  handleChangeValue(option);
                  toggle();
                }}
                className={classNames("dropdown__link", {
                  active: option === value,
                })}
                tabIndex={isOpen ? 0 : -1}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleChangeValue(option);
                    toggle();
                  }
                }}
              >
                {option}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
