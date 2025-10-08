import React, { forwardRef, useState, useEffect, useRef } from "react";
import classNames from "classnames";
import "./select.scss";
import { IconArrowDown } from "../../Icons/IconArrowDown";

export type SelectOption = {
  value: string;
  label: string;
};

type Props = {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  value?: string;
  disabled?: boolean;
  defaultValue?: string;
  onChange?: (value: string) => void;
  error?: string;
  [key: string]: any;
};

export const Select = forwardRef<HTMLSelectElement, Props>(
  (
    {
      label,
      options,
      placeholder = "Выберите опцию",
      required = false,
      value,
      defaultValue,
      onChange,
      disabled = false,
      ...rest
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(
      value || defaultValue || ""
    );
    const [selectedLabel, setSelectedLabel] = useState("");
    const selectRef = useRef<HTMLDivElement>(null);

    // Найти label для выбранного значения
    useEffect(() => {
      const selectedOption = options.find(
        (option: SelectOption) => option.value === selectedValue
      );
      setSelectedLabel(selectedOption ? selectedOption.label : placeholder);
    }, [selectedValue, options, placeholder]);

    // Синхронизировать с внешним value
    useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);

    const toggle = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    };

    // Закрытие при клике вне компонента
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          selectRef.current &&
          !selectRef.current.contains(event.target as Node)
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

    // Закрытие при нажатии Escape
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

    const handleOptionSelect = (optionValue: string) => {
      setSelectedValue(optionValue);
      setIsOpen(false);

      if (onChange) {
        onChange(optionValue);
      }

      // Создаем событие для совместимости с react-hook-form
      const event = {
        target: {
          name: rest.name,
          value: optionValue,
        },
      };

      if (rest.onChange) {
        rest.onChange(event);
      }
    };

    return (
      <div
        className={classNames("custom-select", {
          "custom-select--disabled": disabled,
        })}
      >
        <label className="custom-select__label">
          {label}
          {required && <span className="custom-select__required">*</span>}
        </label>

        <div className="custom-select__wrapper" ref={selectRef}>
          <select
            {...rest}
            ref={ref}
            value={selectedValue}
            disabled={disabled}
            onChange={() => {}}
            className="custom-select__hidden"
            tabIndex={-1}
          >
            {options.map((option: SelectOption) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Кастомный интерфейс */}
          <button
            type="button"
            disabled={disabled}
            className={classNames("custom-select__button", {
              "custom-select__button--open": isOpen && !disabled,
              "custom-select__button--filled": selectedValue,
              "custom-select__button--disabled": disabled,
            })}
            onClick={toggle}
            onKeyDown={(e) => {
              if (!disabled && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                toggle();
              }
            }}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-disabled={disabled}
          >
            <span
              className={classNames("custom-select__text", {
                "custom-select__text--placeholder": !selectedValue,
              })}
            >
              {selectedLabel}
            </span>
            <IconArrowDown
              className={classNames("custom-select__arrow", {
                "custom-select__arrow--open": isOpen,
              })}
            />
          </button>

          {isOpen && !disabled && (
            <ul className="custom-select__list" role="listbox">
              {options.map((option: SelectOption) => (
                <li
                  key={option.value}
                  className={classNames("custom-select__option", {
                    "custom-select__option--selected":
                      option.value === selectedValue,
                  })}
                  onClick={() => handleOptionSelect(option.value)}
                  role="option"
                  aria-selected={option.value === selectedValue}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleOptionSelect(option.value);
                    }
                  }}
                  tabIndex={isOpen ? 0 : -1}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";
