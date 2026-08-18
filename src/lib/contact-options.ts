export const PROJECT_TYPES = [
  "Khu đô thị",
  "Resort",
  "Công viên",
  "Commercial",
  "Residential",
  "Khác",
] as const;

export const PROJECT_STAGES = [
  "Ý tưởng ban đầu",
  "Đang quy hoạch",
  "Đã có thiết kế",
  "Chuẩn bị thi công",
  "Cần cải tạo",
] as const;

export const SERVICE_SCOPES = [
  "Masterplanning",
  "Concept Design",
  "Detailed Design",
  "Construction",
  "Design & Build",
  "Maintenance",
  "Chưa xác định",
] as const;

export function isValidVietnamesePhone(value: string) {
  const digits = value.replace(/[\s.-]/g, "");
  return /^(\+84|0)(3|5|7|8|9)\d{8}$/.test(digits);
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
