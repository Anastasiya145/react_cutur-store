import { forwardRef } from "react";
import classNames from "classnames";
import "./textArea.scss";

type Props = {
  label: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  error?: string;
  [key: string]: any;
};

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      label,
      name,
      placeholder = "Entrer le texte",
      required = false,
      rows = 3,
      error,
      ...rest
    },
    ref
  ) => (
    <label className="text-area">
      <span className="text-area__label">
        {label}
        {required && <span className="text-area__required">*</span>}
      </span>
      <textarea
        name={name}
        placeholder={placeholder}
        required={required}
        className={classNames("text-area__input", {
          "text-area__input--error": !!error,
        })}
        rows={rows}
        ref={ref}
        {...rest}
      />
      {error && <span className="text-area__error">{error}</span>}
    </label>
  )
);

TextArea.displayName = "TextArea";
