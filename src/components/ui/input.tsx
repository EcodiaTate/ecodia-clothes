import { forwardRef } from "react";

export type InputProps = {
  label?: string;
  error?: string;
  hint?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div>
        {label && (
          <label htmlFor={inputId}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`}>
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`}>
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
