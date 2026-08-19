"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderKanban, Mail, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", label: "Dự án", icon: FolderKanban },
  { href: "/admin/contacts", label: "Yêu cầu liên hệ", icon: Mail, badgeKey: "unreadContacts" as const },
  { href: "/admin/settings", label: "Thông tin liên hệ", icon: Settings },
];

export function AdminNav({ unreadContacts = 0 }: { unreadContacts?: number }) {
  const pathname = usePathname();
  const badgeValues = { unreadContacts };

  return (
    <nav className="space-y-1 p-4">
      {NAV_ITEMS.map((item) => {
        const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
        const Icon = item.icon;
        const badgeCount = item.badgeKey ? badgeValues[item.badgeKey] : 0;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg border px-4 py-3 text-sm font-semibold transition-colors",
              isActive
                ? "border-baolam-primary/25 bg-baolam-primary/10 text-baolam-primary"
                : "border-transparent text-baolam-muted hover:bg-white/5 hover:text-white"
            )}
          >
            <Icon />
            <span className="flex-1">{item.label}</span>
            {badgeCount > 0 && (
              <span className="grid min-w-5 place-items-center rounded-full bg-baolam-primary px-1.5 py-0.5 text-[10px] font-bold text-baolam-bg">
                {badgeCount > 99 ? "99+" : badgeCount}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
