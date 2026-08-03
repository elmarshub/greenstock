import type React from "react";
import { redirect } from "next/navigation";
import { stackServerApp } from "@/stack";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await stackServerApp.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  return <DashboardShell displayName={user.displayName}>{children}</DashboardShell>;
}
