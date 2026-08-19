"use client";

import { useState, useTransition } from "react";
import { LoaderCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/toast-provider";
import { updateContactRequestStatusAction } from "@/app/admin/(dashboard)/contacts/actions";

const STATUS_LABELS: Record<string, string> = {
  new: "Mới",
  contacted: "Đã liên hệ",
  closed: "Đã đóng",
};

export function ContactStatusSelect({ id, status }: { id: string; status: "new" | "contacted" | "closed" }) {
  const { toast } = useToast();
  const [value, setValue] = useState(status);
  const [pending, startTransition] = useTransition();

  function handleChange(next: typeof value | null) {
    if (!next) return;
    const previous = value;
    setValue(next);
    startTransition(async () => {
      try {
        await updateContactRequestStatusAction(id, next);
        toast({ title: "Đã cập nhật trạng thái.", variant: "success" });
      } catch {
        setValue(previous);
        toast({ title: "Không thể cập nhật trạng thái", variant: "error" });
      }
    });
  }

  return (
    <Select value={value} onValueChange={handleChange} disabled={pending}>
      <SelectTrigger className="border-white/15 bg-transparent text-white">
        {pending ? <LoaderCircle className="size-4 animate-spin" /> : null}
        <SelectValue>{STATUS_LABELS[value]}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="new">Mới</SelectItem>
        <SelectItem value="contacted">Đã liên hệ</SelectItem>
        <SelectItem value="closed">Đã đóng</SelectItem>
      </SelectContent>
    </Select>
  );
}
