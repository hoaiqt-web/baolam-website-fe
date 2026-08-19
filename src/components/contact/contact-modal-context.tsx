"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ContactModal } from "@/components/contact/contact-modal";
import { DEFAULT_SITE_SETTINGS, type PublicSiteSettings } from "@/data/site-settings-defaults";

type ContactModalContextValue = {
  isOpen: boolean;
  source: string | null;
  siteSettings: PublicSiteSettings;
  openContactModal: (source?: string) => void;
  closeContactModal: () => void;
};

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<string | null>(null);
  const [siteSettings, setSiteSettings] = useState<PublicSiteSettings>(DEFAULT_SITE_SETTINGS);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/site-settings")
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data: PublicSiteSettings) => {
        if (!cancelled) setSiteSettings(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const openContactModal = useCallback((nextSource?: string) => {
    setSource(nextSource ?? null);
    setIsOpen(true);
  }, []);

  const closeContactModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({ isOpen, source, siteSettings, openContactModal, closeContactModal }),
    [isOpen, source, siteSettings, openContactModal, closeContactModal]
  );

  return (
    <ContactModalContext.Provider value={value}>
      {children}
      <ContactModal open={isOpen} onOpenChange={setIsOpen} settings={siteSettings} />
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (!context) throw new Error("useContactModal phải được dùng bên trong ContactModalProvider");
  return context;
}
