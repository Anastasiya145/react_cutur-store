import { forwardRef, InputHTMLAttributes } from "react";
import classNames from "classnames";
import "./textInput.scss";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  type?: string;
  error?: string;
};

export const TextInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      type = "text",
      placeholder = "Entrer le texte",
      required = false,
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
        placeholder={placeholder}
        required={required}
        className={classNames("text-input__input", {
          "text-input__input--error": !!error,
        })}
        ref={ref}
        {...rest}
      />
      {error && <span className="text-input__error">{error}</span>}
    </label>
  )
);

TextInput.displayName = "TextInput";
