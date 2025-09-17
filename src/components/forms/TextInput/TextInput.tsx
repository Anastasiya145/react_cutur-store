import React, { forwardRef } from "react";
import "./textInput.scss";

type Props = {
  label: string;
  name?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  className?: string;
  autoFocus?: boolean;
  [key: string]: any;
};

export const TextInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      name,
      type = "text",
      placeholder,
      autoComplete,
      required = false,
      className = "text-input",
      autoFocus = false,
      ...rest
    },
    ref
  ) => (
    <label className={className}>
      <span className={`${className}__label`}>{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className={`${className}__input`}
        autoFocus={autoFocus}
        ref={ref}
        {...rest}
      />
    </label>
  )
);

TextInput.displayName = "TextInput";
