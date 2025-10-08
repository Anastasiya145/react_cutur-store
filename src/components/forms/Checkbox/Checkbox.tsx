import React from "react";
import { UseFormRegister } from "react-hook-form";
import "./checkbox.scss";

interface CheckboxProps {
  id: string;
  label: React.ReactNode;
  name?: string;
  defaultChecked?: boolean;
  register?: UseFormRegister<any>;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  name,
  defaultChecked,
  register,
  className = "",
}) => {
  const registerProps = register && name ? (register(name) as any) : {};

  return (
    <div className={`checkbox ${className}`.trim()}>
      <input
        type="checkbox"
        id={id}
        className="checkbox__input"
        defaultChecked={defaultChecked}
        {...registerProps}
      />
      <label htmlFor={id} className="checkbox__label">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
