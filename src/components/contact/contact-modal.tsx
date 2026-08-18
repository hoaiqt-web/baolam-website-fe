"use client";

import { useRef } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import { QuickContactForm } from "@/components/contact/quick-contact-form";

type ContactModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const HEADLINE = "Cùng kiến tạo một không gian có giá trị.";
const INTRO =
  "Chia sẻ với chúng tôi một vài thông tin ban đầu. Đội ngũ Bảo Lâm sẽ liên hệ để trao đổi về ý tưởng, phạm vi và khả năng triển khai.";

export function ContactModal({ open, onOpenChange }: ContactModalProps) {
  const nameInputRef = useRef<HTMLInputElement>(null);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-9998 bg-[rgba(2,6,12,0.72)] opacity-0 backdrop-blur-sm transition-opacity duration-200 ease-out data-open:opacity-100" />
        <Dialog.Popup
          initialFocus={nameInputRef}
          className="fixed inset-0 z-9999 m-auto flex h-full w-full translate-y-6 scale-[0.98] flex-col overflow-y-auto bg-baolam-bg opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] data-open:translate-y-0 data-open:scale-100 data-open:opacity-100 sm:h-auto sm:max-h-[90vh] sm:w-[calc(100vw-2rem)] sm:max-w-275 sm:flex-row sm:border sm:border-white/10 sm:shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
        >
          <Dialog.Close
            aria-label="Đóng"
            className="absolute right-3 top-3 z-10 grid size-11 shrink-0 place-items-center border border-white/15 bg-baolam-bg/70 text-white/70 backdrop-blur transition-colors hover:border-baolam-primary/60 hover:text-baolam-primary sm:right-4 sm:top-4"
          >
            <X className="size-5" />
          </Dialog.Close>

          {/* Single accessible title/description, shared across breakpoints */}
          <div className="border-b border-white/10 px-5 pb-5 pt-6 sm:hidden">
            <Dialog.Title className="pr-10 text-xs font-bold uppercase tracking-[0.25em] text-baolam-primary">
              Start a project
            </Dialog.Title>
            <p className="mt-2 text-lg font-black leading-[1.25] text-white">{HEADLINE}</p>
          </div>
          <Dialog.Description className="sr-only">{INTRO}</Dialog.Description>

          <div className="flex flex-1 flex-col sm:flex-row">
            {/* Desktop left column */}
            <div className="relative hidden shrink-0 flex-col justify-between overflow-hidden border-r border-white/10 bg-baolam-surface-secondary p-10 sm:flex sm:w-[40%]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    "repeating-radial-gradient(circle at 30% 20%, transparent 0, transparent 26px, rgba(0,229,255,0.5) 27px)",
                }}
              />
              <div aria-hidden="true" className="absolute bottom-0 left-0 h-px w-24 bg-baolam-primary" />

              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-baolam-primary" aria-hidden="true">
                  Start a project
                </p>
                <p className="mt-4 text-2xl font-black leading-[1.2] text-white">{HEADLINE}</p>
                <p className="mt-4 text-sm leading-[1.7] text-baolam-muted">{INTRO}</p>
              </div>

              <div className="relative mt-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-baolam-muted">
                  Project inquiries
                </p>
                <div className="mt-3 space-y-1 text-sm text-white/85">
                  <p>
                    <a href="mailto:project@baolam.vn" className="hover:text-baolam-primary">
                      project@baolam.vn
                    </a>
                  </p>
                  <p>+84 xxx xxx xxx</p>
                  <p>Hà Nội, Việt Nam</p>
                </div>
              </div>
            </div>

            {/* Form column */}
            <div className="flex-1 px-5 py-6 sm:overflow-y-auto sm:px-10 sm:py-10">
              <h2 className="hidden text-xs font-bold uppercase tracking-[0.25em] text-white sm:block">
                Thông tin liên hệ
              </h2>
              <div className="sm:mt-5">
                <QuickContactForm nameInputRef={nameInputRef} onClose={() => onOpenChange(false)} />
              </div>
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
