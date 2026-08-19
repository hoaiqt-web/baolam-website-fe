"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderKanban, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", label: "Dự án", icon: FolderKanban },
  { href: "/admin/settings", label: "Thông tin liên hệ", icon: Settings },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1 p-4">
      {NAV_ITEMS.map((item) => {
        const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
        const Icon = item.icon;
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
            <Icon /> {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
