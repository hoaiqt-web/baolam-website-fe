"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { ContactModal } from "@/components/contact/contact-modal";

type ContactModalContextValue = {
  isOpen: boolean;
  source: string | null;
  openContactModal: (source?: string) => void;
  closeContactModal: () => void;
};

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<string | null>(null);

  const openContactModal = useCallback((nextSource?: string) => {
    setSource(nextSource ?? null);
    setIsOpen(true);
  }, []);

  const closeContactModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({ isOpen, source, openContactModal, closeContactModal }),
    [isOpen, source, openContactModal, closeContactModal]
  );

  return (
    <ContactModalContext.Provider value={value}>
      {children}
      <ContactModal open={isOpen} onOpenChange={setIsOpen} />
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (!context) throw new Error("useContactModal phải được dùng bên trong ContactModalProvider");
  return context;
}
