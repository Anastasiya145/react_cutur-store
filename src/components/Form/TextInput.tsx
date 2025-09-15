import React from "react";
import "./formInput.scss";

type Props = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  className?: string;
  autoFocus?: boolean;
};

export const TextInput: React.FC<Props> = ({
  label,
  value,
  onChange,
  name,
  type = "text",
  placeholder,
  autoComplete,
  required = false,
  className = "",
  autoFocus = false,
}) => (
  <label className={"form-label " + className}>
    {label}
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
      required={required}
      className="form-input"
      autoFocus={autoFocus}
    />
  </label>
);
