"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, Send, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProjectStatusButton({ projectId, status }: { projectId: string; status: "draft" | "published" | "archived" }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isPublished = status === "published";

  async function changeStatus() {
    setPending(true);
    setError(null);

    try {
      const response = await fetch(`/admin/projects/${projectId}/status`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: new URLSearchParams({ status: isPublished ? "draft" : "published" }),
      });
      const result = await response.json().catch(() => null) as { error?: string } | null;
      if (!response.ok) throw new Error(result?.error || "Không thể cập nhật trạng thái dự án.");

      router.refresh();
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Không thể cập nhật trạng thái dự án.");
    } finally {
      setPending(false);
    }
  }

  return <div className="relative">
    <Button type="button" onClick={changeStatus} disabled={pending} variant={isPublished ? "outline" : "default"} className={isPublished ? "border-white/15 bg-transparent text-white" : "bg-baolam-primary text-baolam-bg hover:bg-baolam-primary-hover"}>
      {pending ? <LoaderCircle className="animate-spin"/> : isPublished ? <Undo2/> : <Send/>}
      {pending ? "Đang cập nhật" : isPublished ? "Gỡ xuất bản" : "Xuất bản"}
    </Button>
    {error && <button type="button" onClick={() => setError(null)} className="absolute right-0 top-full z-20 mt-2 w-64 rounded-lg border border-red-400/30 bg-[#2a1015] p-3 text-left text-xs leading-5 text-red-200 shadow-xl" title="Bấm để đóng">{error}</button>}
  </div>;
}
