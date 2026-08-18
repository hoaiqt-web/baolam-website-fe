"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { ContactField, ContactTextarea } from "@/components/contact/contact-fields";
import { ProjectTypeChips, ServiceScopeChips } from "@/components/contact/chips";
import { ContactFilePicker } from "@/components/contact/contact-file-picker";
import { ContactSuccess } from "@/components/contact/contact-success";
import { ContactError } from "@/components/contact/contact-error";
import { ContactDemoToggle } from "@/components/contact/contact-demo-toggle";
import { PROJECT_STAGES, isValidEmail, isValidVietnamesePhone } from "@/lib/contact-options";

type FormStatus = "idle" | "loading" | "success" | "error";

type FormErrors = Partial<Record<"fullName" | "phone" | "email", string>>;

export function ProjectBriefForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FormErrors>({});

  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [projectName, setProjectName] = useState("");
  const [location, setLocation] = useState("");
  const [projectType, setProjectType] = useState("");
  const [scale, setScale] = useState("");
  const [stage, setStage] = useState("");

  const [scopes, setScopes] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!fullName.trim()) nextErrors.fullName = "Vui lòng nhập họ và tên.";
    if (!phone.trim()) nextErrors.phone = "Vui lòng nhập số điện thoại.";
    else if (!isValidVietnamesePhone(phone)) nextErrors.phone = "Số điện thoại chưa hợp lệ.";
    if (!email.trim()) nextErrors.email = "Vui lòng nhập email.";
    else if (!isValidEmail(email)) nextErrors.email = "Email chưa hợp lệ.";
    return nextErrors;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <section id="project-brief" className="scroll-mt-20 border-t border-white/10 bg-[#030914] py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-12">
          <ContactSuccess
            title="Project brief received"
            description={
              <>
                Cảm ơn bạn đã chia sẻ về dự án.
                <br />
                Thông tin đã được ghi nhận. Đội ngũ Bảo Lâm sẽ liên hệ để cùng trao đổi về bước tiếp theo.
              </>
            }
            actions={[
              { label: "Trở về trang chủ", href: "/" },
              { label: "Khám phá dự án", href: "/#projects", variant: "secondary" },
            ]}
          />
        </div>
      </section>
    );
  }

  return (
    <section id="project-brief" className="scroll-mt-20 border-t border-white/10 bg-[#030914] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[35%_65%] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-baolam-primary">
              Project brief
            </span>
            <h2 className="max-w-sm text-2xl font-black leading-[1.2] sm:text-3xl">
              Hãy chia sẻ những thông tin ban đầu để đội ngũ của chúng tôi hiểu rõ hơn về dự án.
            </h2>
            <p className="mt-4 text-xs text-baolam-muted">
              Required fields <span className="text-baolam-primary">*</span>
            </p>
          </div>

          {status === "error" ? (
            <ContactError onRetry={() => setStatus("idle")} />
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-12">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-baolam-primary">
                  01 / Your information
                </p>
                <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                  <ContactField
                    label="Họ và tên"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    error={errors.fullName}
                    autoComplete="name"
                  />
                  <ContactField
                    label="Công ty/đơn vị"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    autoComplete="organization"
                  />
                  <ContactField
                    label="Số điện thoại"
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    error={errors.phone}
                    autoComplete="tel"
                  />
                  <ContactField
                    label="Email"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-baolam-primary">
                  02 / Project information
                </p>
                <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                  <ContactField label="Tên dự án" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                  <ContactField label="Địa điểm" value={location} onChange={(e) => setLocation(e.target.value)} />
                  <ContactField
                    label="Quy mô dự kiến"
                    value={scale}
                    onChange={(e) => setScale(e.target.value)}
                    placeholder="VD: 5.000 m²"
                  />
                </div>
                <div className="mt-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-baolam-muted">Loại dự án</p>
                  <ProjectTypeChips value={projectType} onChange={setProjectType} className="mt-2" />
                </div>
                <div className="mt-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-baolam-muted">Giai đoạn hiện tại</p>
                  <ProjectTypeChips value={stage} onChange={setStage} options={PROJECT_STAGES} className="mt-2" />
                </div>
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-baolam-primary">
                  03 / Project requirements
                </p>
                <div className="mt-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-baolam-muted">Phạm vi công việc</p>
                  <ServiceScopeChips value={scopes} onChange={setScopes} className="mt-2" />
                </div>
                <ContactTextarea
                  label="Nội dung"
                  className="mt-6"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hãy chia sẻ mục tiêu, hiện trạng hoặc những vấn đề bạn muốn chúng tôi cùng giải quyết…"
                  rows={4}
                />
                <div className="mt-6">
                  <ContactFilePicker files={files} onChange={setFiles} />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group/submit inline-flex w-full items-center justify-center gap-2 bg-baolam-primary px-8 py-4 text-xs font-bold uppercase tracking-wider text-baolam-bg transition-colors hover:bg-baolam-primary-hover disabled:opacity-70 sm:w-auto"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      Gửi project brief
                      <ArrowRight className="size-4 transition-transform duration-200 group-hover/submit:translate-x-1" />
                    </>
                  )}
                </button>
                <p className="mt-4 max-w-lg text-xs leading-[1.7] text-baolam-muted">
                  Bằng việc gửi thông tin, bạn đồng ý để Bảo Lâm liên hệ về nội dung của dự án.
                </p>
                <ContactDemoToggle status={status} onChange={setStatus} />
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
