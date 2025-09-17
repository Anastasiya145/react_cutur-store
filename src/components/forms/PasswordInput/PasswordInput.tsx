import React, { useState, forwardRef } from "react";
import "./passwordInput.scss";
import { VisibilityIcon } from "../VisibilityIcon";

export type PasswordInputProps = {
  label: string;
  name?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  [key: string]: any;
};

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    { label, name, placeholder, autoComplete, required = false, ...rest },
    ref
  ) => {
    const [show, setShow] = useState(false);

    return (
      <label className="password-input">
        <span className="password-input__label">{label}</span>
        <div className="password-input__field">
          <input
            type={show ? "text" : "password"}
            name={name}
            placeholder={placeholder}
            autoComplete={autoComplete}
            required={required}
            className="password-input__input"
            ref={ref}
            {...rest}
          />
          <button
            type="button"
            className="password-input__icon"
            onClick={() => setShow((v) => !v)}
            tabIndex={-1}
          >
            <VisibilityIcon off={show} size={22} />
          </button>
        </div>
      </label>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
