import "server-only";

import { Resend } from "resend";
import type { ContactRequest } from "@/db/schema";

const DEFAULT_FROM = "onboarding@resend.dev";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

/** Every user-submitted value must go through this before being interpolated into the HTML email — otherwise a malicious form submission (e.g. message containing "<script>") gets embedded verbatim into the notification email. */
function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatContactRequestEmail(request: ContactRequest) {
  const typeLabel = request.type === "quick" ? "Liên hệ nhanh" : "Project brief";
  const rows: [string, string | null | undefined][] = [
    ["Loại", typeLabel],
    ["Họ và tên", request.fullName],
    ["Số điện thoại", request.phone],
    ["Email", request.email],
    ["Công ty/đơn vị", request.company],
    ["Tên dự án", request.projectName],
    ["Địa điểm", request.location],
    ["Loại dự án", request.projectType],
    ["Quy mô", request.scale],
    ["Giai đoạn", request.stage],
    ["Phạm vi công việc", request.scopes?.join(", ")],
    ["Nguồn", request.source],
  ];

  const rowsHtml = rows
    .filter(([, value]) => value)
    .map(([label, value]) => `<tr><td style="padding:4px 12px 4px 0;color:#7e8c99;white-space:nowrap;">${escapeHtml(label)}</td><td style="padding:4px 0;color:#0b1a28;">${escapeHtml(value!)}</td></tr>`)
    .join("");

  const messageHtml = request.message
    ? `<p style="margin-top:16px;white-space:pre-wrap;color:#0b1a28;"><strong>Nội dung:</strong><br/>${escapeHtml(request.message)}</p>`
    : "";

  const attachmentsHtml = request.attachments?.length
    ? `<p style="margin-top:16px;color:#0b1a28;"><strong>Tệp đính kèm:</strong> ${request.attachments.length} tệp — xem trong trang quản trị.</p>`
    : "";

  const html = `
    <div style="font-family:sans-serif;max-width:560px;">
      <h2 style="color:#0b1a28;">Yêu cầu liên hệ mới — ${escapeHtml(typeLabel)}</h2>
      <table>${rowsHtml}</table>
      ${messageHtml}
      ${attachmentsHtml}
      <p style="margin-top:24px;">
        <a href="${process.env.SITE_URL ?? "https://noithatbaolam.com"}/admin/contacts/${request.id}" style="color:#00b8cc;">Xem chi tiết trong trang quản trị →</a>
      </p>
    </div>
  `;

  const text = rows
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n") + (request.message ? `\n\nNội dung:\n${request.message}` : "");

  return {
    subject: `[Bảo Lâm] Yêu cầu liên hệ mới từ ${request.fullName}`,
    html,
    text,
  };
}

/** Best-effort notification — a failure here must never fail the underlying form submission, since the request is already saved to the DB and visible in admin. */
export async function sendContactRequestNotification(request: ContactRequest) {
  const client = getResendClient();
  const to = process.env.CONTACT_NOTIFICATION_EMAIL;

  if (!client || !to) {
    console.warn("Bỏ qua gửi email thông báo: thiếu RESEND_API_KEY hoặc CONTACT_NOTIFICATION_EMAIL.");
    return;
  }

  const { subject, html, text } = formatContactRequestEmail(request);

  try {
    const result = await client.emails.send({
      from: process.env.CONTACT_NOTIFICATION_FROM || DEFAULT_FROM,
      to,
      subject,
      html,
      text,
    });
    if (result.error) {
      console.error("Resend trả về lỗi khi gửi email thông báo:", result.error);
    }
  } catch (error) {
    console.error("Không thể gửi email thông báo yêu cầu liên hệ:", error);
  }
}
