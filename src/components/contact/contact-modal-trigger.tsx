"use client";

import type { ButtonHTMLAttributes } from "react";
import { useContactModal } from "@/components/contact/contact-modal-context";

type ContactModalTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  source?: string;
};

export function ContactModalTrigger({ source, onClick, children, ...props }: ContactModalTriggerProps) {
  const { openContactModal } = useContactModal();

  return (
    <button
      type="button"
      onClick={(event) => {
        onClick?.(event);
        openContactModal(source);
      }}
      {...props}
    >
      {children}
    </button>
  );
}
