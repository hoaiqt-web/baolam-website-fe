"use client";

import type { ReactNode } from "react";

type ContactSuccessAction = {
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary";
};

type ContactSuccessProps = {
  title: string;
  description: ReactNode;
  actions: ContactSuccessAction[];
};

export function ContactSuccess({ title, description, actions }: ContactSuccessProps) {
  return (
    <div className="flex flex-col items-center px-2 py-8 text-center">
      <svg viewBox="0 0 52 52" className="size-14 text-baolam-success" aria-hidden="true">
        <circle
          className="success-check-circle"
          cx="26"
          cy="26"
          r="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path
          className="success-check-mark"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14 27l7 7 16-16"
        />
      </svg>
      <h3 className="mt-5 text-lg font-black uppercase tracking-wide text-white">{title}</h3>
      <div className="mt-3 max-w-sm text-sm leading-[1.7] text-baolam-muted">{description}</div>
      <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        {actions.map((action) =>
          action.href ? (
            <a
              key={action.label}
              href={action.href}
              className={
                action.variant === "secondary"
                  ? "inline-flex items-center justify-center border border-white/20 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:border-baolam-primary hover:text-baolam-primary"
                  : "inline-flex items-center justify-center bg-baolam-primary px-6 py-3 text-xs font-bold uppercase tracking-wider text-baolam-bg transition-colors hover:bg-baolam-primary-hover"
              }
            >
              {action.label}
            </a>
          ) : (
            <button
              key={action.label}
              type="button"
              onClick={action.onClick}
              className={
                action.variant === "secondary"
                  ? "inline-flex items-center justify-center border border-white/20 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:border-baolam-primary hover:text-baolam-primary"
                  : "inline-flex items-center justify-center bg-baolam-primary px-6 py-3 text-xs font-bold uppercase tracking-wider text-baolam-bg transition-colors hover:bg-baolam-primary-hover"
              }
            >
              {action.label}
            </button>
          )
        )}
      </div>
    </div>
  );
}
