"use client";

import { useState, useTransition } from "react";
import { LoaderCircle, Mail, MailOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast-provider";
import { setContactRequestReadAction } from "@/app/admin/(dashboard)/contacts/actions";

export function ContactReadToggle({ id, isRead }: { id: string; isRead: boolean }) {
  const { toast } = useToast();
  const [read, setRead] = useState(isRead);
  const [pending, startTransition] = useTransition();

  function toggle() {
    const next = !read;
    setRead(next);
    startTransition(async () => {
      try {
        await setContactRequestReadAction(id, next);
      } catch {
        setRead(!next);
        toast({ title: "Không thể cập nhật trạng thái đọc", variant: "error" });
      }
    });
  }

  return (
    <Button
      type="button"
      onClick={toggle}
      disabled={pending}
      variant="outline"
      size="sm"
      className="border-white/15 bg-transparent text-white"
    >
      {pending ? <LoaderCircle className="animate-spin" /> : read ? <MailOpen /> : <Mail />}
      {read ? "Đánh dấu chưa đọc" : "Đánh dấu đã đọc"}
    </Button>
  );
}
