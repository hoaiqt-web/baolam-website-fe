"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ImagePlus, LoaderCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

type UploadPolicy = {
  url: string;
  fields: Record<string, string>;
  mediaUrl: string;
  error?: string;
};

export function ImageUpload({ label, values, onChange, multiple = false, required = false }: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  multiple?: boolean;
  required?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>();

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setError(undefined);
    setUploading(true);

    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        if (!ACCEPTED_TYPES.includes(file.type) || file.size > MAX_IMAGE_SIZE) {
          throw new Error(`${file.name}: chỉ nhận JPG, PNG, WebP hoặc AVIF, tối đa 10MB.`);
        }

        const policyResponse = await fetch("/api/admin/uploads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contentType: file.type, size: file.size }),
        });
        const policy = await policyResponse.json() as UploadPolicy;
        if (!policyResponse.ok) throw new Error(policy.error || "Không thể chuẩn bị upload.");

        const body = new FormData();
        Object.entries(policy.fields).forEach(([key, value]) => body.append(key, value));
        body.append("file", file);
        const uploadResponse = await fetch(policy.url, { method: "POST", body });
        if (!uploadResponse.ok) throw new Error(`Upload ${file.name} thất bại.`);
        uploaded.push(policy.mediaUrl);
      }
      onChange(multiple ? [...values, ...uploaded] : uploaded.slice(-1));
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload ảnh thất bại.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return <div className="space-y-3 md:col-span-2">
    <Label>{label}{required ? " *" : ""}</Label>
    {values.length > 0 && <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {values.map((url, index) => <div key={`${url}-${index}`} className="group relative overflow-hidden rounded-lg border border-white/10 bg-black/30">
        <Image src={url} alt="Ảnh đã upload" width={400} height={300} unoptimized className="aspect-[4/3] w-full object-cover" />
        <Button type="button" size="icon" variant="destructive" aria-label="Xóa ảnh" className="absolute right-2 top-2 size-8" onClick={() => onChange(values.filter((_, itemIndex) => itemIndex !== index))}><X /></Button>
      </div>)}
    </div>}
    <input ref={inputRef} type="file" accept={ACCEPTED_TYPES.join(",")} multiple={multiple} className="hidden" onChange={(event) => void upload(event.target.files)} />
    <Button type="button" variant="outline" disabled={uploading} className="border-white/15 bg-transparent text-white hover:border-baolam-primary hover:bg-baolam-primary/10" onClick={() => inputRef.current?.click()}>
      {uploading ? <LoaderCircle className="animate-spin" /> : <ImagePlus />} {uploading ? "Đang upload..." : multiple ? "Chọn nhiều ảnh" : values.length ? "Thay ảnh" : "Chọn ảnh"}
    </Button>
    <p className="text-xs text-baolam-muted">JPG, PNG, WebP hoặc AVIF; tối đa 10MB mỗi ảnh.</p>
    {error && <p className="text-sm text-red-300">{error}</p>}
  </div>;
}
