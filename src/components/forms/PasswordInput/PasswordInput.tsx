import React, { useState, forwardRef, InputHTMLAttributes } from "react";
import "./passwordInput.scss";
import { VisibilityIcon } from "../../Icons/VisibilityIcon";
import classNames from "classnames";

export type PasswordInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  label: string;
  error?: string;
};

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      label,
      placeholder = "Entrer le mot de passe",
      required = false,
      error,
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
            placeholder={placeholder}
            required={required}
            className={classNames("password-input__input", {
              "--error": error,
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

        {error && <span className="text-input__error">{error}</span>}
      </label>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
