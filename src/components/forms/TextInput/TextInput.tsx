import { forwardRef } from "react";
import classNames from "classnames";
import "./textInput.scss";

type Props = {
  label: string;
  name?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  autoFocus?: boolean;
  error?: string;
  [key: string]: any;
};

export const TextInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      name,
      type = "text",
      placeholder = "Entrer le texte",
      autoComplete,
      required = false,
      autoFocus = false,
      error,
      ...rest
    },
    ref
  ) => (
    <label className="text-input">
      <span className="text-input__label">
        {label}
        {required && <span className="text-input__required">*</span>}
      </span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className={classNames("text-input__input", {
          "text-input__input--error": !!error,
        })}
        autoFocus={autoFocus}
        ref={ref}
        {...rest}
      />
      {error && <span className="text-input__error">{error}</span>}
    </label>
  )
);

TextInput.displayName = "TextInput";
