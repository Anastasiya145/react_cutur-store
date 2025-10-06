import { forwardRef } from "react";
import "./textInput.scss";

type Props = {
  label: string;
  name?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  autoFocus?: boolean;
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
      ...rest
    },
    ref
  ) => (
    <label className="text-input">
      <span className="text-input__label">{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className="text-input__input"
        autoFocus={autoFocus}
        ref={ref}
        {...rest}
      />
    </label>
  )
);

TextInput.displayName = "TextInput";
