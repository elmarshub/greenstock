"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutDashboard, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Plants", href: "/plants" },
];

interface MobileNavProps {
  isSignedIn: boolean;
  signInHref: string;
  signUpHref: string;
}

export function MobileNav({ isSignedIn, signInHref, signUpHref }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={() => setOpen((v) => !v)}>
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            data-testid="mobile-nav-panel"
            className="absolute inset-x-0 top-16 z-40 border-b border-border bg-background shadow-lg"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {links.map((link) => {
                const active =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-lg px-3 py-2.5 text-base font-medium",
                      active
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
                {isSignedIn ? (
                  <Button className="rounded-full" asChild>
                    <Link href="/dashboard" onClick={() => setOpen(false)}>
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button variant="ghost" className="rounded-full" asChild>
                      <Link href={signInHref} onClick={() => setOpen(false)}>
                        Log in
                      </Link>
                    </Button>
                    <Button
                      className="rounded-full bg-brand-lime text-brand-lime-foreground hover:bg-brand-lime/90"
                      asChild
                    >
                      <Link href={signUpHref} onClick={() => setOpen(false)}>
                        Sign Up
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
