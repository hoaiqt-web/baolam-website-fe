"use client";

import { PROJECT_TYPES, SERVICE_SCOPES } from "@/lib/contact-options";
import { cn } from "@/lib/utils";

function ChipButton({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-selected={selected}
      aria-pressed={selected}
      className="contact-chip"
    >
      {label}
    </button>
  );
}

type ProjectTypeChipsProps = {
  value: string;
  onChange: (value: string) => void;
  options?: readonly string[];
  className?: string;
};

export function ProjectTypeChips({ value, onChange, options = PROJECT_TYPES, className }: ProjectTypeChipsProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => (
        <ChipButton
          key={option}
          label={option}
          selected={value === option}
          onClick={() => onChange(value === option ? "" : option)}
        />
      ))}
    </div>
  );
}

type ServiceScopeChipsProps = {
  value: string[];
  onChange: (value: string[]) => void;
  options?: readonly string[];
  className?: string;
};

export function ServiceScopeChips({ value, onChange, options = SERVICE_SCOPES, className }: ServiceScopeChipsProps) {
  const toggle = (option: string) => {
    onChange(value.includes(option) ? value.filter((item) => item !== option) : [...value, option]);
  };

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => (
        <ChipButton key={option} label={option} selected={value.includes(option)} onClick={() => toggle(option)} />
      ))}
    </div>
  );
}
