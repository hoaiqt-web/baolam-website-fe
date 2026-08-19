const CONTACT_ATTACHMENT_PATTERN =
  /^contact-uploads\/\d{4}\/(?:0[1-9]|1[0-2])\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(?:pdf|doc|docx|jpg|jpeg|png)$/;

export function isContactAttachmentObjectKey(value: string) {
  return CONTACT_ATTACHMENT_PATTERN.test(value);
}
