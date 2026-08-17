"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, Send, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast-provider";

export function ProjectStatusButton({ projectId, status }: { projectId: string; status: "draft" | "published" | "archived" }) {
  const router = useRouter();
  const { toast } = useToast();
  const [pending, setPending] = useState(false);
  const isPublished = status === "published";

  async function changeStatus() {
    setPending(true);
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

      toast({ title: isPublished ? "Đã gỡ xuất bản dự án." : "Đã xuất bản dự án.", variant: "success" });
      router.refresh();
    } catch (caughtError) {
      toast({ title: "Không thể cập nhật trạng thái", description: caughtError instanceof Error ? caughtError.message : "Không thể cập nhật trạng thái dự án.", variant: "error" });
    } finally {
      setPending(false);
    }
  }

  return <div>
    <Button type="button" onClick={changeStatus} disabled={pending} variant={isPublished ? "outline" : "default"} className={isPublished ? "border-white/15 bg-transparent text-white" : "bg-baolam-primary text-baolam-bg hover:bg-baolam-primary-hover"}>
      {pending ? <LoaderCircle className="animate-spin"/> : isPublished ? <Undo2/> : <Send/>}
      {pending ? "Đang cập nhật" : isPublished ? "Gỡ xuất bản" : "Xuất bản"}
    </Button>
  </div>;
}
