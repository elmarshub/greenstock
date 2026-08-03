"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Settings, Sprout } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Plants", href: "/dashboard/plants", icon: Sprout },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();

  return (
    <nav className="flex h-full flex-col gap-1 bg-brand-dark p-4 text-brand-dark-foreground">
      <Link
        href="/"
        className="mb-6 flex items-center gap-2 px-2 text-lg font-bold"
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-brand-lime text-brand-lime-foreground">
          🪴
        </span>
        Green<span className="text-brand-dark-muted">Stock</span>
      </Link>

      {navItems.map((item) => {
        const active =
          item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-brand-lime text-brand-lime-foreground"
                : "text-brand-dark-muted hover:bg-white/10 hover:text-brand-dark-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
