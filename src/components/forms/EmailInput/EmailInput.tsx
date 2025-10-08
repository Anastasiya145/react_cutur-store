import { forwardRef } from "react";
import { TextInput } from "../TextInput/TextInput";

export type EmailInputProps = {
  label?: string;
  name?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  [key: string]: any;
};

export const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  (
    {
      label = "E-mail",
      placeholder = "Entrez votre e-mail",
      autoComplete = "email",
      required = true,
      ...rest
    },
    ref
  ) => {
    return (
      <TextInput
        label={label}
        type="email"
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        ref={ref}
        error={rest.error}
        {...rest}
      />
    );
  }
);

EmailInput.displayName = "EmailInput";
