"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { LogOut, Settings } from "lucide-react";
import { UserAvatar, useUser } from "@stackframe/stack";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function AccountMenu() {
  const user = useUser();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  if (!user) return null;

  const handleSettings = () => {
    setOpen(false);
    router.push("/dashboard/settings");
  };

  const handleSignOut = async () => {
    setSigningOut(true);
    toast.loading("Signing out...", { id: "sign-out" });
    await user.signOut();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        data-testid="account-menu-trigger"
        className="flex items-center gap-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <UserAvatar user={user} size={32} />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64 p-2">
        <div className="flex items-center gap-2 border-b border-border px-2 pb-3">
          <UserAvatar user={user} size={36} />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">
              {user.displayName ?? "Account"}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {user.primaryEmail}
            </p>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={handleSettings}
            className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm transition-colors hover:bg-secondary"
          >
            <Settings className="h-4 w-4" />
            Account settings
          </button>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm text-destructive transition-colors hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogOut className="h-4 w-4" />
            {signingOut ? "Signing out..." : "Sign out"}
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
