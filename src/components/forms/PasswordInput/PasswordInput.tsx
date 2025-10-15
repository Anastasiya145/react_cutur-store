import React, { useState, forwardRef } from "react";
import "./passwordInput.scss";
import { VisibilityIcon } from "../../Icons/VisibilityIcon";
import classNames from "classnames";

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
    {
      label,
      name,
      placeholder = "Entrer le mot de passe",
      autoComplete,
      required = false,
      ...rest
    },
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
            // className="password-input__input"
            className={classNames("password-input__input", {
              "--error": rest.error,
            })}
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

        {rest.error && <span className="text-input__error">{rest.error}</span>}
      </label>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
