"use client";

type FormStatus = "idle" | "loading" | "success" | "error";

const OPTIONS: { status: FormStatus; label: string }[] = [
  { status: "idle", label: "Default" },
  { status: "loading", label: "Loading" },
  { status: "success", label: "Success" },
  { status: "error", label: "Error" },
];

/** QA-only status toggle so form states can be verified without a backend. Stripped in production. */
export function ContactDemoToggle({ status, onChange }: { status: FormStatus; onChange: (status: FormStatus) => void }) {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="mt-4 flex flex-wrap items-center gap-1.5 border border-dashed border-white/15 px-2.5 py-2 text-[10px] uppercase tracking-wider text-baolam-muted">
      <span className="mr-1 font-bold">Demo state:</span>
      {OPTIONS.map((option) => (
        <button
          key={option.status}
          type="button"
          onClick={() => onChange(option.status)}
          className={`px-2 py-1 transition-colors ${
            status === option.status ? "bg-baolam-primary text-baolam-bg" : "border border-white/15 hover:border-white/40"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
