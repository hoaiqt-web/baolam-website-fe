"use client";

import { useId, useRef } from "react";
import { Paperclip, X } from "lucide-react";
import { formatFileSize } from "@/lib/contact-options";

const ACCEPTED_TYPES = ".pdf,.doc,.docx,.jpg,.jpeg,.png";
const MAX_SIZE_BYTES = 20 * 1024 * 1024;

type ContactFilePickerProps = {
  files: File[];
  onChange: (files: File[]) => void;
  error?: string;
};

export function ContactFilePicker({ files, onChange, error }: ContactFilePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const next = Array.from(incoming).filter((file) => file.size <= MAX_SIZE_BYTES);
    onChange([...files, ...next]);
    if (inputRef.current) inputRef.current.value = "";
  };

  const removeFile = (index: number) => {
    onChange(files.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label htmlFor={inputId} className="text-xs font-bold uppercase tracking-wider text-baolam-muted">
        Đính kèm project brief
      </label>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="mt-1.5 flex w-full flex-col items-center justify-center gap-1.5 border border-dashed border-white/20 px-4 py-6 text-center transition-colors hover:border-baolam-primary/60"
      >
        <span className="flex items-center gap-2 text-sm font-bold text-white">
          <Paperclip className="size-4 text-baolam-primary" />
          Đính kèm project brief
        </span>
        <span className="text-[11px] uppercase tracking-wider text-baolam-muted">
          PDF, DOCX, JPG, PNG · Tối đa 20 MB
        </span>
      </button>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        multiple
        accept={ACCEPTED_TYPES}
        className="sr-only"
        onChange={(event) => addFiles(event.target.files)}
      />
      {error && (
        <p role="alert" className="mt-1.5 text-xs font-medium text-baolam-error">
          {error}
        </p>
      )}
      {files.length > 0 && (
        <ul className="mt-3 flex flex-col gap-2">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center justify-between gap-3 border border-white/10 bg-white/[0.03] px-3 py-2 text-xs"
            >
              <span className="min-w-0 flex-1 truncate text-white">{file.name}</span>
              <span className="shrink-0 text-baolam-muted">{formatFileSize(file.size)}</span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                aria-label={`Xóa tệp ${file.name}`}
                className="grid size-6 shrink-0 place-items-center text-baolam-muted transition-colors hover:text-baolam-error"
              >
                <X className="size-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
