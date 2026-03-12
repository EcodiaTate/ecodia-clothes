import { forwardRef } from "react";


export type TextareaProps = {
  label?: string;
  error?: string;
  hint?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div>
        {label && (
          <label
            htmlFor={inputId}
           
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          rows={props.rows || 4}
          
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          {...props}
        />
        {error && (
          <p
            id={`${inputId}-error`}
           
           
          >
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

Textarea.displayName = "Textarea";
