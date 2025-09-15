import React, { useState } from "react";
import "./formInput.scss";
import { VisibilityIcon } from "./VisibilityIcon";

export type PasswordInputProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  className?: string;
};

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  value,
  onChange,
  name,
  placeholder,
  autoComplete,
  required = false,
  className = "",
}) => {
  const [show, setShow] = useState(false);
  return (
    <label className={"form-label " + className}>
      {label}
      <div style={{ position: "relative" }}>
        <input
          //   id="password-input"
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          className="form-input"
        />
        <button
          type="button"
          className="form-input__icon"
          onClick={() => setShow((v) => !v)}
        >
          <VisibilityIcon off={show} size={22} />
        </button>
      </div>
    </label>
  );
};
