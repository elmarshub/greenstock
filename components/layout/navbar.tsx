import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";
import { stackServerApp } from "@/stack";
import { NavLinks } from "./nav-links";
import { MobileNav } from "./mobile-nav";

export default async function Navbar() {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="flex items-center h-16 justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold text-primary tracking-tight"
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              🪴
            </span>
            Green<span className="text-primary/70">Stock</span>
          </Link>

          <NavLinks />

          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <Button className="rounded-full" asChild>
                <Link href="/dashboard">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" className="rounded-full" asChild>
                  <Link href={app.signIn}>Log in</Link>
                </Button>
                <Button
                  className="rounded-full bg-brand-lime text-brand-lime-foreground hover:bg-brand-lime/90"
                  asChild
                >
                  <Link href={app.signUp}>Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          <MobileNav
            isSignedIn={!!user}
            signInHref={app.signIn}
            signUpHref={app.signUp}
          />
        </div>
      </div>
    </nav>
  );
}
