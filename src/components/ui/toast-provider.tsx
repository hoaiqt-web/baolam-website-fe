"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { CheckCircle2, CircleAlert, Info, X } from "lucide-react";

type ToastVariant = "success" | "error" | "info";
type ToastInput = { title: string; description?: string; variant?: ToastVariant };
type ToastItem = ToastInput & { id: number };
type ToastContextValue = { toast: (input: ToastInput) => void };

const ToastContext = createContext<ToastContextValue | null>(null);
let nextToastId = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((item) => item.id !== id));
  }, []);

  const toast = useCallback((input: ToastInput) => {
    const id = ++nextToastId;
    setToasts((current) => [...current.slice(-3), { ...input, id }]);
    window.setTimeout(() => dismiss(id), input.variant === "error" ? 6500 : 4200);
  }, [dismiss]);

  const value = useMemo(() => ({ toast }), [toast]);

  return <ToastContext.Provider value={value}>
    {children}
    <div aria-live="polite" aria-atomic="false" className="pointer-events-none fixed right-4 top-4 z-[200] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-3">
      {toasts.map((item) => <ToastCard key={item.id} item={item} onDismiss={() => dismiss(item.id)}/>) }
    </div>
  </ToastContext.Provider>;
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast phải được dùng bên trong ToastProvider");
  return context;
}

const VARIANT_STYLES: Record<ToastVariant, { border: string; accent: string; background: string }> = {
  success: {
    border: "border-baolam-success/60",
    accent: "bg-baolam-success text-baolam-bg",
    background: "color-mix(in srgb, var(--color-baolam-success) 22%, #071522)",
  },
  error: {
    border: "border-baolam-error/60",
    accent: "bg-baolam-error text-baolam-bg",
    background: "color-mix(in srgb, var(--color-baolam-error) 22%, #071522)",
  },
  info: {
    border: "border-baolam-primary/60",
    accent: "bg-baolam-primary text-baolam-bg",
    background: "color-mix(in srgb, var(--color-baolam-primary) 22%, #071522)",
  },
};

function ToastCard({ item, onDismiss }: { item: ToastItem; onDismiss: () => void }) {
  const variant = item.variant ?? "info";
  const Icon = variant === "success" ? CheckCircle2 : variant === "error" ? CircleAlert : Info;
  const styles = VARIANT_STYLES[variant];

  return <div
    role={variant === "error" ? "alert" : "status"}
    style={{ background: styles.background }}
    className={`pointer-events-auto flex items-start gap-3 rounded-xl border p-4 text-white shadow-2xl backdrop-blur-xl ${styles.border}`}
  >
    <span className={`grid size-8 shrink-0 place-items-center rounded-full ${styles.accent}`}>
      <Icon className="size-4"/>
    </span>
    <div className="min-w-0 flex-1 pt-0.5">
      <p className="text-sm font-semibold text-white">{item.title}</p>
      {item.description && <p className="mt-1 text-xs leading-5 text-baolam-muted">{item.description}</p>}
    </div>
    <button type="button" onClick={onDismiss} aria-label="Đóng thông báo" className="grid size-7 shrink-0 place-items-center rounded-md text-white/55 transition hover:bg-white/10 hover:text-white"><X className="size-4"/></button>
  </div>;
}
