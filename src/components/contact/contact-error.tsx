"use client";

import { CircleAlert } from "lucide-react";

type ContactErrorProps = {
  message?: string;
  onRetry: () => void;
};

export function ContactError({
  message = "Không thể gửi yêu cầu vào lúc này. Vui lòng thử lại hoặc liên hệ qua số +84 xxx xxx xxx.",
  onRetry,
}: ContactErrorProps) {
  return (
    <div className="flex flex-col items-center px-2 py-8 text-center">
      <CircleAlert className="size-12 text-baolam-error" aria-hidden="true" />
      <p role="alert" className="mt-5 max-w-sm text-sm leading-[1.7] text-baolam-muted">
        {message}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-7 inline-flex items-center justify-center bg-baolam-primary px-6 py-3 text-xs font-bold uppercase tracking-wider text-baolam-bg transition-colors hover:bg-baolam-primary-hover"
      >
        Thử lại
      </button>
    </div>
  );
}
