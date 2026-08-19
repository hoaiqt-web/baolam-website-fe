"use client";

import { useState, type Ref } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { ContactField, ContactTextarea } from "@/components/contact/contact-fields";
import { ProjectTypeChips } from "@/components/contact/chips";
import { ContactSuccess } from "@/components/contact/contact-success";
import { ContactError } from "@/components/contact/contact-error";
import { HoneypotField } from "@/components/contact/honeypot-field";
import { useContactModal } from "@/components/contact/contact-modal-context";
import { isValidVietnamesePhone } from "@/lib/contact-options";
import { submitQuickContactAction } from "@/features/contact-requests/actions";

type FormStatus = "idle" | "loading" | "success" | "error";

type FormErrors = Partial<Record<"fullName" | "phone", string>>;

export function QuickContactForm({
  nameInputRef,
  onClose,
}: {
  nameInputRef?: Ref<HTMLInputElement>;
  onClose: () => void;
}) {
  const { siteSettings, source } = useContactModal();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string>();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!fullName.trim()) nextErrors.fullName = "Vui lòng nhập họ và tên.";
    if (!phone.trim()) nextErrors.phone = "Vui lòng nhập số điện thoại.";
    else if (!isValidVietnamesePhone(phone)) nextErrors.phone = "Số điện thoại chưa hợp lệ.";
    return nextErrors;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    const result = await submitQuickContactAction({
      fullName,
      phone,
      company: company || undefined,
      projectType: projectType || undefined,
      message: message || undefined,
      source: source || undefined,
      honeypot: honeypot || undefined,
    });

    if (result.success) {
      setStatus("success");
    } else {
      setServerError(result.error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <ContactSuccess
        title="Yêu cầu đã được gửi"
        description={
          <>
            Cảm ơn bạn đã liên hệ với Bảo Lâm.
            <br />
            Đội ngũ của chúng tôi sẽ phản hồi trong vòng một ngày làm việc.
          </>
        }
        actions={[{ label: "Đóng", onClick: onClose }]}
      />
    );
  }

  if (status === "error") {
    return (
      <ContactError
        message={serverError || `Không thể gửi yêu cầu vào lúc này. Vui lòng thử lại hoặc liên hệ qua số ${siteSettings.contactPhone}.`}
        onRetry={() => setStatus("idle")}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <HoneypotField value={honeypot} onChange={setHoneypot} />
      <ContactField
        ref={nameInputRef}
        label="Họ và tên"
        required
        value={fullName}
        onChange={(event) => setFullName(event.target.value)}
        error={errors.fullName}
        autoComplete="name"
      />
      <ContactField
        label="Số điện thoại"
        required
        type="tel"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        error={errors.phone}
        autoComplete="tel"
      />
      <ContactField
        label="Công ty/đơn vị"
        value={company}
        onChange={(event) => setCompany(event.target.value)}
        autoComplete="organization"
      />
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-baolam-muted">Loại dự án</p>
        <ProjectTypeChips value={projectType} onChange={setProjectType} className="mt-1.5" />
      </div>
      <ContactTextarea
        label="Nội dung"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        rows={3}
      />

      <div className="sticky bottom-0 -mx-1 mt-1 bg-baolam-bg px-1 pb-1 pt-2 md:static md:bg-transparent md:p-0">
        <button
          type="submit"
          disabled={status === "loading"}
          className="group/submit inline-flex w-full items-center justify-center gap-2 bg-baolam-primary px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-baolam-bg transition-colors hover:bg-baolam-primary-hover disabled:opacity-70"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Đang gửi...
            </>
          ) : (
            <>
              Gửi yêu cầu tư vấn
              <ArrowRight className="size-4 transition-transform duration-200 group-hover/submit:translate-x-1" />
            </>
          )}
        </button>
        <a
          href="/contact"
          className="mt-3 block text-center text-[11px] font-bold uppercase tracking-wider text-baolam-primary hover:text-white md:text-left"
        >
          Gửi project brief chi tiết →
        </a>
      </div>
    </form>
  );
}
