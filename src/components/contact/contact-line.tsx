"use client";

import { useContactModal } from "@/components/contact/contact-modal-context";

export function ContactLine({ className }: { className?: string }) {
  const { siteSettings } = useContactModal();

  return (
    <p className={className}>
      {siteSettings.contactEmail} · {siteSettings.contactPhone} · {siteSettings.officeAddress}
    </p>
  );
}
