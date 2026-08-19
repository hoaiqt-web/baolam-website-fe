"use client";

/**
 * Invisible to real visitors (off-screen, aria-hidden, no label) but simple bots
 * that auto-fill every input in a form will populate it. Server checks this and
 * silently no-ops the submission if it's non-empty.
 */
export function HoneypotField({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
