"use client";

import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ContactFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const ContactField = forwardRef<HTMLInputElement, ContactFieldProps>(
  ({ label, error, id, required, className, ...props }, ref) => {
    const fieldId = id ?? `contact-field-${label.toLowerCase().replace(/\s+/g, "-")}`;
    const errorId = error ? `${fieldId}-error` : undefined;

    return (
      <div className="flex flex-col">
        <label htmlFor={fieldId} className="text-xs font-bold uppercase tracking-wider text-baolam-muted">
          {label} {required && <span className="text-baolam-primary">*</span>}
        </label>
        <input
          ref={ref}
          id={fieldId}
          required={required}
          aria-invalid={!!error}
          aria-describedby={errorId}
          className={cn("contact-input mt-1.5", className)}
          {...props}
        />
        {error && (
          <p id={errorId} role="alert" className="mt-1.5 text-xs font-medium text-baolam-error">
            {error}
          </p>
        )}
      </div>
    );
  }
);
ContactField.displayName = "ContactField";

type ContactTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export const ContactTextarea = forwardRef<HTMLTextAreaElement, ContactTextareaProps>(
  ({ label, error, id, required, className, rows = 4, ...props }, ref) => {
    const fieldId = id ?? `contact-field-${label.toLowerCase().replace(/\s+/g, "-")}`;
    const errorId = error ? `${fieldId}-error` : undefined;

    return (
      <div className="flex flex-col">
        <label htmlFor={fieldId} className="text-xs font-bold uppercase tracking-wider text-baolam-muted">
          {label} {required && <span className="text-baolam-primary">*</span>}
        </label>
        <textarea
          ref={ref}
          id={fieldId}
          rows={rows}
          required={required}
          aria-invalid={!!error}
          aria-describedby={errorId}
          className={cn("contact-input mt-1.5", className)}
          {...props}
        />
        {error && (
          <p id={errorId} role="alert" className="mt-1.5 text-xs font-medium text-baolam-error">
            {error}
          </p>
        )}
      </div>
    );
  }
);
ContactTextarea.displayName = "ContactTextarea";
