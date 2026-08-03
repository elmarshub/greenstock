import type React from "react";
import Link from "next/link";
import { AuthVisual } from "@/components/auth/auth-visual";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center px-6 py-12 sm:px-12">
        <Link
          href="/"
          className="mb-10 flex items-center gap-2 text-lg font-bold text-primary"
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            🪴
          </span>
          Green<span className="text-primary/70">Stock</span>
        </Link>
        <div className="mx-auto w-full max-w-sm">{children}</div>
      </div>

      <AuthVisual />
    </div>
  );
}
